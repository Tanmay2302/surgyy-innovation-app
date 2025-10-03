const Navbar = ({ onLogout }) => {
  const menuButtonStyle =
    "text-gray-300 hover:text-white transition-colors duration-300";

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm p-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Surgyy</div>

        <div className="flex space-x-8">
          <button className={menuButtonStyle}>Home</button>
          <button className={menuButtonStyle}>Products</button>
          <button className={menuButtonStyle}>Contact</button>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-transparent border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
