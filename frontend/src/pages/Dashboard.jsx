import { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingDay, setUpdatingDay] = useState(null);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkProfileAndLoad();
  }, []);
  
  const checkProfileAndLoad = async () => {
  try {
    // 🔍 Check if profile exists
    const res = await axios.get("/profile");

    if (!res.data) {
      navigate("/profile");
      return;
    }

    // ✅ If profile exists → load roadmap
    fetchRoadmap();

  } catch (error) {
    // If profile not found → redirect
    navigate("/profile");
  }finally {
    setLoading(false);
  }
};


  const fetchRoadmap = async () => {
  try {
    const res = await axios.get("/roadmap");

   const roadmapData = res.data?.roadmap?.roadmap || [];

   if (roadmapData.length === 0) {
    setRoadmap([]);
    setProgress(0);
    return;
  }

  setRoadmap(roadmapData);

  const completed = roadmapData.filter(
    (item) => item.status === "completed"
  ).length;

  setProgress(Math.round((completed / roadmapData.length) * 100));

  } catch (error) {
    setRoadmap([]); // instead of mock
  }
};

const generateRoadmap = async () => {
  try {
    setGenerating(true);

    const res = await axios.post("/roadmap/generate");

    const roadmapData = res.data.roadmap.roadmap;

    setRoadmap(roadmapData);

    const completed = roadmapData.filter(
      (item) => item.status === "completed"
    ).length;

    setProgress(Math.round((completed / roadmapData.length) * 100));

    toast.success("Roadmap generated successfully!");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to generate roadmap"
    );
  } finally {
    setGenerating(false);
  }
};


  const updateStatus = async (day, status) => {
    try {
        setUpdatingDay(day);
      const res = await axios.patch("/roadmap/update-status", {
        day,
        status,
      });

      setRoadmap(res.data.roadmap.roadmap);
      setProgress(res.data.progressPercentage);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    }finally {
    setUpdatingDay(null);
  }
  };

  //Reset roadmap
  const handleReset = async () => {
    const confirmReset = window.confirm(
     "Are you sure you want to reset your roadmap?"
    );

    if (!confirmReset) return;

    try {
    await axios.delete("/roadmap");

    setRoadmap([]);
    setProgress(0);

    toast.success("Roadmap reset successfully!");
  } catch (error) {
  if (error.response?.status === 404) {
    setRoadmap([]);
    setProgress(0);
    toast("No roadmap to reset");
  } else {
    toast.error(
      error.response?.data?.message || "Reset failed"
    );
  }
}
};
     
      if (loading) {
    return <p>Loading...</p>;
    }
   
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1e1b4b]">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1e1b4b] p-6 text-white">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-6">Your Roadmap</h2>

        {/* Reset Button */}
        {roadmap.length > 0 && (
          <button
            onClick={handleReset}
            className="mb-4 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition shadow-[0_0_10px_rgba(239,68,68,0.5)]"
          >
            Reset Roadmap
          </button>
        )}

        {/* Progress Section */}
        {roadmap.length > 0 && (
          <div className="mb-6">
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {progress}% completed
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {roadmap.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">

            <p className="text-gray-400 text-lg">
              No roadmap generated yet
            </p>

            <button
              onClick={generateRoadmap}
              disabled={generating}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:opacity-90 transition shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              {generating ? "Generating..." : "Generate AI Roadmap"}
            </button>

          </div>
        ) : (
          /* ROADMAP GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {roadmap.map((item, index) => {
              const previousDay = roadmap[item.day - 2];

              const isLocked =
                item.day !== 1 && previousDay?.status !== "completed";

              const isCurrent =
                item.status === "pending" &&
                (item.day === 1 || previousDay?.status === "completed");

              const lastCompletedIndex = roadmap
                .map((i) => i.status)
                .lastIndexOf("completed");

              const lastCompletedDay = lastCompletedIndex + 1;

              return (
                <div
                  key={item.day}
                  className={`p-5 rounded-2xl border backdrop-blur-md bg-white/5 transition 
                  ${
                    isCurrent
                      ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                      : "border-white/10"
                  }
                  ${isLocked ? "opacity-40" : ""}
                  `}
                >
                  {/* Day */}
                  <h3 className="text-lg font-semibold mb-2">
                    Day {item.day} — {item.topic}
                  </h3>

                  {/* Status */}
                  <span
                    className={`text-xs px-2 py-1 rounded-full 
                    ${
                      item.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>

                  {/* Info */}
                  <p className="text-xs text-gray-500">{item.type}</p>

                  {/* Button */}
                  <div className="mt-4">
                    {item.status === "pending" ? (
                      <button
                        disabled={isLocked || updatingDay === item.day}
                        onClick={() =>
                          updateStatus(item.day, "completed")
                        }
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition disabled:opacity-40"
                      >
                        {updatingDay === item.day
                          ? "Updating..."
                          : "Mark Complete"}
                      </button>
                    ) : (
                      <button
                        disabled={
                          item.day !== lastCompletedDay ||
                          updatingDay === item.day
                        }
                        onClick={() =>
                          updateStatus(item.day, "pending")
                        }
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90 transition disabled:opacity-40"
                      >
                        {updatingDay === item.day
                          ? "Updating..."
                          : "Undo"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Dashboard;