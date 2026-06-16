import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [user, setUser] = useState({
    name: "",
    profileImage: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");

      setUser({
        name: res.data.name,
        profileImage: res.data.profileImage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div>
        <h2>
          Welcome,{" "}
          {user.name
            ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
            : "User"}
          !
        </h2>

        <p>Here's your overview.</p>
      </div>

      <div className="navbar-actions">
        <button onClick={logoutHandler} className="logout-btn">
          <span>⇥</span>
          <span>Logout</span>
        </button>

        <div className="profile-photo">
          {user.profileImage ? (
            <img
              src={`https://jobtracker-0b4q.onrender.com/uploads/${user.profileImage}`}
              alt="Profile"
              className="navbar-avatar"
            />
          ) : (
            <div className="avatar-placeholder">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
