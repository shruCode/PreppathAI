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

    if (!res.data.roadmap || res.data.roadmap.roadmap.length === 0) {
      setRoadmap([]);
      return;
    }

    setRoadmap(res.data.roadmap.roadmap);

    const total = res.data.roadmap.roadmap.length;
    const completed = res.data.roadmap.roadmap.filter(
      (item) => item.status === "completed"
    ).length;

    setProgress(Math.round((completed / total) * 100));

  } catch (error) {
    setRoadmap([]); // instead of mock
  }
};

const generateRoadmap = async () => {
  try {
    // 🔥 TEMP: simulate backend response
    const mockData = [
      { day: 1, topic: "Arrays Basics", type: "learning", status: "pending" },
      { day: 2, topic: "Sorting", type: "practice", status: "pending" },
      { day: 3, topic: "Binary Search", type: "learning", status: "pending" },
    ];

    setRoadmap(mockData);
    setProgress(0);

    toast.success("Roadmap generated!");
  } catch (error) {
    toast.error("Failed to generate roadmap");
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
      <Navbar />
    <div style={styles.container}>
      <h2>Your Roadmap</h2>
      {/*Reset button*/}
      {roadmap.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <button onClick={handleReset} style={styles.resetBtn}>
            Reset Roadmap
          </button>
        </div>
      )}
      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }} />
      </div>
      <p>{progress}% completed</p>

      {/* Cards */}
      {roadmap.length === 0 ? (
        <div>   
        <p>No roadmap available.</p>
        <button onClick={generateRoadmap}>
      Generate Roadmap
    </button>
    </div>
      ) : (
      <div style={styles.grid}>
        {roadmap.map((item) => {
            const previousDay = roadmap[item.day - 2];

            const isLocked =
            item.day !== 1 && previousDay?.status !== "completed";

            const isCurrent =
            item.status === "pending" &&
            (item.day === 1 || previousDay?.status === "completed");
             
            const lastCompletedIndex = roadmap
            .map((item) => item.status)
            .lastIndexOf("completed");

            const lastCompletedDay = lastCompletedIndex + 1;

            return(
            
          <div key={item.day} 
           style={{
              ...styles.card,
              border: isCurrent ? "2px solid blue" : "1px solid #ccc",
               opacity: isLocked ? 0.5 : 1,
            }}
          >
            <h3>Day {item.day}</h3>
            <p
            style={{
              color: item.status === "completed" ? "green" : "orange",
            }}
            >
            Status: {item.status}
            </p>
            <p>Type: {item.type}</p>
            
            <div style={styles.buttonGroup}>
              {item.status === "pending" ? (
                <button
                disabled={isLocked || updatingDay === item.day}
                onClick={() => updateStatus(item.day, "completed")}
                style={{
                    ...styles.completeBtn,
                    opacity: isLocked ? 0.5 : 1,
                    cursor: isLocked ? "not-allowed" : "pointer",
                }}
                >
                 {updatingDay === item.day ? "Updating..." : "Complete"}
                </button>
              ) : (
                <button
                  disabled={item.day !== lastCompletedDay || updatingDay === item.day}
                  onClick={() => updateStatus(item.day, "pending")}
                  style={{
                    ...styles.undoBtn,
                    opacity: item.day !== lastCompletedDay ? 0.5 : 1,
                    cursor:
                    item.day !== lastCompletedDay
                    ? "not-allowed"
                    : "pointer",
                  }}
                >
                   {updatingDay === item.day ? "Updating..." : "Undo"}
                </button>   
              )}
            </div>
          </div>
            )
        })}
      </div>
      )}
    </div>
    </>
  );
};

export default Dashboard;


const styles = {
  container: {
    padding: "20px",
  },
  progressContainer: {
    width: "100%",
    height: "10px",
    backgroundColor: "#ddd",
    marginBottom: "10px",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "green",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
  },
  buttonGroup: {
    marginTop: "10px",
  },
  completeBtn: {
    backgroundColor: "green",
    color: "white",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
  },
  undoBtn: {
    backgroundColor: "orange",
    color: "white",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
  },
  resetBtn: {
  backgroundColor: "red",
  color: "white",
  padding: "8px 12px",
  border: "none",
  cursor: "pointer",
},
};