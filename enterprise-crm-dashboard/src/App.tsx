import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddCustomerPage from "./pages/AddCustomerPage";
import AuditLogsPage from "./pages/AuditLogsPage";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import CustomerListPage from "./pages/CustomerListPage";
import DashboardPage from "./pages/DashboardPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import { useAppDispatch } from "./hooks/reduxHooks";
import { applyTheme } from "./store/theme/themeSlice";
import ArchivedCustomersPage from "./pages/ArchivedCustomersPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(applyTheme());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/customers/add" element={<AddCustomerPage />} />
          <Route path="/customers/archived" element={<ArchivedCustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetailsPage />} />
          <Route path="/customers/:id/edit" element={<EditCustomerPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/audit-logs" element={<AuditLogsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;