import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("Verifying OTP...");

    // Fetch the latest OTP from Supabase
    const { data, error } = await supabase
      .from("otps")
      .select("otp_code")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error || data.length === 0) {
      setMessage("Invalid OTP or email.");
      return;
    }

    // Compare entered OTP with stored OTP
    if (data[0].otp_code === otp) {
      setMessage("OTP Verified! Logging in...");

      // Log in user (You can set session/cookies here)
      sessionStorage.setItem("user", email);
      window.location.href = "/dashboard"; // Redirect to dashboard
    } else {
      setMessage("Incorrect OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-xl font-bold text-center">Verify OTP</h2>
        <form onSubmit={handleVerify} className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <button type="submit" className="w-full mt-2 bg-green-600 text-white p-2 rounded">
            Verify OTP
          </button>
        </form>
        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </div>
  );
}
