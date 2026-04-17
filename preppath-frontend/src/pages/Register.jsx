import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
    return toast.error("Password must be at least 6 characters");
  }
    try {
      setLoading(true);

      const res = await axios.post("/auth/register", formData);

      // Save token in context
      login(res.data.token,res.data.user);

      toast.success("Registered successfully!");

      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f172a] to-[#1e1b4b]">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl w-[350px] border border-white/10 flex flex-col gap-4 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-400 text-sm text-center mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;