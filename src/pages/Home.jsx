import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Home() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{ backgroundImage: "url('/life_1920.jpg')" }}
    >
      {/* Colorful Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7b2ff7]/70 via-[#f107a3]/70 to-[#00f0ff]/70 backdrop-blur-sm"></div>

      {/* Modern Card with Glassmorphism */}
      <div className="relative z-10 text-white text-center px-6 py-12 sm:px-14 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] max-w-3xl w-[95%] sm:w-full animate-fade-in-up">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f9d423] via-[#ff4e50] to-[#e100ff] drop-shadow-lg">
          Welcome to SecureDocs
        </h1>

        <p className="text-base sm:text-xl text-white/80 mb-10 leading-relaxed font-medium">
          Your intelligent and secure hub to store and share government documents with loved ones.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          Get Started
          <FaArrowRight className="text-white animate-bounce" />
        </Link>

        <p className="mt-10 text-sm text-white/60 hover:text-white transition-opacity">
          &copy; 2025 <span className="font-semibold">SecureDocs</span>. All rights reserved.
        </p>
      </div>

      {/* Floating Color Particles (Optional Styling Add-On) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-pink-500/30 blur-3xl rounded-full top-10 left-10 animate-pulse-slow" />
        <div className="absolute w-32 h-32 bg-blue-500/30 blur-3xl rounded-full top-[60%] right-10 animate-pulse-slow" />
        <div className="absolute w-24 h-24 bg-purple-500/30 blur-2xl rounded-full bottom-20 left-[50%] animate-pulse-slow" />
      </div>
    </div>
  );
}

export default Home;
