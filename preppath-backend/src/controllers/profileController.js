const StudentProfile = require("../models/StudentProfile");

// Create or Update Profile
const createOrUpdateProfile = async (req, res) => {
  try {
    const { targetCompany, skillLevel, availableDays } = req.body;

    const existingProfile = await StudentProfile.findOne({
      userId: req.user._id,
    });

    if (existingProfile) {
      existingProfile.targetCompany = targetCompany;
      existingProfile.skillLevel = skillLevel;
      existingProfile.availableDays = availableDays;

      await existingProfile.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile: existingProfile,
      });
    }

    const newProfile = await StudentProfile.create({
      userId: req.user._id,
      targetCompany,
      skillLevel,
      availableDays,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile: newProfile,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      userId: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createOrUpdateProfile, getProfile };
