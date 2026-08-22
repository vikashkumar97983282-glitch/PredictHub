import React from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header
      className="
        flex h-13.75 w-full shrink-0
        items-center justify-between
        border-b border-[#263244]
        bg-[#0d1626]
        px-4
        sm:px-6
        lg:px-7
      "
    >

      {/* ================= LEFT ================= */}
      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="
            flex shrink-0
            items-center justify-center
            rounded-md
            p-1.5
            text-[#9aa8bd]
            transition
            hover:bg-[#172235]
            hover:text-white
            lg:hidden
          "
        >
          <Menu size={21} />
        </button>

        {/* Search */}
        <div
          className="
            flex min-w-0
            items-center gap-2.5
            text-[#718096]
            sm:gap-3
          "
        >

          <Search
            size={18}
            strokeWidth={1.5}
            className="shrink-0"
          />

          <input
            type="text"
            placeholder="Search"
            className="
              w-24
              bg-transparent
              text-sm
              text-white
              outline-none
              placeholder:text-[#718096]

              focus:w-32

              sm:w-40
              sm:focus:w-48

              md:w-56
            "
          />

        </div>

      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex shrink-0 items-center">

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="
            mr-3
            rounded-md
            p-1.5
            text-[#718096]
            transition
            hover:bg-[#172235]
            hover:text-white
            sm:mr-5
          "
        >
          <Bell
            size={18}
            strokeWidth={1.5}
          />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-[#263244]" />

        {/* Profile */}
        <button
          type="button"
          className="
            ml-3
            flex items-center gap-2
            rounded-md
            p-1
            transition
            hover:bg-[#172235]

            sm:ml-5
            sm:gap-3
          "
        >

          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="
              h-7 w-7
              shrink-0
              rounded-full
              object-cover
            "
          />

          <span
            className="
              hidden
              text-sm
              font-semibold
              text-white
              md:block
            "
          >
            Tom Cook
          </span>

          <ChevronDown
            size={15}
            className="shrink-0 text-[#718096]"
          />

        </button>

      </div>

    </header>
  );
}

export default Navbar;