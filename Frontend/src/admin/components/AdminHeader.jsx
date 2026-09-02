import React from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

const AdminHeader = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="flex h-full items-center justify-between px-4 sm:px-6">

        {/* Left */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-500">
              Welcome back 👋
            </p>

            <h2 className="text-sm font-semibold text-slate-900">
              Admin Dashboard
            </h2>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Search */}
          <div className="hidden md:flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3">
            <Search size={17} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-36 bg-transparent px-2 py-2 text-sm outline-none lg:w-52"
            />
          </div>

          {/* Notification */}
          <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <Bell size={20} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
              A
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Admin
              </p>

              <p className="text-[11px] text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-slate-400 sm:block"
            />

          </button>

        </div>

      </div>
    </header>
  );
};

export default AdminHeader;