import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!phone) {
      toast.error("Verification process incomplete. Please start again.");
      navigate("/login");
    }
  }, [phone, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/complete-registration`,
        {
          ...formData,
          phone: phone,
        }
      );
      toast.success(response.data.message);
      navigate("/home", { state: { user: response.data.user } });
    } catch (error) {
      console.error("Registration Error:", error.response);
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full p-3 bg-gray-700 border-2 border-transparent text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center text-white">
          Complete Your Account
        </h1>
        <p className="text-center text-gray-400">
          Your number {phone} is verified. Just a few more details.
        </p>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={inputStyle}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {loading ? "Saving..." : "Complete Registration"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
