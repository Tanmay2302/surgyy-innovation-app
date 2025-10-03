import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Home = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    navigate("/login");
  };

  const sentence = `Hi ${user.firstName}, welcome to Surgyy's world of innovation.`;

  const words = sentence.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar onLogout={handleLogout} />

      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center text-white px-4 max-w-4xl leading-snug break-words"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-2">
              {Array.from(word).map((char, charIndex) => (
                <motion.span key={charIndex} variants={childVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
      </div>
    </div>
  );
};

export default Home;
