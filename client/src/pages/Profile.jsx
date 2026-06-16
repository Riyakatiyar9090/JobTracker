import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    rejected: 0,
    accepted: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchJobs();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");

      setUser({
        name: res.data.name,
        email: res.data.email,
        profileImage: res.data.profileImage || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");

      const jobs = res.data;

      setStats({
        total: jobs.length,
        applied: jobs.filter((job) => job.status === "Applied").length,
        interview: jobs.filter((job) => job.status === "Interview").length,
        rejected: jobs.filter((job) => job.status === "Rejected").length,
        accepted: jobs.filter((job) => job.status === "Accepted").length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await API.put("/auth/profile", {
        name: user.name,
        email: user.email,
      });

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {
      await API.put("/auth/upload-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchProfile();

      alert("Photo Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Photo Upload Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-heading-box">
            <h1>Your Profile</h1>
          </div>

          <div className="profile-content">
            <div className="profile-left">
              {user.profileImage ? (
                <img
                  src={`https://jobtracker-0b4q.onrender.com/api/uploads/${user.profileImage}`}
                  alt="Profile"
                  className="avatar"
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <label className="upload-btn">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            <div className="profile-right">
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
              />

              {!isEditing ? (
                <button
                  className="save-profile-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <div className="profile-buttons">
                  <button
                    className="save-profile-btn"
                    onClick={() => {
                      saveProfile();
                      setIsEditing(false);
                    }}
                  >
                    Save Profile
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => {
                      fetchProfile();
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-box">
              <h3>{stats.total}</h3>
              <p>Total Jobs</p>
            </div>

            <div className="stat-box applied-box">
              <h3>{stats.applied}</h3>
              <p>Applied</p>
            </div>

            <div className="stat-box interview-box">
              <h3>{stats.interview}</h3>
              <p>Interview</p>
            </div>

            <div className="stat-box rejected-box">
              <h3>{stats.rejected}</h3>
              <p>Rejected</p>
            </div>

            <div className="stat-box accepted-box">
              <h3>{stats.accepted}</h3>
              <p>Accepted</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
