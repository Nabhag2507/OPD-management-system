import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import PublicLayout from "./layout/PublicLayout";
import AuthLayout from "./layout/AuthLayout";
import Intro from "./pages/Intro";
import AdminDashboard from "./roles/admin/AdminDashboard"
import DoctorDashboard from "./roles/doctor/DoctorDashboard"
import ReceptionistDashboard from "./roles/receptionist/ReceptionistDashboard"
import ProtectedRoute from "./auth/ProtectedRoute";
import PatientDashboard from "./roles/patient/PatientDashboard";
import MainLayout from "./layout/MainLayout"

function App() {
  return (
    <Routes>

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Intro />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="DOCTOR">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorDashboard />} />
      </Route>

      <Route
        path="/receptionist"
        element={
          <ProtectedRoute role="RECEPTIONIST">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ReceptionistDashboard />} />
      </Route>

      <Route
        path="/patient"
        element={
          <ProtectedRoute role="PATIENT">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientDashboard />} />
      </Route>


    </Routes>
  );
}

export default App;
