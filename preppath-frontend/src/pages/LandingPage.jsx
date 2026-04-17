import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1e1b4b] text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-5 bg-white/5 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-bold">
          PrepPath <span className="text-blue-400">AI</span>
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-24">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Your AI-Powered <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Placement Roadmap
          </span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-xl">
          Prep smarter, not harder. Get personalized daily tasks,
          track your progress, and crack your dream company with AI guidance.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:opacity-90 transition shadow-[0_0_25px_rgba(59,130,246,0.4)]"
        >
          Generate My Roadmap
        </button>

      </div>

      {/* FEATURES */}
      <div className="mt-32 px-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-2">AI Roadmaps</h3>
          <p className="text-gray-400 text-sm">
            Get customized preparation plans based on your skill level and goals.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-400 text-sm">
            Monitor your daily progress and stay consistent with your preparation.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-2">Smart Guidance</h3>
          <p className="text-gray-400 text-sm">
            AI suggests what to focus on next to maximize your chances.
          </p>
        </div>

      </div>

      {/* HOW IT WORKS */}
      <div className="mt-32 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <div className="flex flex-col md:flex-row justify-center gap-8">

          <div>
            <p className="text-lg font-semibold">1. Create Profile</p>
            <p className="text-gray-400 text-sm">Enter your goals & skill level</p>
          </div>

          <div>
            <p className="text-lg font-semibold">2. Generate Roadmap</p>
            <p className="text-gray-400 text-sm">AI builds your daily plan</p>
          </div>

          <div>
            <p className="text-lg font-semibold">3. Track & Succeed</p>
            <p className="text-gray-400 text-sm">Stay consistent and crack placements</p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="mt-32 mb-20 text-center">
        <h2 className="text-3xl font-bold">
          Start Your Journey Today 🚀
        </h2>

        <button
          onClick={() => navigate("/register")}
          className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:opacity-90 transition"
        >
          Get Started Free
        </button>
      </div>

    </div>
  );
};

export default Landing;