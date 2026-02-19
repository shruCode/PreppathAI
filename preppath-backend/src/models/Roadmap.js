const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    roadmap: [
      {
        day: Number,
        topic: String,
        type: {
          type: String,
          enum: ["learning", "practice", "mock"],
        },
        status: {
          type: String,
          enum: ["pending", "completed"],
          default: "pending"
        }
      }
    ],
    estimatedCompletion: String,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);
