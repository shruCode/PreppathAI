import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout,user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo} onClick={() => navigate("/dashboard")}>
        PrepPath
      </h2>

      <div>
         <span style={{ marginRight: "15px" }}>
           {user?.name || "User"}
         </span>

        <button onClick={() => navigate("/profile")} style={styles.btn}>
          Profile
        </button>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;


const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#222",
    color: "#fff",
  },
  logo: {
    cursor: "pointer",
  },
  btn: {
    marginRight: "10px",
    padding: "6px 12px",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "6px 12px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};