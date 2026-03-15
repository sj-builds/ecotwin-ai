import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Dashboard from "./pages/Dashboard";
import DigitalTwin from "./pages/DigitalTwin";
import AIInsightsPage from "./pages/AIInsights";
import AlertsPage from "./pages/AlertsPage";
import ReportsPage from "./pages/ReportsPage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import ProtectedRoute from "./components/ProtectedRoute";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        <Toaster />
        <Sonner />

        <BrowserRouter>

          <Routes>

            {/* Auth Routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/digital-twin"
              element={
                <ProtectedRoute>
                  <DigitalTwin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ai-insights"
              element={
                <ProtectedRoute>
                  <AIInsightsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/alerts"
              element={
                <ProtectedRoute>
                  <AlertsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />

          </Routes>

        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}