import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import twilio from "twilio";
import User from "./models/User.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));


const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


app.post("/api/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minute expiry

  try {
    
    await User.findOneAndUpdate(
      { phone },
      { otp, otpExpires },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    
    await twilioClient.messages.create({
      body: `Your Surgyy verification code is: ${otp}`,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phone}`,
    });

    res
      .status(200)
      .json({ message: "OTP sent successfully to your WhatsApp!" });
  } catch (error) {
    console.error("Error in send-otp route:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});


app.post("/api/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res
      .status(400)
      .json({ message: "Phone number and OTP are required." });
  }

  const user = await User.findOne({ phone });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }


  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  
  if (user.firstName) {
    
    return res.status(200).json({
      message: "Login successful!",
      isNewUser: false,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } else {
    
    return res.status(200).json({
      message: "OTP verified. Please complete your registration.",
      isNewUser: true,
    });
  }
});


app.post("/api/complete-registration", async (req, res) => {
  const { phone, firstName, lastName, email } = req.body;
  if (!phone || !firstName || !lastName || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { phone },
      { firstName, lastName, email },
      { new: true } 
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found. Please start over." });
    }

    res.status(200).json({
      message: "Registration successful!",
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Error completing registration:", error);
    
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }
    res.status(500).json({ message: "An error occurred during registration." });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
