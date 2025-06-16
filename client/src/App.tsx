import { Routes, Route, Navigate } from "react-router-dom";
import SurveyPage from "@/components/pages/SurveyPage";
import LoginPage from "@/components/pages/LoginPage";
import AdminDashboardPage from "@/components/pages/AdminDashboardPage";
import ProtectedRoute from "@/components/utility/ProtectedRoute";
import { PublicLayout } from "@/components/templates/Layout";
import { useAppSelector } from "@/hooks/redux";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<SurveyPage />} />
      </Route>

      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/admin" replace /> : <LoginPage onSwitchToSurvey={() => { window.location.href = "/"; }} />
        }
      />

      <Route path="/admin" element={<ProtectedRoute />}>
        <Route index element={<AdminDashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
