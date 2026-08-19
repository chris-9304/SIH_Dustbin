import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Scan } from "./pages/Scan";
import { Bins } from "./pages/Bins";
import { BinDetail } from "./pages/BinDetail";
import { Throw } from "./pages/Throw";
import { Rewards } from "./pages/Rewards";
import { RoutesPage } from "./pages/RoutesPage";
import { Admin } from "./pages/Admin";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />
          <Route path="/bins" element={<ProtectedRoute><Bins /></ProtectedRoute>} />
          <Route path="/bins/:id" element={<ProtectedRoute><BinDetail /></ProtectedRoute>} />
          <Route path="/throw" element={<ProtectedRoute><Throw /></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
          <Route path="/routes" element={<ProtectedRoute role="ADMIN"><RoutesPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="ADMIN"><Admin /></ProtectedRoute>} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
