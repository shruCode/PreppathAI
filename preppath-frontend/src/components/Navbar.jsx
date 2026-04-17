import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="w-full px-6 py-4 flex justify-between items-center 
    bg-white/5 backdrop-blur-md border-b border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]">

      {/* Logo */}
      <h2
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-white cursor-pointer tracking-wide"
      >
        PrepPath <span className="text-blue-400">AI</span>
      </h2>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Username */}
        <span className="text-gray-300 text-sm">
          {user?.name || "User"}
        </span>

        {/* Profile Button */}
        <button
          onClick={() => navigate("/profile")}
          className="px-4 py-1.5 rounded-lg text-sm text-white border border-white/20 
          hover:bg-white/10 transition"
        >
          Profile
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-lg text-sm text-white 
          bg-gradient-to-r from-red-500 to-pink-500 
          hover:opacity-90 transition shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;