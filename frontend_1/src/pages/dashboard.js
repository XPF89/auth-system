import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome {user.name}</h2>
      <p>{user.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;