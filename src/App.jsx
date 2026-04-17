import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';

// Pages
import LoginPage from './pages/LoginPage';
import Onboarding from './pages/Onboarding';
import WorkerDashboard from './pages/WorkerDashboard';
import PolicyPage from './pages/PolicyPage';
import ClaimsHistory from './pages/ClaimsHistory';
import PayoutHistory from './pages/PayoutHistory';
import FraudShield from './pages/FraudShield';
import AdminDashboard from './pages/AdminDashboard';
import Insights from './pages/Insights';
import PaymentCheckout from './components/PaymentCheckout';

const ProtectedRoute = ({ children }) => {
  const { isDemo } = useApp();
  const token = sessionStorage.getItem('paynest_token');
  
  if (!token && !isDemo) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppRoutes() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <WorkerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/protection" element={
          <ProtectedRoute>
            <PolicyPage />
          </ProtectedRoute>
        } />
        
        <Route path="/claims" element={
          <ProtectedRoute>
            <ClaimsHistory />
          </ProtectedRoute>
        } />
        
        <Route path="/payouts" element={
          <ProtectedRoute>
            <PayoutHistory />
          </ProtectedRoute>
        } />
        
        <Route path="/fraud" element={
          <ProtectedRoute>
            <FraudShield />
          </ProtectedRoute>
        } />
        
        <Route path="/insights" element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <AdminDashboard />
        } />

        <Route path="/payment" element={
          <ProtectedRoute>
            <PaymentCheckout />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen on first visit (check sessionStorage)
    const hasVisited = sessionStorage.getItem('paynest_visited');
    if (hasVisited) {
      setShowSplash(false);
    } else {
      // First visit - show splash for 4 seconds then hide
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('paynest_visited', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) {
    return (
      <SplashScreen 
        onComplete={() => {
          setShowSplash(false);
          sessionStorage.setItem('paynest_visited', 'true');
        }} 
      />
    );
  }

  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
