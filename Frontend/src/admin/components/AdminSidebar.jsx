import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Activity,
  Users,
  UserPlus,
  Brain,
  TrendingUp,
  BarChart3,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { getStoredUser, logout } from "../../lib/api";
import predictHubImage from "../../assets/predicthub-img.png";

const AdminSidebar = ({
  sidebarOpen = true,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();
  const currentUser = getStoredUser();

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
      name: "Activity",
      path: "/admin/activity",
      icon: Activity,
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

  const handleLogout = async () => {
    // Clear authentication later
    await logout();

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
        border-[#243047]
        bg-[#0f172a]
        shadow-2xl shadow-black/30
        transition-all
        duration-300
        ${sidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"}
      `}
    >

      {/* ==========================================
          LOGO
      =========================================== */}
      <div className="flex h-16 items-center border-b border-[#243047] px-4">

        <div className="flex w-full items-center gap-3">

          {/* Logo */}
          <div className={`${sidebarOpen ? "flex" : "hidden"} h-10 w-10 shrink-0 items-start justify-center overflow-hidden`}>
            <img
              src={predictHubImage}
              alt=""
              aria-hidden="true"
              className="w-14 max-w-none object-contain"
            />
          </div>

          {/* Brand */}
          {sidebarOpen && (
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-white">
                PredictHub
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Admin Panel
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Collapse navigation" : "Expand navigation"}
            className={`${sidebarOpen ? "ml-auto" : "mx-auto"} rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-cyan-300`}
          >
            <Menu size={20} />
          </button>

        </div>

      </div>


      {/* ==========================================
          MAIN MENU
      =========================================== */}
      <div className="flex-1 overflow-y-auto px-3 py-6">

        {sidebarOpen && (
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
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
                end={
                  item.path === "/admin/dashboard" ||
                  item.path === "/admin/users" ||
                  item.path === "/admin/users/create"
                }
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
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
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "text-slate-400 hover:bg-slate-800 hover:text-cyan-200"
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
      <div className="border-t border-[#243047] p-3">

        <div
          className={`
            flex
            items-center
            rounded-lg
            bg-slate-800/70
            p-2

            ${sidebarOpen ? "gap-3" : "justify-center"}
          `}
        >

          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-semibold text-cyan-300">
            A
          </div>


          {/* Admin info */}
          {sidebarOpen && (
            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold text-slate-200">
                {currentUser?.name || "Admin"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {currentUser?.email || "Administrator"}
              </p>

            </div>
          )}


          {/* Logout */}
          {sidebarOpen && (
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-700 hover:text-red-400"
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