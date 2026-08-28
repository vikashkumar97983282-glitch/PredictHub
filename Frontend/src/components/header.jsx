import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  LogIn,
  LogOut,
  CheckCheck,
  Brain,
  Trophy,
  TrendingUp,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function Header({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Temporary login state
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const navigate = useNavigate();

  /* =====================================================
     NOTIFICATIONS DATA
  ===================================================== */

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Prediction Completed",
      message: "Your Deep Learning prediction has been completed.",
      time: "2 minutes ago",
      read: false,
      icon: Brain,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      id: 2,
      title: "New Achievement",
      message: "You unlocked the Prediction Expert achievement.",
      time: "1 hour ago",
      read: false,
      icon: Trophy,
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/10",
    },
    {
      id: 3,
      title: "Model Performance",
      message: "Your model accuracy increased to 94.6%.",
      time: "3 hours ago",
      read: false,
      icon: TrendingUp,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
    {
      id: 4,
      title: "Welcome to PredictHub",
      message: "Start creating predictions and explore AI models.",
      time: "Yesterday",
      read: true,
      icon: Bell,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
    },
  ]);

  /* =====================================================
     UNREAD COUNT
  ===================================================== */

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  /* =====================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ===================================================== */

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

  /* =====================================================
     TOGGLE NOTIFICATIONS
  ===================================================== */

  const handleNotificationClick = () => {
    setNotificationOpen((prev) => !prev);

    // Close profile dropdown
    setProfileOpen(false);
  };

  /* =====================================================
     MARK ALL AS READ
  ===================================================== */

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  /* =====================================================
     MARK SINGLE NOTIFICATION AS READ
  ===================================================== */

  const handleNotificationItem = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  /* =====================================================
     DELETE NOTIFICATION
  ===================================================== */

  const deleteNotification = (id, event) => {
    event.stopPropagation();

    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== id
      )
    );
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setProfileOpen(false);
    setNotificationOpen(false);

    navigate("/");
  };

  return (
    <header
      className="
        relative
        flex
        h-[55px]
        w-full
        shrink-0
        items-center
        justify-between
        border-b
        border-[#263244]
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
        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="
            flex
            shrink-0
            items-center
            justify-center
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

        {/* SEARCH */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-2.5
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
        {/* =================================================
            NOTIFICATION
        ================================================== */}

        <div
          ref={notificationRef}
          className="relative mr-3 sm:mr-5"
        >
          <button
            type="button"
            onClick={handleNotificationClick}
            aria-label="Notifications"
            aria-expanded={notificationOpen}
            className="
              relative
              rounded-md
              p-1.5
              text-[#718096]
              transition
              hover:bg-[#172235]
              hover:text-white
            "
          >
            <Bell
              size={18}
              strokeWidth={1.5}
            />

            {/* UNREAD BADGE */}

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
                  text-white
                "
              >
                {unreadCount > 9
                  ? "9+"
                  : unreadCount}
              </span>
            )}
          </button>

          {/* =============================================
              NOTIFICATION DROPDOWN
          ============================================== */}

          {notificationOpen && (
            <div
              className="
                absolute
                right-0
                top-full
                z-50
                mt-3
                w-[360px]
                max-w-[calc(100vw-2rem)]
                overflow-hidden
                rounded-xl
                border
                border-[#263244]
                bg-[#0d1626]
                shadow-2xl
                shadow-black/40
              "
            >
              {/* HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#263244]
                  px-4
                  py-4
                "
              >
                <div>
                  <h3 className="font-semibold text-white">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-[#718096]">
                    {unreadCount > 0
                      ? `${unreadCount} unread notifications`
                      : "You're all caught up!"}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-lg
                      px-2
                      py-1.5
                      text-xs
                      font-medium
                      text-blue-400
                      transition
                      hover:bg-blue-500/10
                      hover:text-blue-300
                    "
                  >
                    <CheckCheck size={15} />

                    Mark all read
                  </button>
                )}
              </div>

              {/* NOTIFICATION LIST */}

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => {
                    const Icon = notification.icon;

                    return (
                      <div
                        key={notification.id}
                        onClick={() =>
                          handleNotificationItem(
                            notification.id
                          )
                        }
                        className={`
                          group
                          relative
                          flex
                          cursor-pointer
                          gap-3
                          border-b
                          border-[#263244]
                          px-4
                          py-4
                          transition
                          hover:bg-[#172235]

                          ${
                            !notification.read
                              ? "bg-[#111d30]"
                              : ""
                          }
                        `}
                      >
                        {/* ICON */}

                        <div
                          className={`
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            ${notification.iconBg}
                          `}
                        >
                          <Icon
                            size={18}
                            className={
                              notification.iconColor
                            }
                          />
                        </div>

                        {/* CONTENT */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p
                              className={`
                                text-sm
                                ${
                                  notification.read
                                    ? "font-medium text-[#aebbd0]"
                                    : "font-semibold text-white"
                                }
                              `}
                            >
                              {notification.title}
                            </p>

                            {/* UNREAD DOT */}

                            {!notification.read && (
                              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                            )}
                          </div>

                          <p className="mt-1 text-xs leading-5 text-[#718096]">
                            {notification.message}
                          </p>

                          <p className="mt-2 text-[11px] text-[#526176]">
                            {notification.time}
                          </p>
                        </div>

                        {/* DELETE BUTTON */}

                        <button
                          type="button"
                          onClick={(event) =>
                            deleteNotification(
                              notification.id,
                              event
                            )
                          }
                          className="
                            absolute
                            right-2
                            top-2
                            hidden
                            rounded-md
                            p-1
                            text-[#718096]
                            transition
                            hover:bg-red-500/10
                            hover:text-red-400
                            group-hover:block
                          "
                          aria-label="Delete notification"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  /* EMPTY STATE */

                  <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-[#172235]
                      "
                    >
                      <Bell
                        size={22}
                        className="text-[#718096]"
                      />
                    </div>

                    <h4 className="mt-4 font-medium text-white">
                      No notifications
                    </h4>

                    <p className="mt-1 text-sm text-[#718096]">
                      You have no notifications right now.
                    </p>
                  </div>
                )}
              </div>

              {/* FOOTER */}

              {notifications.length > 0 && (
                <div className="border-t border-[#263244] p-3">
                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(false)
                    }
                    className="
                      w-full
                      rounded-lg
                      py-2
                      text-sm
                      font-medium
                      text-blue-400
                      transition
                      hover:bg-blue-500/10
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

        {/* DIVIDER */}

        <div className="h-6 w-px bg-[#263244]" />

        {/* =================================================
            PROFILE
        ================================================== */}

        <div
          ref={profileRef}
          className="relative ml-3 sm:ml-5"
        >
          <button
            type="button"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotificationOpen(false);
            }}
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
            {isLoggedIn ? (
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Tom Cook"
                className="
                  h-7
                  w-7
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

          {/* PROFILE DROPDOWN */}

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

                <p className="mt-1 text-xs text-[#718096]">
                  {isLoggedIn
                    ? "tom@example.com"
                    : "You are not logged in"}
                </p>
              </div>

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
                "
              >
                <User
                  size={17}
                  strokeWidth={1.8}
                />

                <span>Profile</span>
              </Link>

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
                  onClick={() =>
                    setProfileOpen(false)
                  }
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