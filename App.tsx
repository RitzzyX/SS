import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Component
const ProtectedAdminRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAdminLoggedIn } = useApp();
  if (!isAdminLoggedIn) return <Navigate to="/admin" replace />;
  return <>{children}</>;
};

// Wrapper for checking if admin is already logged in
const AdminAuthCheck = () => {
    const { isAdminLoggedIn } = useApp();
    if (isAdminLoggedIn) return <Navigate to="/admin/dashboard" replace />;
    return <AdminLogin />;
}

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminAuthCheck />} />
            <Route path="/admin/dashboard" element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
};

export default App;