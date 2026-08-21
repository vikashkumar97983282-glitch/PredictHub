import React from "react";
import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";



function Navbar(){


    return(
        <div className="">
            {/* Main Area */}
        <main className="flex min-w-0 flex-1 flex-col">

          {/* Top Header */}
          <header className="flex h-16.75 items-center justify-between border-b border-[#263244] px-7">

            {/* Search */}
            <div className="flex items-center gap-3 text-[#718096]">
              <Search size={18} strokeWidth={1.5} />

              <input
                type="text"
                placeholder="Search"
                className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-[#63728a]"
              />
            </div>

            {/* Right Side */}
            <div className="flex items-center">

              {/* Notification */}
              <button className="mr-5 text-[#9aa8bd] hover:text-white">
                <Bell size={18} strokeWidth={1.5} />
              </button>

              <div className="h-6 w-px bg-[#263244]" />

              {/* Profile */}
              <button className="ml-5 flex items-center gap-3">

                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Profile"
                  className="h-7 w-7 rounded-full object-cover"
                />

                <span className="text-sm font-semibold text-white">
                  Tom Cook
                </span>

                <ChevronDown
                  size={15}
                  className="text-[#718096]"
                />
              </button>

            </div>
          </header>

          {/* Content */}
          <section className="flex-1 p-7">

            {/* Large Placeholder */}
            <div
              className="
                h-full
                rounded-lg
                border
                border-dashed
                border-[#344154]
                bg-[#0d1626]
                bg-[repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent_5px,
                  rgba(100,116,139,0.08)_5px,
                  rgba(100,116,139,0.08)_6px
                )]
              "
            />

          </section>
        </main> 
        </div>    
    )
}

export default Navbar;