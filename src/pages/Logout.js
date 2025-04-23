import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
