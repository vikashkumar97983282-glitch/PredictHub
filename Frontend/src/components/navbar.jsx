
import React from "react";
import { Search, Bell, ChevronDown,} from "lucide-react";

import Content from "./content";

function Navbar() {
  return (
    <main className="flex min-w-0 flex-1 flex-col bg-[#030712]">

      {/* Top Header */}
      <header className="flex h-14.75 items-center justify-between border-b border-[#263244] px-7">

        {/* Search */}
        <div className="flex items-center gap-3 text-[#718096]">
          <Search
            size={18}
            strokeWidth={1.5}
          />

          <input
            type="text"
            placeholder="Search"
            className="w-40 bg-transparent text-sm text-[#334155] outline-none placeholder:text-[#718096]"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center">

          {/* Notification */}
          <button className="mr-5 text-[#718096] hover:text-[#111827]">
            <Bell
              size={18}
              strokeWidth={1.5}
            />
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-[#263244]" />

          {/* Profile */}
          <button className="ml-5 flex items-center gap-3">

            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Profile"
              className="h-7 w-7 rounded-full object-cover"
            />

            <span className="text-sm font-semibold text-[#111827]">
              Tom Cook
            </span>

            <ChevronDown
              size={15}
              className="text-[#718096]"
            />

          </button>
        </div>

      </header>

      <Content/>

    </main>
  );
}

export default Navbar;

