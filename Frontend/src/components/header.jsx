import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  LogIn,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Header({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);

  // Temporary login state for testing
  // Change this to your real authentication state later
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // SIGN OUT
  // =========================

  const handleLogout = () => {
    // Remove authentication data if you have any
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setProfileOpen(false);

    // Go to Home after logout
    navigate("/");
  };

  return (
    <header
      className="
        relative
        flex h-13.75 w-full shrink-0
        items-center justify-between
        border-b border-[#263244]
        bg-[#0d1626]
        px-4
        sm:px-6
        lg:px-7
      "
    >

      {/* =====================================================
          LEFT
      ====================================================== */}

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

      {/* =====================================================
          RIGHT
      ====================================================== */}

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

        {/* =====================================================
            PROFILE
        ====================================================== */}

        <div
          ref={profileRef}
          className="relative ml-3 sm:ml-5"
        >

          {/* Profile Button */}

          <button
            type="button"
            onClick={() =>
              setProfileOpen((prev) => !prev)
            }
            aria-expanded={profileOpen}
            className="
              flex
              items-center
              gap-2
              rounded-md
              p-1
              transition
              hover:bg-[#172235]

              sm:gap-3
            "
          >

            {/* Avatar */}

            {isLoggedIn ? (
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Tom Cook"
                className="
                  h-7 w-7
                  shrink-0
                  rounded-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-indigo-600
                  text-xs
                  font-bold
                  text-white
                "
              >
                G
              </div>
            )}

            {/* Name */}

            <span
              className="
                hidden
                text-sm
                font-semibold
                text-white
                md:block
              "
            >
              {isLoggedIn ? "Tom Cook" : "Guest"}
            </span>

            {/* Arrow */}

            <ChevronDown
              size={15}
              className={`
                shrink-0
                text-[#718096]
                transition-transform
                duration-200
                ${profileOpen ? "rotate-180" : ""}
              `}
            />

          </button>

          {/* =====================================================
              DROPDOWN
          ====================================================== */}

          {profileOpen && (
            <div
              className="
                absolute
                right-0
                top-full
                z-50
                mt-2
                w-56
                overflow-hidden
                rounded-xl
                border
                border-[#263244]
                bg-[#0d1626]
                shadow-2xl
              "
            >

              {/* User Information */}

              <div
                className="
                  border-b
                  border-[#263244]
                  px-4
                  py-3
                "
              >

                <p className="text-sm font-semibold text-white">
                  {isLoggedIn ? "Tom Cook" : "Guest User"}
                </p>

                <p className="mt-1 text-xs text-[#718096]">
                  {isLoggedIn
                    ? "tom@example.com"
                    : "You are not logged in"}
                </p>

              </div>

              {/* Profile */}

              <Link
                to="/profile"
                onClick={() => setProfileOpen(false)}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-[#aebbd0]
                  transition
                  hover:bg-[#172235]
                  hover:text-white
                "
              >

                <User
                  size={17}
                  strokeWidth={1.8}
                />

                <span>Profile</span>

              </Link>

              {/* Login / Sign Out */}

              {isLoggedIn ? (

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    border-t
                    border-[#263244]
                    px-4
                    py-3
                    text-sm
                    text-red-400
                    transition
                    hover:bg-red-500/10
                    hover:text-red-300
                  "
                >

                  <LogOut
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Sign Out</span>

                </button>

              ) : (

                <Link
                  to="/login"
                  onClick={() => setProfileOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    border-t
                    border-[#263244]
                    px-4
                    py-3
                    text-sm
                    text-blue-400
                    transition
                    hover:bg-blue-500/10
                    hover:text-blue-300
                  "
                >

                  <LogIn
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Login</span>

                </Link>

              )}

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;