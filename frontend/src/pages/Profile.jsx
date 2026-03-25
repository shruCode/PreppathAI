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
    <Navbar />
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Complete Your Profile</h2>

        {/* Target Company */}
        <select
          name="targetCompany"
          value={formData.targetCompany}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Target Company</option>
          <option value="TCS">TCS</option>
          <option value="Infosys">Infosys</option>
          <option value="Wipro">Wipro</option>
          <option value="Accenture">Accenture</option>
        </select>

        {/* Skill Levels */}
        <label>DSA Level</label>
        <select name="dsa" value={formData.skillLevel.dsa} onChange={handleChange} required style={styles.input}>
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <label>Aptitude Level</label>
        <select name="aptitude" value={formData.skillLevel.aptitude} onChange={handleChange} required style={styles.input}>
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <label>HR Level</label>
        <select name="hr" value={formData.skillLevel.hr} onChange={handleChange} required style={styles.input}>
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {/* Available Days */}
        <input
          type="number"
          name="availableDays"
          placeholder="Available Days"
          value={formData.availableDays}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
    </>
  );
};

export default Profile;



const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};