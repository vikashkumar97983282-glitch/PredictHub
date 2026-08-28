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
  Sparkles,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function Header({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const navigate = useNavigate();

  // =========================================
  // NOTIFICATIONS
  // =========================================

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

  // =========================================
  // UNREAD COUNT
  // =========================================

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // =========================================
  // CLOSE DROPDOWNS OUTSIDE CLICK
  // =========================================

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

  // =========================================
  // NOTIFICATION TOGGLE
  // =========================================

  const handleNotificationClick = () => {
    setNotificationOpen((prev) => !prev);
    setProfileOpen(false);
  };

  // =========================================
  // MARK ALL READ
  // =========================================

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // =========================================
  // MARK SINGLE READ
  // =========================================

  const handleNotificationItem = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  // =========================================
  // DELETE NOTIFICATION
  // =========================================

  const deleteNotification = (id, event) => {
    event.stopPropagation();

    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) =>
          notification.id !== id
      )
    );
  };

  // =========================================
  // LOGOUT
  // =========================================

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
        sticky
        top-0
        z-40
        flex
        h-[64px]
        w-full
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-800/80
        bg-[#0b1220]/95
        px-4
        shadow-lg
        shadow-black/10
        backdrop-blur-xl
        sm:px-6
        lg:px-8
      "
    >

      {/* =====================================
          LEFT SIDE
      ====================================== */}

      <div className="flex min-w-0 items-center gap-4">

        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-800
            bg-slate-900/70
            text-slate-400
            transition-all
            duration-200
            hover:border-blue-500/40
            hover:bg-blue-500/10
            hover:text-blue-400
            active:scale-95
            lg:hidden
          "
        >
          <Menu size={20} />
        </button>


        {/* PAGE TITLE - DESKTOP */}

        <div className="hidden xl:block">
          <div className="flex items-center gap-2">
            <Sparkles
              size={14}
              className="text-blue-400"
            />

            <span className="text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
              PredictHub
            </span>
          </div>

          <p className="mt-1 text-sm font-semibold text-white">
            AI Prediction Platform
          </p>
        </div>


        {/* SEARCH */}

        <div
          className="
            group
            flex
            h-10
            min-w-0
            items-center
            gap-3
            rounded-xl
            border
            border-slate-800
            bg-slate-900/60
            px-3
            transition-all
            duration-200
            focus-within:border-blue-500/50
            focus-within:bg-slate-900
            focus-within:ring-4
            focus-within:ring-blue-500/5
            sm:px-4
          "
        >
          <Search
            size={18}
            strokeWidth={1.8}
            className="
              shrink-0
              text-slate-500
              transition
              group-focus-within:text-blue-400
            "
          />

          <input
            type="text"
            placeholder="Search models, predictions..."
            className="
              w-24
              bg-transparent
              text-sm
              text-white
              outline-none
              placeholder:text-slate-500

              sm:w-44
              md:w-56
              lg:w-64

              focus:w-32
              sm:focus:w-52
              md:focus:w-64
            "
          />

          <span
            className="
              hidden
              rounded-md
              border
              border-slate-700
              bg-slate-800
              px-1.5
              py-0.5
              text-[10px]
              text-slate-500
              xl:block
            "
          >
            ⌘ K
          </span>
        </div>

      </div>


      {/* =====================================
          RIGHT SIDE
      ====================================== */}

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">


        {/* =====================================
            NOTIFICATIONS
        ====================================== */}

        <div
          ref={notificationRef}
          className="relative"
        >

          <button
            type="button"
            onClick={handleNotificationClick}
            aria-label="Notifications"
            aria-expanded={notificationOpen}
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-800
              bg-slate-900/70
              text-slate-400
              transition-all
              duration-200
              hover:border-blue-500/40
              hover:bg-blue-500/10
              hover:text-blue-400
              active:scale-95
            "
          >

            <Bell
              size={19}
              strokeWidth={1.8}
            />

            {/* UNREAD BADGE */}

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-[#0b1220]
                  bg-gradient-to-br
                  from-red-400
                  to-red-600
                  px-1
                  text-[9px]
                  font-bold
                  text-white
                  shadow-lg
                  shadow-red-500/30
                "
              >
                {unreadCount > 9
                  ? "9+"
                  : unreadCount}
              </span>
            )}

          </button>


          {/* =====================================
              NOTIFICATION DROPDOWN
          ====================================== */}

          {notificationOpen && (
            <div
              className="
                absolute
                right-0
                top-full
                z-50
                mt-3
                w-[380px]
                max-w-[calc(100vw-1.5rem)]
                overflow-hidden
                rounded-2xl
                border
                border-slate-700/70
                bg-[#101827]/98
                shadow-2xl
                shadow-black/50
                backdrop-blur-xl
              "
            >

              {/* HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-800
                  px-5
                  py-4
                "
              >

                <div>
                  <h3 className="text-base font-bold text-white">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
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
                      gap-2
                      rounded-lg
                      border
                      border-blue-500/10
                      bg-blue-500/5
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-blue-400
                      transition
                      hover:bg-blue-500/15
                      hover:text-blue-300
                    "
                  >
                    <CheckCheck size={15} />

                    <span className="hidden sm:inline">
                      Mark all read
                    </span>
                  </button>
                )}

              </div>


              {/* NOTIFICATION LIST */}

              <div className="max-h-[420px] overflow-y-auto">

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
                          border-slate-800/80
                          px-5
                          py-4
                          transition-all
                          duration-200
                          hover:bg-slate-800/60

                          ${
                            !notification.read
                              ? "bg-blue-500/[0.035]"
                              : ""
                          }
                        `}
                      >

                        {/* ICON */}

                        <div
                          className={`
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/5
                            ${notification.iconBg}
                          `}
                        >
                          <Icon
                            size={19}
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
                                    ? "font-medium text-slate-300"
                                    : "font-semibold text-white"
                                }
                              `}
                            >
                              {notification.title}
                            </p>


                            {!notification.read && (
                              <span
                                className="
                                  mt-1.5
                                  h-2
                                  w-2
                                  shrink-0
                                  rounded-full
                                  bg-blue-500
                                  shadow
                                  shadow-blue-500/70
                                "
                              />
                            )}

                          </div>


                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {notification.message}
                          </p>


                          <p className="mt-2 text-[11px] text-slate-600">
                            {notification.time}
                          </p>

                        </div>


                        {/* DELETE */}

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
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            text-slate-500
                            transition
                            hover:bg-red-500/10
                            hover:text-red-400
                            group-hover:flex
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

                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      px-6
                      py-16
                      text-center
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-800
                        text-slate-500
                      "
                    >
                      <Bell size={24} />
                    </div>

                    <h4 className="mt-5 font-semibold text-white">
                      No notifications
                    </h4>

                    <p className="mt-2 text-sm text-slate-500">
                      You have no notifications right now.
                    </p>

                  </div>
                )}

              </div>


              {/* FOOTER */}

              {notifications.length > 0 && (
                <div className="border-t border-slate-800 p-3">

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(false)
                    }
                    className="
                      w-full
                      rounded-xl
                      py-2.5
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

        <div className="hidden h-7 w-px bg-slate-800 sm:block" />


        {/* =====================================
            PROFILE
        ====================================== */}

        <div
          ref={profileRef}
          className="relative"
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
              rounded-xl
              border
              border-transparent
              p-1.5
              transition-all
              duration-200
              hover:border-slate-800
              hover:bg-slate-900/70
              sm:gap-3
            "
          >

            {/* AVATAR */}

            {isLoggedIn ? (
              <div className="relative">

                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Tom Cook"
                  className="
                    h-9
                    w-9
                    rounded-xl
                    border
                    border-slate-700
                    object-cover
                  "
                />

                <span
                  className="
                    absolute
                    -bottom-0.5
                    -right-0.5
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-[#0b1220]
                    bg-emerald-400
                  "
                />

              </div>
            ) : (
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600
                  text-sm
                  font-bold
                  text-white
                "
              >
                G
              </div>
            )}


            {/* USER DETAILS */}

            <div className="hidden text-left lg:block">

              <p className="text-sm font-semibold text-white">
                {isLoggedIn
                  ? "Tom Cook"
                  : "Guest"}
              </p>

              <p className="mt-0.5 text-[11px] text-slate-500">
                {isLoggedIn
                  ? "AI Explorer"
                  : "Not logged in"}
              </p>

            </div>


            <ChevronDown
              size={16}
              className={`
                hidden
                text-slate-500
                transition-transform
                duration-200
                sm:block

                ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />

          </button>


          {/* =====================================
              PROFILE DROPDOWN
          ====================================== */}

          {profileOpen && (
            <div
              className="
                absolute
                right-0
                top-full
                z-50
                mt-3
                w-64
                overflow-hidden
                rounded-2xl
                border
                border-slate-700/70
                bg-[#101827]/98
                shadow-2xl
                shadow-black/50
                backdrop-blur-xl
              "
            >

              {/* PROFILE INFO */}

              <div className="border-b border-slate-800 px-5 py-4">

                <div className="flex items-center gap-3">

                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Tom Cook"
                    className="
                      h-11
                      w-11
                      rounded-xl
                      border
                      border-slate-700
                      object-cover
                    "
                  />

                  <div>

                    <p className="text-sm font-semibold text-white">
                      {isLoggedIn
                        ? "Tom Cook"
                        : "Guest User"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {isLoggedIn
                        ? "tom@example.com"
                        : "You are not logged in"}
                    </p>

                  </div>

                </div>

              </div>


              {/* PROFILE LINK */}

              <div className="p-2">

                <Link
                  to="/profile"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    text-slate-300
                    transition
                    hover:bg-slate-800
                    hover:text-white
                  "
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-500/10
                      text-blue-400
                    "
                  >
                    <User size={17} />
                  </div>

                  <span>My Profile</span>

                </Link>

              </div>


              {/* LOGIN / LOGOUT */}

              <div className="border-t border-slate-800 p-2">

                {isLoggedIn ? (

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-sm
                      font-medium
                      text-red-400
                      transition
                      hover:bg-red-500/10
                      hover:text-red-300
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-red-500/10
                      "
                    >
                      <LogOut size={17} />
                    </div>

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
                      rounded-xl
                      px-3
                      py-3
                      text-sm
                      font-medium
                      text-blue-400
                      transition
                      hover:bg-blue-500/10
                      hover:text-blue-300
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-500/10
                      "
                    >
                      <LogIn size={17} />
                    </div>

                    <span>Login</span>

                  </Link>

                )}

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;