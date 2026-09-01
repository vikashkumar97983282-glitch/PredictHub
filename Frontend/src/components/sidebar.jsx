import {
  Home,
  Info,
  TrendingUpDown,
  SquareText,
  FileText,
  PieChart,
  Settings,
  Menu,
  Zap ,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({
  isSidebarOpen,
  isMobileMenuOpen,
  onCloseMobileMenu,
  onToggleSidebar,
}) {
  const location = useLocation();
  const isExpanded = isSidebarOpen || isMobileMenuOpen;

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "About", icon: Info, path: "/about" },
    { name: "Prediction", icon: TrendingUpDown, path: "/prediction" },
    { name: "Analytics", icon: SquareText, path: "/analytics" },
    { name: "Trending", icon: FileText, path: "/trending" },
    { name: "Community", icon: PieChart, path: "/community" },
  ];

  const teams = [
    { name: "Placement Prediction", letter: "P" },
    { name: "Home Price", letter: "H" },
    { name: "Study Hours", letter: "S" },
  ];

  return (
    <>
      {/* ================= MOBILE BACKDROP ================= */}

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onCloseMobileMenu}
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

          lg:sticky
          lg:top-0
          lg:z-auto
          lg:translate-x-0

          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}

          w-57.5
          ${isSidebarOpen ? "lg:w-57.5" : "lg:w-16"}
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
              !isExpanded
                ? "justify-center px-2"
                : "justify-between px-5"
            }
          `}
        >

          {/* Logo */}

          {isExpanded && (
            <div className="flex items-center gap-1.2">
              <Zap
                size={25}
                strokeWidth={2.5}
                className="shrink-0 text-indigo-500"
              />

              <span className="text-[25px] font-bold leading-none text-indigo-500">
                PredictHub
              </span>
            </div>
          )}

          {/* Menu */}

          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) {
                onCloseMobileMenu();
                return;
              }

              onToggleSidebar();
            }}
            className="
              flex
              h-8
              w-8
              ml-2
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
              !isSidebarOpen
                ? "Show sidebar"
                : "Hide sidebar"
            }
            title={
              !isExpanded
                ? "Show sidebar"
                : "Hide sidebar"
            }
          >
            <Menu size={20} strokeWidth={3} />
          </button>

        </div>

        {/* ================= NAVIGATION ================= */}

        <nav className="px-3 pt-4">

          {navItems.map((item) => {
            const Icon = item.icon;

            // Check current page
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onCloseMobileMenu();
                  }
                }}
                title={!isExpanded ? item.name : ""}
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
                    !isExpanded
                      ? "justify-center px-0"
                      : "gap-3 px-3"
                  }

                  ${
                    isActive
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

                {isExpanded && (
                  <span>
                    {item.name}
                  </span>
                )}

              </Link>
            );
          })}

        </nav>

        {/* ================= MY ACTIVITY ================= */}

        {isExpanded && (
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

          <Link
            type="button"
            to="/profile"
            onClick={() => {
              if (window.innerWidth < 1024) {
                onCloseMobileMenu();
              }
            }}
            title={!isExpanded ? "Settings" : ""}
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
                !isExpanded
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

            {isExpanded && (
              <span>
                Settings
              </span>
            )}

          </Link>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;
