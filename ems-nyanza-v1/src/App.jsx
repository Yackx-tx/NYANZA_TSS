import { Routes, Route, Navigate } from "react-router-dom"
// import ProtectedRoute from "./components/ProtectedRoute"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardLayout from "./layouts/DashboardLayout"
import DashboardPage from "./pages/dashboard/DashboardPage"
import JobPositionsPage from "./pages/dashboard/JobPositionsPage"
import ApplicantsPage from "./pages/dashboard/ApplicantsPage"
import ApplicationsPage from "./pages/dashboard/ApplicationsPage"
import ReportsPage from "./pages/dashboard/ReportsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="job-positions" element={<JobPositionsPage />} />
        <Route path="applicants" element={<ApplicantsPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

