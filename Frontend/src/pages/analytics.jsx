
import {
  BarChart3,
  TrendingUp,
  Activity,
  Target,
  Brain,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  Sparkles,
  Zap,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";
import { useSidebar } from "../contexts/use-sidebar";

/* ============================================================
   DATA
============================================================ */

const modelPerformance = [
  {
    name: "Machine Learning",
    accuracy: 94.8,
    predictions: 1248,
    trend: "+12.4%",
  },
  {
    name: "Deep Learning",
    accuracy: 96.3,
    predictions: 986,
    trend: "+18.7%",
  },
  {
    name: "Random Forest",
    accuracy: 92.7,
    predictions: 754,
    trend: "+8.2%",
  },
  {
    name: "Logistic Regression",
    accuracy: 89.5,
    predictions: 632,
    trend: "+5.6%",
  },
];

const recentActivity = [
  {
    title: "Placement Prediction",
    model: "Random Forest",
    result: "92.4%",
    status: "Completed",
    time: "2 min ago",
  },
  {
    title: "Student Performance",
    model: "Deep Learning",
    result: "96.8%",
    status: "Completed",
    time: "15 min ago",
  },
  {
    title: "Loan Prediction",
    model: "Logistic Regression",
    result: "88.9%",
    status: "Completed",
    time: "32 min ago",
  },
  {
    title: "House Price Prediction",
    model: "Machine Learning",
    result: "91.6%",
    status: "Completed",
    time: "1 hour ago",
  },
];

const chartData = [
  35, 48, 42, 58, 51,
  65, 72, 60, 75, 68,
  82, 73, 88, 79, 92,
  84, 76, 90, 95, 87,
  98, 91, 84, 96, 89,
  94, 86, 92, 97, 100,
];

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-700/50
        bg-[#121b2b]/80
        p-5
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500/50
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-24
          w-24
          rounded-full
          bg-blue-500/10
          blur-2xl
          transition
          group-hover:bg-blue-500/20
        "
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </h2>

          <div className="mt-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />

            <span className="text-sm font-semibold text-emerald-400">
              {subtitle}
            </span>
          </div>
        </div>

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            ${iconClass}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ANALYTICS
============================================================ */

function Analytics() {
  const {
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();

  return (
    <div className="relative flex min-h-screen bg-[#080f22] text-white">

      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-[20%]
            top-[-200px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-600/10
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            right-[-150px]
            top-[200px]
            h-[600px]
            w-[600px]
            rounded-full
            bg-purple-600/10
            blur-[180px]
          "
        />

      </div>


      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
        onToggleSidebar={toggleSidebar}
      />


      {/* ======================================================
          MAIN APPLICATION
      ====================================================== */}

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">

        {/* ====================================================
            NAVBAR
        ==================================================== */}

        <Navbar
          onMenuClick={toggleMobileMenu}
        />


        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <main
          className="
            flex-1
            overflow-x-hidden
          "
        >

          <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">

            <div className="mx-auto w-full max-w-7xl">


              {/* =================================================
                  PAGE HEADER
              ================================================= */}

              <div className="mb-10">

                <div
                  className="
                    flex
                    flex-col
                    gap-6
                    lg:flex-row
                    lg:items-end
                    lg:justify-between
                  "
                >

                  {/* LEFT */}

                  <div>

                    {/* Badge */}

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-blue-500/30
                        bg-blue-500/10
                        px-4
                        py-2
                        text-xs
                        font-bold
                        tracking-wider
                        text-blue-300
                      "
                    >
                      <span className="h-2 w-2 rounded-full bg-blue-400" />

                      ANALYTICS · AI INSIGHTS

                    </div>


                    {/* Title */}

                    <h1
                      className="
                        mt-5
                        text-3xl
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-4xl
                        lg:text-5xl
                      "
                    >
                      Prediction{" "}

                      <span
                        className="
                          bg-gradient-to-r
                          from-blue-400
                          via-indigo-400
                          to-purple-400
                          bg-clip-text
                          text-transparent
                        "
                      >
                        Analytics
                      </span>

                    </h1>


                    {/* Description */}

                    <p
                      className="
                        mt-4
                        max-w-2xl
                        text-sm
                        leading-7
                        text-slate-400
                        sm:text-base
                      "
                    >
                      Monitor your prediction performance,
                      model accuracy, and activity from one
                      intelligent analytics dashboard.
                    </p>

                  </div>


                  {/* DATE BUTTON */}

                  <button
                    type="button"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      self-start
                      rounded-xl
                      border
                      border-slate-700
                      bg-[#121b2b]/80
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-slate-300
                      shadow-lg
                      backdrop-blur-xl
                      transition
                      hover:border-blue-500/50
                      hover:bg-[#172238]
                      lg:self-auto
                    "
                  >
                    <CalendarDays className="h-4 w-4 text-blue-400" />

                    Last 30 Days

                    <Clock3 className="h-4 w-4 text-slate-500" />
                  </button>

                </div>

              </div>


              {/* =================================================
                  STATISTICS CARDS
              ================================================= */}

              <div
                className="
                  grid
                  gap-5
                  sm:grid-cols-2
                  xl:grid-cols-4
                "
              >

                <StatCard
                  title="Total Predictions"
                  value="3,620"
                  subtitle="+14.8%"
                  icon={
                    <Activity className="h-5 w-5 text-blue-400" />
                  }
                  iconClass="bg-blue-500/10"
                />


                <StatCard
                  title="Average Accuracy"
                  value="93.4%"
                  subtitle="+6.2%"
                  icon={
                    <Target className="h-5 w-5 text-emerald-400" />
                  }
                  iconClass="bg-emerald-500/10"
                />


                <StatCard
                  title="Active Models"
                  value="12"
                  subtitle="4 categories"
                  icon={
                    <Brain className="h-5 w-5 text-purple-400" />
                  }
                  iconClass="bg-purple-500/10"
                />


                <StatCard
                  title="Success Rate"
                  value="98.2%"
                  subtitle="+3.4%"
                  icon={
                    <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  }
                  iconClass="bg-cyan-500/10"
                />

              </div>


              {/* =================================================
                  CHART SECTION
              ================================================= */}

              <div
                className="
                  mt-6
                  grid
                  gap-6
                  lg:grid-cols-3
                "
              >


                {/* =============================================
                    PREDICTION OVERVIEW
                ============================================== */}

                <div
                  className="
                    relative
                    min-w-0
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-700/50
                    bg-[#121b2b]/80
                    p-5
                    shadow-xl
                    backdrop-blur-xl
                    sm:p-6
                    lg:col-span-2
                  "
                >

                  {/* Glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-0
                      top-0
                      h-40
                      w-40
                      rounded-full
                      bg-blue-600/10
                      blur-3xl
                    "
                  />

                  <div className="relative">

                    {/* HEADER */}

                    <div className="flex items-start justify-between">

                      <div>

                        <div className="flex items-center gap-2">

                          <div
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              bg-blue-500/10
                            "
                          >
                            <BarChart3 className="h-5 w-5 text-blue-400" />
                          </div>

                          <div>

                            <h2 className="text-lg font-bold text-white">
                              Prediction Overview
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                              Prediction activity over the last 30 days
                            </p>

                          </div>

                        </div>

                      </div>


                      <div
                        className="
                          hidden
                          rounded-full
                          bg-emerald-500/10
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-emerald-400
                          sm:block
                        "
                      >
                        +14.8% Growth
                      </div>

                    </div>


                    {/* CHART */}

                    <div
                      className="
                        mt-8
                        h-64
                        w-full
                        overflow-hidden
                        rounded-xl
                        border
                        border-slate-800
                        bg-[#080e1c]/80
                        p-4
                      "
                    >

                      <div
                        className="
                          flex
                          h-full
                          items-end
                          gap-1
                          sm:gap-2
                        "
                      >

                        {chartData.map((height, index) => (

                          <div
                            key={index}
                            className="
                              group
                              flex
                              h-full
                              min-w-0
                              flex-1
                              items-end
                            "
                          >

                            <div
                              style={{
                                height: `${height}%`,
                              }}
                              className="
                                relative
                                w-full
                                rounded-t-md
                                bg-gradient-to-t
                                from-blue-700
                                via-blue-500
                                to-indigo-400
                                opacity-75
                                transition-all
                                duration-300
                                group-hover:opacity-100
                                group-hover:brightness-125
                              "
                            >

                              <div
                                className="
                                  absolute
                                  left-0
                                  right-0
                                  top-0
                                  h-px
                                  bg-white/30
                                "
                              />

                            </div>

                          </div>

                        ))}

                      </div>

                    </div>


                    {/* DATES */}

                    <div
                      className="
                        mt-4
                        flex
                        justify-between
                        text-xs
                        text-slate-500
                      "
                    >
                      <span>1 Aug</span>

                      <span>8 Aug</span>

                      <span>15 Aug</span>

                      <span>22 Aug</span>

                      <span>30 Aug</span>
                    </div>

                  </div>

                </div>


                {/* =============================================
                    OVERALL ACCURACY
                ============================================== */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-700/50
                    bg-[#121b2b]/80
                    p-6
                    shadow-xl
                    backdrop-blur-xl
                  "
                >

                  {/* Background Glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-40
                      w-40
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-purple-500/10
                      blur-3xl
                    "
                  />

                  <div className="relative">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-purple-500/10
                        "
                      >
                        <Target className="h-5 w-5 text-purple-400" />
                      </div>

                      <div>

                        <h2 className="text-lg font-bold text-white">
                          Overall Accuracy
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Performance across all models
                        </p>

                      </div>

                    </div>


                    {/* CIRCLE */}

                    <div className="flex flex-col items-center py-9">

                      <div
                        className="
                          relative
                          flex
                          h-48
                          w-48
                          items-center
                          justify-center
                          rounded-full
                        "
                        style={{
                          background:
                            "conic-gradient(#6366f1 0deg 336deg, rgba(51,65,85,0.5) 336deg 360deg)",
                        }}
                      >

                        <div
                          className="
                            flex
                            h-[160px]
                            w-[160px]
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-slate-700/50
                            bg-[#101827]
                          "
                        >

                          <div className="text-center">

                            <p className="text-4xl font-bold text-white">
                              93.4%
                            </p>

                            <p className="mt-2 text-sm text-slate-400">
                              Accuracy
                            </p>

                          </div>

                        </div>

                      </div>


                      <div
                        className="
                          mt-7
                          flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-emerald-500/20
                          bg-emerald-500/10
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-emerald-400
                        "
                      >
                        <TrendingUp className="h-4 w-4" />

                        6.2% improvement

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  MODEL PERFORMANCE
              ================================================= */}

              <div
                className="
                  mt-6
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-700/50
                  bg-[#121b2b]/80
                  shadow-xl
                  backdrop-blur-xl
                "
              >

                {/* HEADER */}

                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    border-b
                    border-slate-700/50
                    p-6
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  <div>

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-500/10
                        "
                      >
                        <Brain className="h-5 w-5 text-blue-400" />
                      </div>

                      <div>

                        <h2 className="text-lg font-bold text-white">
                          Model Performance
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Compare prediction models and their performance.
                        </p>

                      </div>

                    </div>

                  </div>


                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-blue-500/10
                      px-4
                      py-2
                      text-xs
                      font-semibold
                      text-blue-400
                    "
                  >
                    <Sparkles className="h-4 w-4" />

                    AI Powered

                  </div>

                </div>


                {/* TABLE */}

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[750px]">

                    <thead>

                      <tr
                        className="
                          border-b
                          border-slate-700/50
                          bg-[#0d1525]/60
                          text-left
                        "
                      >

                        <th
                          className="
                            px-6
                            py-4
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-500
                          "
                        >
                          Model
                        </th>

                        <th
                          className="
                            px-6
                            py-4
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-500
                          "
                        >
                          Accuracy
                        </th>

                        <th
                          className="
                            px-6
                            py-4
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-500
                          "
                        >
                          Predictions
                        </th>

                        <th
                          className="
                            px-6
                            py-4
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-500
                          "
                        >
                          Trend
                        </th>

                        <th
                          className="
                            px-6
                            py-4
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-500
                          "
                        >
                          Status
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {modelPerformance.map((model) => (

                        <tr
                          key={model.name}
                          className="
                            border-b
                            border-slate-700/30
                            transition
                            last:border-0
                            hover:bg-slate-800/40
                          "
                        >

                          {/* MODEL */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div
                                className="
                                  flex
                                  h-10
                                  w-10
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-blue-500/10
                                "
                              >
                                <Brain className="h-5 w-5 text-blue-400" />
                              </div>

                              <span className="font-semibold text-slate-200">
                                {model.name}
                              </span>

                            </div>

                          </td>


                          {/* ACCURACY */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div
                                className="
                                  h-2
                                  w-28
                                  overflow-hidden
                                  rounded-full
                                  bg-slate-800
                                "
                              >

                                <div
                                  style={{
                                    width: `${model.accuracy}%`,
                                  }}
                                  className="
                                    h-full
                                    rounded-full
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-indigo-400
                                  "
                                />

                              </div>

                              <span className="text-sm font-semibold text-slate-300">
                                {model.accuracy}%
                              </span>

                            </div>

                          </td>


                          {/* PREDICTIONS */}

                          <td
                            className="
                              px-6
                              py-5
                              text-sm
                              font-medium
                              text-slate-300
                            "
                          >
                            {model.predictions.toLocaleString()}
                          </td>


                          {/* TREND */}

                          <td className="px-6 py-5">

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1
                                rounded-full
                                bg-emerald-500/10
                                px-3
                                py-1.5
                                text-sm
                                font-semibold
                                text-emerald-400
                              "
                            >
                              <ArrowUpRight className="h-4 w-4" />

                              {model.trend}

                            </span>

                          </td>


                          {/* STATUS */}

                          <td className="px-6 py-5">

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-emerald-500/20
                                bg-emerald-500/10
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-emerald-400
                              "
                            >
                              <span className="h-2 w-2 rounded-full bg-emerald-400" />

                              Active

                            </span>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>


              {/* =================================================
                  RECENT PREDICTIONS
              ================================================= */}

              <div
                className="
                  mt-6
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-700/50
                  bg-[#121b2b]/80
                  shadow-xl
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
                    border-slate-700/50
                    p-6
                  "
                >

                  <div>

                    <h2 className="text-lg font-bold text-white">
                      Recent Predictions
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Latest prediction activity from your models.
                    </p>

                  </div>


                  <button
                    type="button"
                    className="
                      rounded-lg
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-blue-400
                      transition
                      hover:bg-blue-500/10
                      hover:text-blue-300
                    "
                  >
                    View All
                  </button>

                </div>


                {/* ACTIVITY */}

                <div className="divide-y divide-slate-700/40">

                  {recentActivity.map((activity, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        flex-col
                        gap-5
                        p-5
                        transition
                        hover:bg-slate-800/30
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >

                      {/* LEFT */}

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-500/10
                          "
                        >
                          <Activity className="h-5 w-5 text-blue-400" />
                        </div>


                        <div>

                          <h3 className="font-semibold text-slate-200">
                            {activity.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {activity.model}

                            <span className="mx-2">•</span>

                            {activity.time}
                          </p>

                        </div>

                      </div>


                      {/* RIGHT */}

                      <div className="flex items-center gap-6">

                        <div>

                          <p className="text-xs text-slate-500">
                            Result
                          </p>

                          <p className="mt-1 text-lg font-bold text-white">
                            {activity.result}
                          </p>

                        </div>


                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-emerald-500/20
                            bg-emerald-500/10
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-emerald-400
                          "
                        >
                          <CheckCircle2 className="h-4 w-4" />

                          {activity.status}

                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* =================================================
                  ANALYTICS INSIGHT
              ================================================= */}

              <div
                className="
                  relative
                  mt-6
                  overflow-hidden
                  rounded-2xl
                  border
                  border-indigo-500/20
                  bg-gradient-to-r
                  from-indigo-500/10
                  via-blue-500/5
                  to-purple-500/10
                  p-6
                  backdrop-blur-xl
                "
              >

                <div
                  className="
                    absolute
                    right-[-50px]
                    top-[-50px]
                    h-40
                    w-40
                    rounded-full
                    bg-purple-500/10
                    blur-3xl
                  "
                />

                <div
                  className="
                    relative
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-start
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-indigo-500/20
                      bg-indigo-500/10
                    "
                  >
                    <Zap className="h-6 w-6 text-indigo-400" />
                  </div>


                  <div>

                    <div className="flex items-center gap-2">

                      <AlertCircle className="h-5 w-5 text-blue-400" />

                      <h2 className="font-bold text-white">
                        Analytics Insight
                      </h2>

                    </div>


                    <p
                      className="
                        mt-3
                        max-w-3xl
                        text-sm
                        leading-7
                        text-slate-400
                      "
                    >
                      Your prediction accuracy has improved by{" "}

                      <span className="font-semibold text-emerald-400">
                        6.2%
                      </span>

                      {" "}over the previous period.{" "}

                      <span className="font-semibold text-purple-300">
                        Deep Learning
                      </span>

                      {" "}is currently your best performing model with an
                      accuracy of{" "}

                      <span className="font-semibold text-blue-400">
                        96.3%.
                      </span>

                    </p>

                  </div>

                </div>

              </div>


              {/* BOTTOM SPACING */}

              <div className="h-10" />

            </div>

          </div>


          {/* FOOTER */}

          <Footer />

        </main>

      </div>

    </div>
  );
}

export default Analytics;
