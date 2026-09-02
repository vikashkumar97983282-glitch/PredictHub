import "./App.css";
import { Routes, Route } from "react-router-dom";

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

import { SidebarProvider } from "./contexts/sidebar-context";

// Admin
import AdminHome from "./admin/pages/AdminHome";
import AdminLayout from "./admin/contents/adminLayout";

function App() {
  return (
    <SidebarProvider>
      <Routes>

        {/* =========================
            USER ROUTES
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<CreateUser />} />

        <Route path="/about" element={<About />} />

        <Route path="/prediction">
          <Route index element={<Prediction />} />
          <Route
            path="placement"
            element={<PlacementForm />}
          />
          <Route
            path="*"
            element={<ComingSoon />}
          />
        </Route>

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/trending"
          element={<Trending />}
        />

        <Route
          path="/community"
          element={<Community />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* =========================
            ADMIN ROUTES
        ========================== */}

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          }
        />

      </Routes>
    </SidebarProvider>
  );
}

export default App;