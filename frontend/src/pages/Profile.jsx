import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    targetCompany: "",
    skillLevel: {
      dsa: "",
      aptitude: "",
      hr: "",
    },
    availableDays: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["dsa", "aptitude", "hr"].includes(name)) {
      setFormData({
        ...formData,
        skillLevel: {
          ...formData.skillLevel,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.availableDays <= 0) {
    return toast.error("Enter valid number of days");
    }
    try {
      setLoading(true);

      await axios.post("/profile", formData);

      toast.success("Profile saved successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1e1b4b]">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1e1b4b] flex items-center justify-center p-6 text-white">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(59,130,246,0.2)] flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            Complete Your Profile
          </h2>

          {/* Target Company */}
          <select
            name="targetCompany"
            value={formData.targetCompany}
            onChange={handleChange}
            required
            className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-black">
              Select Target Company
            </option>
            <option value="TCS" className="text-black">TCS</option>
            <option value="Infosys" className="text-black">Infosys</option>
            <option value="Wipro" className="text-black">Wipro</option>
            <option value="Accenture" className="text-black">Accenture</option>
          </select>

          {/* Skill Levels */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">DSA Level</label>
            <select
              name="dsa"
              value={formData.skillLevel.dsa}
              onChange={handleChange}
              required
              className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="text-black">Select</option>
              <option value="beginner" className="text-black">Beginner</option>
              <option value="intermediate" className="text-black">Intermediate</option>
              <option value="advanced" className="text-black">Advanced</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Aptitude Level</label>
            <select
              name="aptitude"
              value={formData.skillLevel.aptitude}
              onChange={handleChange}
              required
              className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" className="text-black">Select</option>
              <option value="beginner" className="text-black">Beginner</option>
              <option value="intermediate" className="text-black">Intermediate</option>
              <option value="advanced" className="text-black">Advanced</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">HR Level</label>
            <select
              name="hr"
              value={formData.skillLevel.hr}
              onChange={handleChange}
              required
              className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="" className="text-black">Select</option>
              <option value="beginner" className="text-black">Beginner</option>
              <option value="intermediate" className="text-black">Intermediate</option>
              <option value="advanced" className="text-black">Advanced</option>
            </select>
          </div>

          {/* Available Days */}
          <input
            type="number"
            name="availableDays"
            placeholder="Available Days"
            value={formData.availableDays}
            onChange={handleChange}
            required
            className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Profile;