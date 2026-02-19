const express = require("express");
const { generateRoadmap, getRoadmap } = require("../controllers/roadmapController");
const { protect } = require("../middleware/authMiddleware");
const { updateRoadmapStatus } = require("../controllers/roadmapController");

const router = express.Router();

router.post("/generate", protect, generateRoadmap);
router.get("/", protect, getRoadmap);

router.patch("/update-status", protect, updateRoadmapStatus);

module.exports = router;
