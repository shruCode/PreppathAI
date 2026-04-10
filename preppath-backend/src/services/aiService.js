const axios = require("axios");

const generateRoadmapFromAI = async (profileData) => {
  try {
    console.log("Sending to AI:", profileData);
    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/generate-roadmap`,
      profileData
    );

    console.log("AI Response:", response.data);
    return response.data;
    
  } catch (error) {
  console.error("🔥 FULL AI ERROR:");

  if (error.response) {
    // Server responded with error
    console.error("Response Data:", error.response.data);
    console.error("Status:", error.response.status);
  } else if (error.request) {
    // No response received
    console.error("No response received:", error.request);
  } else {
    // Other error
    console.error("Error Message:", error.message);
  }

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
