import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-[#1D2B64] via-[#000000] to-[#F8CDDA]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center"
      >
        <h1
          className="text-8xl md:text-9xl font-bold text-white tracking-wider"
          style={{ textShadow: "0 0 15px rgba(255,255,255,0.5)" }}
        >
          Surgyy
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-gray-300 mt-4 text-lg"
        >
          Revolutionizing the health-care sector with SaaS products.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
