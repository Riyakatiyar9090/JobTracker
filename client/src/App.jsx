import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";
import LandingPage from "./pages/LandingPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-job"
        element={
          <ProtectedRoute>
            <AddJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-job/:id"
        element={
          <ProtectedRoute>
            <EditJob />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/job/:id" element={<JobDetails />} />
      {/* <Route path="/" element={<LandingPage />} /> */}
    </Routes>
  );
}

export default App;
