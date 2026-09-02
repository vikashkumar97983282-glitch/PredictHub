import React from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">

        {/* =========================
            LEFT
        ========================== */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 lg:hidden"
          >
            <Menu size={21} />
          </button>

          {/* Desktop Page Title */}
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              Admin Panel
            </p>

            <p className="text-xs text-gray-400">
              Manage PredictHub
            </p>
          </div>
        </div>

        {/* =========================
            RIGHT
        ========================== */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search */}
          <div className="relative hidden md:block">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-56 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Notification */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* Admin Profile */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <ShieldCheck size={18} />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-gray-900">
                Admin
              </p>

              <p className="text-xs text-gray-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-gray-400 sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;