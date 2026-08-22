import React from "react";
import {
  Home,
  Info,
  TrendingUpDown,
  SquareText,
  FileText,
  PieChart,
  Settings,
  Menu ,
} from "lucide-react";

function Sidebar({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse,
}) {
  const navItems = [
    { name: "Dashboard", icon: Home },
    { name: "About", icon: Info },
    { name: "Prediction", icon: TrendingUpDown },
    { name: "Analytics", icon: SquareText },
    { name: "Trending", icon: FileText },
    { name: "Community", icon: PieChart },
  ];

  const teams = [
    { name: "Placement Prediction", letter: "P" },
    { name: "Home Price", letter: "H" },
    { name: "Study Hours", letter: "S" },
  ];

  return (
    <>
      {/* ================= MOBILE BACKDROP ================= */}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen
          flex-col
          border-r border-[#263244]
          bg-[#0d1626]
          shadow-2xl
          transition-all duration-300 ease-in-out

          lg:static
          lg:z-auto
          lg:translate-x-0

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          ${isCollapsed ? "w-16" : "w-57.5"}
        `}
      >

        {/* ================= HEADER ================= */}

        <div
          className={`
            flex
            h-14.75
            shrink-0
            items-center

            ${
              isCollapsed
                ? "justify-center px-2"
                : "justify-between px-5"
            }
          `}
        >

          {/* Logo */}

          {!isCollapsed && (
            <div className="text-2xl font-bold text-indigo-500">
              PredictHub
            </div>
          )}

          {/* Three Dot */}

          <button
            type="button"
            onClick={onToggleCollapse}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-md
              text-[#718096]
              transition
              hover:bg-[#172235]
              hover:text-white
            "
            aria-label={
              isCollapsed
                ? "Show sidebar"
                : "Hide sidebar"
            }
            title={
              isCollapsed
                ? "Show sidebar"
                : "Hide sidebar"
            }
          >
            <Menu 
              size={20}
              strokeWidth={2}
            />
          </button>

        </div>

        {/* ================= NAVIGATION ================= */}

        <nav className="px-3 pt-4">

          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                type="button"
                title={isCollapsed ? item.name : ""}
                className={`
                  mb-1
                  flex
                  h-10
                  w-full
                  items-center
                  rounded-md
                  text-left
                  text-sm
                  transition

                  ${
                    isCollapsed
                      ? "justify-center px-0"
                      : "gap-3 px-3"
                  }

                  ${
                    index === 0
                      ? "bg-[#1b2637] text-white"
                      : "text-[#9aa8bd] hover:bg-[#172235] hover:text-white"
                  }
                `}
              >

                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                {!isCollapsed && (
                  <span>
                    {item.name}
                  </span>
                )}

              </button>
            );
          })}

        </nav>

        {/* ================= MY ACTIVITY ================= */}

        {!isCollapsed && (
          <div className="mt-7 px-5">

            <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[#8b9ab1]">
              My Activity
            </p>

            <div className="space-y-3">

              {teams.map((team) => (
                <button
                  key={team.name}
                  type="button"
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    text-left
                    text-sm
                    text-[#aebbd0]
                    transition
                    hover:text-white
                  "
                >

                  <span
                    className="
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-[#334155]
                      bg-[#172235]
                      text-[10px]
                    "
                  >
                    {team.letter}
                  </span>

                  <span className="truncate">
                    {team.name}
                  </span>

                </button>
              ))}

            </div>

          </div>
        )}

        {/* ================= SETTINGS ================= */}

        <div className="mt-auto px-3 pb-4">

          <button
            type="button"
            title={isCollapsed ? "Settings" : ""}
            className={`
              flex
              h-10
              w-full
              items-center
              rounded-md
              text-sm
              text-[#aebbd0]
              transition
              hover:bg-[#172235]
              hover:text-white

              ${
                isCollapsed
                  ? "justify-center px-0"
                  : "gap-3 px-3"
              }
            `}
          >

            <Settings
              size={18}
              strokeWidth={1.8}
              className="shrink-0"
            />

            {!isCollapsed && (
              <span>
                Settings
              </span>
            )}

          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;