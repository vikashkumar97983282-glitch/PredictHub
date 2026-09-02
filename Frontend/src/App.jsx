import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

// =========================
// USER PAGES
// =========================
import Home from "./pages/home";
import About from "./pages/about";
import Prediction from "./pages/prediction";
import ComingSoon from "./pages/coming-soon";
import PlacementForm from "./pages/placement";
import Analytics from "./pages/analytics";
import Trending from "./pages/trending";
import Community from "./pages/community";
import Profile from "./pages/profile";
import Login from "./pages/login";
import CreateUser from "./pages/CreateUser";

// =========================
// CONTEXT
// =========================
import { SidebarProvider } from "./contexts/sidebar-context";

// =========================
// ADMIN LAYOUT
// =========================
import AdminLayout from "./admin/contents/AdminLayout";

// =========================
// ADMIN PAGES
// =========================
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminModels from "./admin/pages/AdminModels";
import AdminPredictions from "./admin/pages/AdminPredictions";
import AdminAnalytics from "./admin/pages/AdminAnalytics";
import AdminSettings from "./admin/pages/AdminSettings";

// ⭐ ADMIN CREATE USER
import AdminCreateUser from "./admin/pages/CreateUser";

function App() {
  return (
    <SidebarProvider>
      <Routes>

        {/* =====================================================
            USER ROUTES
        ===================================================== */}

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* User Registration */}
        <Route path="/register" element={<CreateUser />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* =====================================================
            PREDICTION ROUTES
        ===================================================== */}

        <Route path="/prediction">

          {/* /prediction */}
          <Route
            index
            element={<Prediction />}
          />

          {/* /prediction/placement */}
          <Route
            path="placement"
            element={<PlacementForm />}
          />

          {/* Unknown prediction pages */}
          <Route
            path="*"
            element={<ComingSoon />}
          />

        </Route>

        {/* =====================================================
            OTHER USER ROUTES
        ===================================================== */}

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Trending */}
        <Route
          path="/trending"
          element={<Trending />}
        />

        {/* Community */}
        <Route
          path="/community"
          element={<Community />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* =====================================================
            ADMIN ROUTES
        ===================================================== */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* /admin */}
          <Route
            index
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          {/* -----------------------------------------------
              DASHBOARD
              /admin/dashboard
          ------------------------------------------------ */}
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          {/* -----------------------------------------------
              USERS
              /admin/users
          ------------------------------------------------ */}
          <Route
            path="users"
            element={<AdminUsers />}
          />

          {/* -----------------------------------------------
              CREATE USER
              /admin/users/create
          ------------------------------------------------ */}
          <Route
            path="users/create"
            element={<AdminCreateUser />}
          />

          {/* -----------------------------------------------
              MODELS
              /admin/models
          ------------------------------------------------ */}
          <Route
            path="models"
            element={<AdminModels />}
          />

          {/* -----------------------------------------------
              PREDICTIONS
              /admin/predictions
          ------------------------------------------------ */}
          <Route
            path="predictions"
            element={<AdminPredictions />}
          />

          {/* -----------------------------------------------
              ANALYTICS
              /admin/analytics
          ------------------------------------------------ */}
          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />

          {/* -----------------------------------------------
              SETTINGS
              /admin/settings
          ------------------------------------------------ */}
          <Route
            path="settings"
            element={<AdminSettings />}
          />

        </Route>

        {/* =====================================================
            GLOBAL FALLBACK
        ===================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </SidebarProvider>
  );
}

export default App;