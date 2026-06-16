import { FaHome, FaBriefcase, FaPlus, FaUser } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">
        JobTracker <span>🚀</span>
      </h2>{" "}
      <div className="sidebar-content">
        <ul>
          <li onClick={() => navigate("/dashboard")}>
            <FaHome /> Dashboard
          </li>

          <li onClick={() => navigate("/jobs")}>
            <FaBriefcase /> Jobs List
          </li>

          <li onClick={() => navigate("/add-job")}>
            <FaPlus /> Add Job
          </li>

          <li onClick={() => navigate("/profile")}>
            <FaUser /> Profile
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
