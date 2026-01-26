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

// Admin Pages
import HospitalMaster from "./roles/admin/HospitalMaster";
import DoctorMaster from "./roles/admin/DoctorMaster";
import DiagnosisTypeMaster from "./roles/admin/DiagnosisTypeMaster";
import TreatmentTypeMaster from "./roles/admin/TreatmentTypeMaster";
import SubTreatmentTypeMaster from "./roles/admin/SubTreatmentTypeMaster";
import Reports from "./roles/admin/Reports";

// Doctor Pages
import MyPatients from "./roles/doctor/MyPatients";
import DoctorOPDEntry from "./roles/doctor/OPDEntry";
import Prescriptions from "./roles/doctor/Prescriptions";

// Receptionist Pages
import PatientRegistration from "./roles/receptionist/PatientRegistration";
import ReceptionistOPDEntry from "./roles/receptionist/OPDEntry";
import ReceiptEntry from "./roles/receptionist/ReceiptEntry";

// Patient Pages
import MyAppointments from "./roles/patient/MyAppointments";
import MyTreatments from "./roles/patient/MyTreatments";
import MyReceipts from "./roles/patient/MyReceipts";

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
        <Route path="hospitals" element={<HospitalMaster />} />
        <Route path="doctors" element={<DoctorMaster />} />
        <Route path="diagnosis-types" element={<DiagnosisTypeMaster />} />
        <Route path="treatment-types" element={<TreatmentTypeMaster />} />
        <Route path="sub-treatment-types" element={<SubTreatmentTypeMaster />} />
        <Route path="reports" element={<Reports />} />
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
        <Route path="patients" element={<MyPatients />} />
        <Route path="opd" element={<DoctorOPDEntry />} />
        <Route path="prescriptions" element={<Prescriptions />} />
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
        <Route path="patients" element={<PatientRegistration />} />
        <Route path="opd" element={<ReceptionistOPDEntry />} />
        <Route path="billing" element={<ReceiptEntry />} />
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
        <Route path="appointments" element={<MyAppointments />} />
        <Route path="treatments" element={<MyTreatments />} />
        <Route path="receipts" element={<MyReceipts />} />
      </Route>


    </Routes>
  );
}

export default App;
