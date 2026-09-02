import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  Brain,
  TrendingUp,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const AdminSidebar = ({
  sidebarOpen = true,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Create User",
      path: "/admin/users/create",
      icon: UserPlus,
    },
    {
      name: "Models",
      path: "/admin/models",
      icon: Brain,
    },
    {
      name: "Predictions",
      path: "/admin/predictions",
      icon: TrendingUp,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    // Clear authentication later
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        flex-col
        border-r
        border-slate-200
        bg-white
        transition-all
        duration-300
        ${sidebarOpen ? "w-64" : "w-20"}
      `}
    >

      {/* ==========================================
          LOGO
      =========================================== */}
      <div className="flex h-16 items-center border-b border-slate-200 px-4">

        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            P
          </div>

          {/* Brand */}
          {sidebarOpen && (
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-slate-900">
                PredictHub
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                Admin Panel
              </p>
            </div>
          )}

        </div>

      </div>


      {/* ==========================================
          MAIN MENU
      =========================================== */}
      <div className="flex-1 overflow-y-auto px-3 py-6">

        {sidebarOpen && (
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>
        )}

        <nav className="space-y-1">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin/dashboard"}
                className={({ isActive }) => `
                  group
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }

                  ${sidebarOpen ? "" : "justify-center"}
                `}
              >

                <Icon
                  size={19}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                {sidebarOpen && (
                  <span>
                    {item.name}
                  </span>
                )}

              </NavLink>
            );
          })}

        </nav>

      </div>


      {/* ==========================================
          ADMIN PROFILE
      =========================================== */}
      <div className="border-t border-slate-200 p-3">

        <div
          className={`
            flex
            items-center
            rounded-lg
            bg-slate-50
            p-2

            ${sidebarOpen ? "gap-3" : "justify-center"}
          `}
        >

          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            A
          </div>


          {/* Admin info */}
          {sidebarOpen && (
            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold text-slate-800">
                Admin
              </p>

              <p className="truncate text-xs text-slate-400">
                Administrator
              </p>

            </div>
          )}


          {/* Logout */}
          {sidebarOpen && (
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-red-500"
            >
              <LogOut size={18} />
            </button>
          )}

        </div>

      </div>

    </aside>
  );
};

export default AdminSidebar;