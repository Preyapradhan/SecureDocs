import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [aadhaar, setAadhaar] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        setAadhaar("XXXX-XXXX-1234"); // Replace with actual Aadhaar fetching logic
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold">User Profile</h2>
        {user ? (
          <>
            <p>Email: {user.email}</p>
            <p>Aadhaar: {aadhaar}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
