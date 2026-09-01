import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  LogIn,
  LogOut,
  X,
  CheckCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Header({ onMenuClick }) {
  // =========================
  // LOGIN STATE
  // =========================

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

  // =========================
  // DROPDOWN STATES
  // =========================

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // =========================
  // NOTIFICATIONS
  // =========================

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New prediction available",
      message: "Your latest prediction result is ready.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Model updated",
      message: "A machine learning model has been updated.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Welcome to PredictHub",
      message:
        "Explore AI and machine learning prediction models.",
      time: "Yesterday",
      read: true,
    },
  ]);

  // =========================
  // REFS
  // =========================

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const navigate = useNavigate();

  // =========================
  // UNREAD COUNT
  // =========================

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // =========================
  // CLOSE DROPDOWNS
  // =========================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setProfileOpen(false);
    setNotificationOpen(false);

    navigate("/");
  };

  // =========================
  // MARK ALL AS READ
  // =========================

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // =========================
  // DELETE NOTIFICATION
  // =========================

  const removeNotification = (id) => {
    setNotifications((previous) =>
      previous.filter(
        (notification) => notification.id !== id
      )
    );
  };

  return (
    <header
      className="
        relative
        z-40
        flex
        h-16
        w-full
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-700/70
        bg-[#0b1324]/95
        shadow-[0_10px_30px_rgba(2,8,23,0.22)]
        backdrop-blur-xl
        px-3
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
            flex
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-700/70
            bg-slate-800/50
            p-2
            text-slate-300
            transition-all
            hover:border-blue-400/40
            hover:bg-blue-500/10
            hover:text-white
            lg:hidden
          "
        >
          <Menu size={21} />
        </button>

        {/* Search */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-2.5
            rounded-xl
            border
            border-slate-700/70
            bg-slate-900/70
            px-3
            py-2
            text-slate-400
            shadow-inner
            transition-all
            focus-within:border-blue-400/50
            focus-within:bg-slate-900
            focus-within:ring-2
            focus-within:ring-blue-500/10
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
              w-20
              bg-transparent
              text-sm
              text-white
              outline-none
              placeholder:text-slate-500
              transition-all
              focus:w-28
              sm:w-40
              sm:focus:w-48
              md:w-56
            "
          />
        </div>
      </div>

      {/* ================= RIGHT ================= */}

      <div className="flex shrink-0 items-center">
        {/* ================= NOTIFICATION ================= */}

        <div
          ref={notificationRef}
          className="
            relative
            mr-2
            sm:mr-5
          "
        >
          {/* Notification Button */}

          <button
            type="button"
            onClick={() => {
              setNotificationOpen(
                (previous) => !previous
              );
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            aria-expanded={notificationOpen}
            className="
              relative
              flex
              items-center
              justify-center
              rounded-xl
              border
              border-slate-700/70
              bg-slate-800/50
              p-2
              text-slate-300
              transition-all
              hover:border-blue-400/40
              hover:bg-blue-500/10
              hover:text-white
              active:bg-[#172235]
            "
          >
            <Bell
              size={18}
              strokeWidth={1.5}
            />

            {/* Unread Badge */}

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-4
                  min-w-4
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[9px]
                  font-bold
                  leading-none
                  text-white
                  ring-2
                  ring-[#0b1324]
                "
              >
                {unreadCount > 9
                  ? "9+"
                  : unreadCount}
              </span>
            )}
          </button>

          {/* ================= NOTIFICATION DROPDOWN ================= */}

          {notificationOpen && (
            <div
              className="
                fixed
                left-3
                right-3
                top-[4.25rem]
                z-50
                overflow-hidden
                rounded-xl
                border
                border-slate-700/80
                bg-[#0d1626]/98
                backdrop-blur-xl
                shadow-2xl
                shadow-black/40

                sm:absolute
                sm:left-auto
                sm:right-0
                sm:top-full
                sm:mt-3
                sm:w-96
              "
            >
              {/* ================= HEADER ================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#263244]
                  px-4
                  py-3
                "
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">
                    Notifications
                  </h3>

                  <p className="mt-0.5 text-xs text-[#718096]">
                    {unreadCount > 0
                      ? `${unreadCount} unread notifications`
                      : "You're all caught up"}
                  </p>
                </div>

                {/* Read All */}

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="
                      ml-3
                      flex
                      shrink-0
                      items-center
                      gap-1.5
                      rounded-md
                      px-2
                      py-1.5
                      text-xs
                      text-blue-400
                      transition
                      hover:bg-blue-500/10
                      hover:text-blue-300
                      active:bg-blue-500/20
                    "
                  >
                    <CheckCheck size={15} />

                    <span className="hidden sm:inline">
                      Read all
                    </span>
                  </button>
                )}
              </div>

              {/* ================= NOTIFICATION LIST ================= */}

              <div
                className="
                  max-h-[60vh]
                  overflow-y-auto
                  overscroll-contain
                  sm:max-h-80
                "
              >
                {notifications.length > 0 ? (
                  notifications.map(
                    (notification) => (
                      <div
                        key={notification.id}
                        className={`
                          group
                          relative
                          border-b
                          border-[#1d2939]
                          px-4
                          py-3
                          transition
                          hover:bg-[#172235]
                          active:bg-[#172235]
                          ${
                            !notification.read
                              ? "bg-blue-500/[0.04]"
                              : ""
                          }
                        `}
                      >
                        <div className="flex gap-3">
                          {/* Unread Dot */}

                          <div className="w-2 shrink-0 pt-1.5">
                            {!notification.read && (
                              <span
                                className="
                                  block
                                  h-2
                                  w-2
                                  rounded-full
                                  bg-blue-500
                                "
                              />
                            )}
                          </div>

                          {/* Content */}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">
                              {notification.title}
                            </p>

                            <p
                              className="
                                mt-1
                                text-xs
                                leading-5
                                text-[#718096]
                              "
                            >
                              {notification.message}
                            </p>

                            <p
                              className="
                                mt-1.5
                                text-[11px]
                                text-[#526175]
                              "
                            >
                              {notification.time}
                            </p>
                          </div>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              removeNotification(
                                notification.id
                              )
                            }
                            aria-label={`Remove ${notification.title}`}
                            className="
                              flex
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              self-start
                              rounded-md
                              text-[#526175]
                              transition
                              hover:bg-red-500/10
                              hover:text-red-400

                              sm:opacity-0
                              sm:group-hover:opacity-100
                            "
                          >
                            <X size={15} />
                          </button>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  /* ================= EMPTY STATE ================= */

                  <div
                    className="
                      flex
                      min-h-44
                      flex-col
                      items-center
                      justify-center
                      px-4
                      text-center
                    "
                  >
                    <Bell
                      size={28}
                      strokeWidth={1.5}
                      className="text-[#526175]"
                    />

                    <p className="mt-3 text-sm font-medium text-white">
                      No notifications
                    </p>

                    <p className="mt-1 text-xs text-[#718096]">
                      You're all caught up!
                    </p>
                  </div>
                )}
              </div>

              {/* ================= FOOTER ================= */}

              {notifications.length > 0 && (
                <div
                  className="
                    border-t
                    border-[#263244]
                    px-4
                    py-3
                    text-center
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(false)
                    }
                    className="
                      text-xs
                      font-medium
                      text-blue-400
                      transition
                      hover:text-blue-300
                    "
                  >
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= DIVIDER ================= */}

        <div className="mx-1 h-7 w-px bg-slate-700/70 sm:mx-2" />

        {/* ================= PROFILE ================= */}

        <div
          ref={profileRef}
          className="
            relative
            ml-2
            sm:ml-5
          "
        >
          {/* Profile Button */}

          <button
            type="button"
            onClick={() => {
              setProfileOpen(
                (previous) => !previous
              );
              setNotificationOpen(false);
            }}
            aria-expanded={profileOpen}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-transparent
              p-1.5
              transition-all
              hover:border-slate-700/70
              hover:bg-slate-800/70
              sm:gap-3
            "
          >
            {/* Avatar */}

            {isLoggedIn ? (
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="User"
                className="
                  h-8
                  w-8
                  shrink-0
                  rounded-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-linear-to-br from-blue-500 to-indigo-600
                  text-xs
                  font-bold
                  text-white
                "
              >
                G
              </div>
            )}

            {/* User Name */}

            <span
              className="
                hidden
                text-sm
                font-semibold
                text-white
                md:block
              "
            >
              {isLoggedIn
                ? "Tom Cook"
                : "Guest"}
            </span>

            {/* Arrow */}

            <ChevronDown
              size={15}
              className={`
                shrink-0
                text-[#718096]
                transition-transform
                duration-200
                ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {/* ================= PROFILE DROPDOWN ================= */}

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
                border-slate-700/80
                bg-[#0d1626]/98
                backdrop-blur-xl
                shadow-2xl
                shadow-black/40
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
                  {isLoggedIn
                    ? "Tom Cook"
                    : "Guest User"}
                </p>

                <p className="mt-1 break-all text-xs text-[#718096]">
                  {isLoggedIn
                    ? "tom@example.com"
                    : "Please login to access your account"}
                </p>
              </div>

              {/* Profile - Logged In */}

              {isLoggedIn && (
                <Link
                  to="/profile"
                  onClick={() =>
                    setProfileOpen(false)
                  }
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
                    active:bg-[#172235]
                  "
                >
                  <User
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Profile</span>
                </Link>
              )}

              {/* Login - Guest */}

              {!isLoggedIn && (
                <Link
                  to="/login"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-blue-400
                    transition
                    hover:bg-blue-500/10
                    hover:text-blue-300
                    active:bg-blue-500/20
                  "
                >
                  <LogIn
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Login</span>
                </Link>
              )}

              {/* Logout - Logged In */}

              {isLoggedIn && (
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
                    active:bg-red-500/20
                  "
                >
                  <LogOut
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Sign Out</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

