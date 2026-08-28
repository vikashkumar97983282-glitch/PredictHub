import React, { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Edit3,
  Save,
  X,
  User,
  Code2,
  Briefcase,
  Globe,
  Brain,
  Activity,
  Trophy,
  TrendingUp,
  CheckCircle2,
  Clock,
  BarChart3,
  Menu,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";


/* =========================================================
   PROFILE PAGE
========================================================= */

function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Tom Cook",
    username: "tomcook",
    email: "tomcook@example.com",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    website: "tomcook.dev",
    joined: "August 2025",
    bio: "Machine Learning enthusiast passionate about building intelligent systems and solving real-world problems using AI.",
  });

  const [tempProfile, setTempProfile] = useState(profile);


  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* ================= EDIT ================= */

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };


  /* ================= SAVE ================= */

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };


  /* ================= CANCEL ================= */

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };


  return (
    <div className="flex h-screen overflow-hidden bg-[#0d1422] text-white">

      {/* ================= SIDEBAR ================= */}

      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() =>
          setSidebarCollapsed((prev) => !prev)
        }
      />


      {/* ================= MAIN CONTAINER ================= */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* ================= NAVBAR ================= */}

        <Navbar
          onMenuClick={() =>
            setSidebarOpen((prev) => !prev)
          }
        />


        {/* ================= PAGE CONTENT ================= */}

        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-[#0f1726]">

          <div className="min-h-full bg-[radial-gradient(circle_at_80%_0%,rgba(120,70,200,0.16),transparent_30%)]">

            <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8 xl:px-12">


              {/* =============================================
                  PAGE HEADER
              ============================================== */}

              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">

                    <User className="h-4 w-4 text-purple-400" />

                    <span className="text-xs font-bold tracking-wider text-purple-300">
                      MY PROFILE
                    </span>

                  </div>


                  <h1 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">
                    Profile Settings
                  </h1>


                  <p className="mt-2 text-sm text-slate-400 sm:text-base">
                    Manage your personal information and account details.
                  </p>

                </div>


                {/* EDIT / SAVE BUTTON */}

                {!isEditing ? (

                  <button
                    onClick={handleEdit}
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-indigo-500
                      to-purple-500
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-purple-900/20
                      transition
                      hover:scale-[1.02]
                      hover:from-indigo-400
                      hover:to-purple-400
                    "
                  >
                    <Edit3 className="h-4 w-4" />

                    Edit Profile

                  </button>

                ) : (

                  <div className="flex flex-wrap items-center gap-3">

                    <button
                      onClick={handleCancel}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-slate-300
                        transition
                        hover:bg-slate-700
                      "
                    >
                      <X className="h-4 w-4" />

                      Cancel

                    </button>


                    <button
                      onClick={handleSave}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-emerald-500
                        to-teal-500
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:scale-[1.02]
                      "
                    >
                      <Save className="h-4 w-4" />

                      Save Changes

                    </button>

                  </div>

                )}

              </div>



              {/* =============================================
                  PROFILE HERO
              ============================================== */}

              <section className="overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800/60 shadow-xl shadow-black/20">

                {/* COVER */}

                <div className="relative h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 sm:h-44">

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_30%)]" />

                </div>


                {/* PROFILE DETAILS */}

                <div className="relative px-5 pb-7 sm:px-8">

                  <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">


                    {/* LEFT */}

                    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end">


                      {/* PROFILE IMAGE */}

                      <div className="relative">

                        <img
                          src="https://i.pravatar.cc/300?img=12"
                          alt="Profile"
                          className="
                            h-32
                            w-32
                            rounded-2xl
                            border-4
                            border-[#1e293b]
                            object-cover
                            shadow-xl
                          "
                        />


                        {isEditing && (

                          <button
                            type="button"
                            className="
                              absolute
                              bottom-2
                              right-2
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-xl
                              bg-indigo-500
                              text-white
                              shadow-lg
                              transition
                              hover:bg-indigo-400
                            "
                          >
                            <Camera className="h-5 w-5" />

                          </button>

                        )}

                      </div>


                      {/* NAME */}

                      <div className="pb-1">

                        <h2 className="text-2xl font-bold text-slate-100">
                          {profile.name}
                        </h2>


                        <p className="mt-1 text-sm text-purple-400">
                          @{profile.username}
                        </p>


                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-400">

                          <span className="flex items-center gap-1.5">

                            <MapPin className="h-4 w-4" />

                            {profile.location}

                          </span>


                          <span className="flex items-center gap-1.5">

                            <CalendarDays className="h-4 w-4" />

                            Joined {profile.joined}

                          </span>

                        </div>

                      </div>

                    </div>


                    {/* ACTIVE STATUS */}

                    <div className="
                      mb-1
                      flex
                      w-fit
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-emerald-400/20
                      bg-emerald-400/10
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-emerald-400
                    ">

                      <CheckCircle2 className="h-4 w-4" />

                      Active Member

                    </div>

                  </div>


                  {/* BIO */}

                  <div className="mt-7 border-t border-slate-700/70 pt-6">

                    <p className="max-w-3xl leading-7 text-slate-400">
                      {profile.bio}
                    </p>

                  </div>

                </div>

              </section>



              {/* =============================================
                  STAT CARDS
              ============================================== */}

              <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                  title="Total Predictions"
                  value="1,248"
                  subtitle="+18.2% this month"
                  icon={Brain}
                  iconColor="text-purple-400"
                  iconBg="bg-purple-500/10"
                />


                <StatCard
                  title="Model Accuracy"
                  value="94.6%"
                  subtitle="Above average"
                  icon={TrendingUp}
                  iconColor="text-emerald-400"
                  iconBg="bg-emerald-500/10"
                />


                <StatCard
                  title="Achievements"
                  value="12"
                  subtitle="3 new this month"
                  icon={Trophy}
                  iconColor="text-orange-400"
                  iconBg="bg-orange-500/10"
                />


                <StatCard
                  title="Active Days"
                  value="48"
                  subtitle="Keep it going!"
                  icon={Activity}
                  iconColor="text-blue-400"
                  iconBg="bg-blue-500/10"
                />

              </section>



              {/* =============================================
                  MAIN CONTENT
              ============================================== */}

              <div className="mt-7 grid gap-7 lg:grid-cols-[1.6fr_1fr]">


                {/* =========================================
                    PERSONAL INFORMATION
                ========================================== */}

                <section className="
                  rounded-2xl
                  border
                  border-slate-700/80
                  bg-slate-800/60
                  p-5
                  shadow-xl
                  shadow-black/10
                  sm:p-7
                ">

                  <div className="mb-7 flex items-center gap-3">

                    <div className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-indigo-500/10
                    ">

                      <User className="h-5 w-5 text-indigo-400" />

                    </div>


                    <div>

                      <h2 className="font-bold text-slate-100">
                        Personal Information
                      </h2>


                      <p className="mt-1 text-sm text-slate-400">
                        Update your account details.
                      </p>

                    </div>

                  </div>


                  <div className="grid gap-5 sm:grid-cols-2">

                    <InputField
                      label="Full Name"
                      name="name"
                      value={isEditing ? tempProfile.name : profile.name}
                      icon={User}
                      disabled={!isEditing}
                      onChange={handleChange}
                    />


                    <InputField
                      label="Username"
                      name="username"
                      value={isEditing ? tempProfile.username : profile.username}
                      icon={User}
                      disabled={!isEditing}
                      onChange={handleChange}
                    />


                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={isEditing ? tempProfile.email : profile.email}
                      icon={Mail}
                      disabled={!isEditing}
                      onChange={handleChange}
                    />


                    <InputField
                      label="Phone Number"
                      name="phone"
                      value={isEditing ? tempProfile.phone : profile.phone}
                      icon={Phone}
                      disabled={!isEditing}
                      onChange={handleChange}
                    />


                    <InputField
                      label="Location"
                      name="location"
                      value={isEditing ? tempProfile.location : profile.location}
                      icon={MapPin}
                      disabled={!isEditing}
                      onChange={handleChange}
                    />


                    <InputField
                      label="Website"
                      name="website"
                      value={isEditing ? tempProfile.website : profile.website}
                      icon={Globe}
                      disabled={!isEditing}
                      onChange={handleChange}
                    />

                  </div>


                  {/* BIO INPUT */}

                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      About Me
                    </label>


                    <textarea
                      name="bio"
                      value={isEditing ? tempProfile.bio : profile.bio}
                      disabled={!isEditing}
                      onChange={handleChange}
                      rows="5"
                      className={`
                        w-full
                        resize-none
                        rounded-xl
                        border
                        px-4
                        py-3
                        text-sm
                        leading-6
                        outline-none
                        transition
                        ${
                          isEditing
                            ? "border-slate-600 bg-slate-900/60 text-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                            : "cursor-default border-slate-700/70 bg-slate-900/30 text-slate-400"
                        }
                      `}
                    />

                  </div>

                </section>



                {/* =========================================
                    RIGHT SIDE
                ========================================== */}

                <div className="space-y-7">


                  {/* SOCIAL PROFILES */}

                  <section className="
                    rounded-2xl
                    border
                    border-slate-700/80
                    bg-slate-800/60
                    p-5
                    shadow-xl
                    shadow-black/10
                  ">

                    <h2 className="text-lg font-bold text-slate-100">
                      Social Profiles
                    </h2>


                    <p className="mt-1 text-sm text-slate-400">
                      Connect your developer profiles.
                    </p>


                    <div className="mt-6 space-y-3">

                      <SocialButton
                        icon={Code2}
                        name="GitHub"
                        username="@tomcook"
                      />


                      <SocialButton
                        icon={Briefcase}
                        name="LinkedIn"
                        username="Tom Cook"
                      />


                      <SocialButton
                        icon={Globe}
                        name="Portfolio"
                        username={profile.website}
                      />

                    </div>

                  </section>



                  {/* RECENT ACTIVITY */}

                  <section className="
                    rounded-2xl
                    border
                    border-slate-700/80
                    bg-slate-800/60
                    p-5
                    shadow-xl
                    shadow-black/10
                  ">

                    <div className="flex items-center justify-between">

                      <div>

                        <h2 className="text-lg font-bold text-slate-100">
                          Recent Activity
                        </h2>


                        <p className="mt-1 text-sm text-slate-400">
                          Your latest activity.
                        </p>

                      </div>


                      <Clock className="h-5 w-5 text-slate-500" />

                    </div>


                    <div className="mt-6 space-y-5">

                      <ActivityItem
                        icon={Brain}
                        title="Created a prediction"
                        description="Deep Learning Model"
                        time="2 hours ago"
                        color="text-purple-400"
                        bg="bg-purple-500/10"
                      />


                      <ActivityItem
                        icon={BarChart3}
                        title="Viewed analytics"
                        description="Placement Prediction"
                        time="Yesterday"
                        color="text-blue-400"
                        bg="bg-blue-500/10"
                      />


                      <ActivityItem
                        icon={Trophy}
                        title="Achievement unlocked"
                        description="Prediction Expert"
                        time="3 days ago"
                        color="text-orange-400"
                        bg="bg-orange-500/10"
                      />

                    </div>

                  </section>

                </div>

              </div>


              <div className="h-10" />

            </div>


            <Footer />

          </div>

        </main>

      </div>

    </div>
  );
}


/* =========================================================
   INPUT FIELD COMPONENT
========================================================= */

function InputField({
  label,
  name,
  value,
  icon: Icon,
  type = "text",
  disabled,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>


      <div className="relative">

        <Icon className="
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-500
        " />


        <input
          type={type}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className={`
            w-full
            rounded-xl
            border
            py-3
            pl-10
            pr-4
            text-sm
            outline-none
            transition
            ${
              disabled
                ? "cursor-default border-slate-700/70 bg-slate-900/30 text-slate-400"
                : "border-slate-600 bg-slate-900/60 text-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
            }
          `}
        />

      </div>

    </div>
  );
}


/* =========================================================
   STAT CARD COMPONENT
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-slate-700/80
      bg-slate-800/60
      p-5
      shadow-lg
      shadow-black/10
      transition
      duration-300
      hover:-translate-y-1
      hover:border-slate-600
    ">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>


          <h3 className="mt-3 text-3xl font-bold text-slate-100">
            {value}
          </h3>


          <p className="mt-2 text-xs text-emerald-400">
            {subtitle}
          </p>

        </div>


        <div className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          ${iconBg}
        `}>

          <Icon className={`h-5 w-5 ${iconColor}`} />

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SOCIAL BUTTON COMPONENT
========================================================= */

function SocialButton({
  icon: Icon,
  name,
  username,
}) {
  return (
    <button
      type="button"
      className="
        flex
        w-full
        items-center
        gap-4
        rounded-xl
        border
        border-slate-700/70
        bg-slate-900/30
        p-4
        text-left
        transition
        hover:border-slate-600
        hover:bg-slate-700/30
      "
    >

      <div className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-lg
        bg-slate-700/50
        text-slate-300
      ">

        <Icon className="h-5 w-5" />

      </div>


      <div>

        <p className="text-sm font-semibold text-slate-200">
          {name}
        </p>


        <p className="mt-1 text-xs text-slate-500">
          {username}
        </p>

      </div>

    </button>
  );
}


/* =========================================================
   ACTIVITY ITEM COMPONENT
========================================================= */

function ActivityItem({
  icon: Icon,
  title,
  description,
  time,
  color,
  bg,
}) {
  return (
    <div className="flex gap-4">

      <div className={`
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        ${bg}
      `}>

        <Icon className={`h-4 w-4 ${color}`} />

      </div>


      <div className="min-w-0 flex-1">

        <p className="text-sm font-semibold text-slate-300">
          {title}
        </p>


        <p className="mt-1 truncate text-xs text-slate-500">
          {description}
        </p>


        <p className="mt-1 text-xs text-slate-600">
          {time}
        </p>

      </div>

    </div>
  );
}


export default Profile;