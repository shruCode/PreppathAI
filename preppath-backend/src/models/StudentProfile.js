const mongoose = require("mongoose");
const companies = require("../constants/companyList");
const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    targetCompany: {
      type: String,
      enum: companies,
      required: true
    },
    skillLevel: {
      dsa: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true },
      aptitude: { 
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true },
      hr: { 
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true }
    },
    availableDays: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
