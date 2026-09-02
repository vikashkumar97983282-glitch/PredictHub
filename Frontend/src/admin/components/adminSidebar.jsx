import React from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Brain,
  BarChart3,
  TrendingUp,
  Settings,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function AdminSidebar({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse,
}) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Create User",
      path: "/admin/create-user",
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

  return (
    <>
      {/* =========================
          MOBILE BACKDROP
      ========================== */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* =========================
          SIDEBAR
      ========================== */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen flex-col
          border-r border-gray-200 bg-white
          transition-all duration-300
          ${isCollapsed ? "w-20" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* =========================
            LOGO
        ========================== */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-4">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center w-full" : "gap-3"
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              P
            </div>

            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  PredictHub
                </h1>

                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Admin Panel
                </p>
              </div>
            )}
          </div>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* =========================
            NAVIGATION
        ========================== */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p
            className={`mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={onClose}
                  title={isCollapsed ? item.name : ""}
                  className={({ isActive }) =>
                    `
                    group flex h-11 items-center rounded-lg
                    text-sm font-medium transition
                    ${
                      isCollapsed
                        ? "justify-center px-0"
                        : "gap-3 px-3"
                    }
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={`shrink-0 ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />

                      {!isCollapsed && <span>{item.name}</span>}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* =========================
            ADMIN PROFILE
        ========================== */}
        <div className="border-t border-gray-200 p-3">
          <div
            className={`flex items-center rounded-lg bg-gray-50 p-2 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
              A
            </div>

            {!isCollapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    Admin
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    Administrator
                  </p>
                </div>

                <button
                  type="button"
                  title="Logout"
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-white hover:text-red-500"
                >
                  <LogOut size={17} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* =========================
            COLLAPSE BUTTON
        ========================== */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="absolute -right-3 top-20 hidden h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight size={15} />
          ) : (
            <ChevronLeft size={15} />
          )}
        </button>
      </aside>
    </>
  );
}

export default AdminSidebar;