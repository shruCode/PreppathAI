import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/LandingPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import "./index.css";

function App() {
  return (
    <>
      <Toaster position="top-right" />
    <Router>
      <Routes>
         <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
       

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;

