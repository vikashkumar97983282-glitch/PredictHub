import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activePanel, setActivePanel] = useState(null);

  const searchItems = [
    ["Dashboard", "/admin/dashboard"],
    ["Users", "/admin/users"],
    ["Activity", "/admin/activity"],
    ["Create User", "/admin/users/create"],
    ["Models", "/admin/models"],
    ["Predictions", "/admin/predictions"],
    ["Analytics", "/admin/analytics"],
    ["Settings", "/admin/settings"],
  ];

  const filteredSearchItems = searchItems.filter(([label]) =>
    label.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const goToSearchResult = (path) => {
    setSearchTerm("");
    setActivePanel(null);
    navigate(path);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && filteredSearchItems[0]) {
      goToSearchResult(filteredSearchItems[0][1]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[#243047] bg-[#0f172a]/90 shadow-lg shadow-black/10 backdrop-blur">

      <div className="flex h-full items-center justify-between px-4 sm:px-6">

        {/* Left */}
        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300 lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="hidden sm:block">
            <p className="text-xs font-medium uppercase tracking-wider text-cyan-300">
              PredictHub Admin
            </p>

            <h2 className="text-sm font-semibold text-white">
              Admin Dashboard
            </h2>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Search */}
          <div className="relative hidden items-center rounded-lg border border-[#243047] bg-slate-900/70 px-3 md:flex">
            <Search size={17} className="text-slate-500" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onFocus={() => setActivePanel("search")}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search..."
              className="w-36 bg-transparent px-2 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-600 lg:w-52"
            />

            {activePanel === "search" && searchTerm && (
              <div className="absolute left-0 top-12 z-50 w-full min-w-52 overflow-hidden rounded-xl border border-[#243047] bg-[#111827] py-1 shadow-2xl shadow-black/30">
                {filteredSearchItems.length > 0 ? (
                  filteredSearchItems.map(([label, path]) => (
                    <button
                      key={path}
                      type="button"
                      onClick={() => goToSearchResult(path)}
                      className="flex w-full px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200"
                    >
                      {label}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2.5 text-sm text-slate-500">
                    No admin page found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Notification */}
          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setActivePanel(activePanel === "notifications" ? null : "notifications")}
              className="relative rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
            >
            <Bell size={20} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-[#0f172a]" />
            </button>

            {activePanel === "notifications" && (
              <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-[#243047] bg-[#111827] p-4 shadow-2xl shadow-black/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold text-cyan-300">2 new</span>
                </div>
                <div className="mt-3 space-y-3">
                  <p className="rounded-lg bg-slate-800/70 p-3 text-xs leading-5 text-slate-300">New user registered recently.</p>
                  <p className="rounded-lg bg-slate-800/70 p-3 text-xs leading-5 text-slate-300">Prediction activity is up this week.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePanel(null)}
                  className="mt-3 text-xs font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Mark as read
                </button>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button type="button" aria-label="Open admin profile" onClick={() => setActivePanel(activePanel === "profile" ? null : "profile")} className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-800">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-sm font-semibold text-slate-950">
              A
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-200">
                Admin
              </p>

              <p className="text-[11px] text-slate-500">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-slate-500 sm:block"
            />

            </button>

            {activePanel === "profile" && (
              <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-[#243047] bg-[#111827] p-2 shadow-2xl shadow-black/30">
                <button type="button" onClick={() => goToSearchResult("/admin/settings")} className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200">
                  Account settings
                </button>
                <button type="button" onClick={handleLogout} className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10">
                  Log out
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

export default AdminHeader;