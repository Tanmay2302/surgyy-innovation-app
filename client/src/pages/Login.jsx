import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/send-otp`, {
        phone: `+91${phone}`,
      });
      toast.success(response.data.message);
      setStep("otp");
    } catch (error) {
      console.error("Error sending OTP:", error.response);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fullPhone = `+91${phone}`;
      const response = await axios.post(`${API_URL}/api/verify-otp`, {
        phone: fullPhone,
        otp,
      });

      if (response.data.isNewUser) {
        toast.info(response.data.message);
        navigate("/register", { state: { phone: fullPhone } });
      } else {
        toast.success(response.data.message);
        navigate("/home", { state: { user: response.data.user } });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response);
      toast.error(error.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full p-3 bg-gray-700 border-2 border-transparent text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300";

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg"
      >
        {step === "phone" ? (
          <>
            <h1 className="text-3xl font-bold text-center text-white">
              Enter Your Number
            </h1>
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-300"
                >
                  WhatsApp Number
                </label>
                <div className="flex items-center mt-2">
                  <span className="inline-flex items-center px-3 text-sm h-[52px] text-gray-300 bg-gray-700 border-2 border-transparent rounded-l-lg">
                    +91
                  </span>

                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${inputStyle} rounded-l-none`}
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-white">
              Verify Your Number
            </h1>
            <p className="text-center text-gray-400">
              An OTP was sent to +91 {phone}
            </p>
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="text-sm font-medium text-gray-300"
                >
                  Enter OTP
                </label>

                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`${inputStyle} mt-2`}
                  placeholder="Enter the 6-digit OTP"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Proceed"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
