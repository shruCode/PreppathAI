const axios = require("axios");

const generateRoadmapFromAI = async (profileData) => {
  try {
    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/generate-roadmap`,
      profileData
    );

    // return response.data;
    
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error("Failed to generate roadmap from AI service");
  }
};

module.exports = { generateRoadmapFromAI };





// const generateRoadmapFromAI = async (profileData) => {
//   // Simulate delay (like real AI call)
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   const { availableDays, skillLevel } = profileData;

//   const roadmap = [];

//   for (let i = 1; i <= availableDays; i++) {
//     roadmap.push({
//       day: i,
//       topic: `Day ${i} - ${
//         i % 3 === 0
//           ? "Mock Test"
//           : skillLevel.dsa === "beginner"
//           ? "DSA Basics"
//           : skillLevel.dsa === "intermediate"
//           ? "DSA Medium Problems"
//           : "Advanced DSA Problems"
//       }`,
//       type: i % 3 === 0 ? "mock" : "practice",
//       status: "pending",
//     });
//   }

//   return {
//     roadmap,
//     estimatedCompletion: `${availableDays} days`,
//   };
// };

// module.exports = { generateRoadmapFromAI };
