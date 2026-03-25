const StudentProfile = require("../models/StudentProfile");
const Roadmap = require("../models/Roadmap");
const { generateRoadmapFromAI } = require("../services/aiService");

// Generate Roadmap
const generateRoadmap = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      userId: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // Prepare data for AI
    const aiInput = {
      targetCompany: profile.targetCompany,
      skillLevel: profile.skillLevel,
      availableDays: profile.availableDays,
    };

    // Call AI Service
    const aiResponse = await generateRoadmapFromAI(aiInput);

    // Save or update roadmap in DB
    let existingRoadmap = await Roadmap.findOne({
      userId: req.user._id,
    });

    if (existingRoadmap) {
      existingRoadmap.roadmap = aiResponse.roadmap;
      existingRoadmap.estimatedCompletion = aiResponse.estimatedCompletion;
      existingRoadmap.lastUpdated = Date.now();

      await existingRoadmap.save();
    } else {
      existingRoadmap = await Roadmap.create({
        userId: req.user._id,
        roadmap: aiResponse.roadmap,
        estimatedCompletion: aiResponse.estimatedCompletion,
      });
    }

    res.status(200).json({
      success: true,
      message: "Roadmap generated successfully",
      roadmap: existingRoadmap,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Roadmap
const getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      userId: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    res.status(200).json({
      success: true,
      roadmap,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
  
// Update Roadmap Day Status
const updateRoadmapStatus = async (req, res) => {
  try {
    const { day, status } = req.body;

    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const roadmapDoc = await Roadmap.findOne({
      userId: req.user._id,
    });

    if (!roadmapDoc) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    const roadmapItem = roadmapDoc.roadmap.find(
      (item) => item.day === day
    );

    if (!roadmapItem) {
      return res.status(404).json({
        success: false,
        message: "Day not found in roadmap",
      });
    }

    // Prevent duplicate updates
if (roadmapItem.status === status) {
  return res.status(400).json({
    success: false,
    message: `Day is already ${status}`,
  });
}


    // ----------------------------
    // RULE 1: Prevent skipping days
    // ----------------------------
    if (status === "completed") {
      const firstPendingDay = roadmapDoc.roadmap.find(
        (item) => item.status === "pending"
      );

      if (firstPendingDay && firstPendingDay.day !== day) {
        return res.status(400).json({
          success: false,
          message: "You must complete previous days first",
        });
      }
    }

    // ----------------------------
    // RULE 2: Prevent invalid undo
    // ----------------------------
    if (status === "pending") {
      const laterCompletedDay = roadmapDoc.roadmap.find(
        (item) => item.day > day && item.status === "completed"
      );

      if (laterCompletedDay) {
        return res.status(400).json({
          success: false,
          message: "Undo later completed days first",
        });
      }
    }

    // Update status
    roadmapItem.status = status;

    await roadmapDoc.save();
     
    // Calculate progress
    const totalDays = roadmapDoc.roadmap.length;

    const completedDays = roadmapDoc.roadmap.filter(
      (item) => item.status === "completed"
    ).length;

    const progressPercentage = Math.round(
      (completedDays / totalDays) * 100
    );

    res.status(200).json({
      success: true,
      message: "Roadmap updated successfully",
      progressPercentage,
      completedDays,
      totalDays,
      roadmap: roadmapDoc,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
   
  // Delete / Reset Roadmap
    const deleteRoadmap = async (req, res) => {
    try {
      const roadmap = await Roadmap.findOneAndDelete({
       userId: req.user._id,
      });

       if (!roadmap) {
        return res.status(404).json({
          success: false,
          message: "Roadmap not found",
        });
      }

       res.status(200).json({
        success: true,
        message: "Roadmap deleted successfully",
       });

    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message,
       });
    }
};


module.exports = { generateRoadmap, getRoadmap, updateRoadmapStatus, deleteRoadmap };
