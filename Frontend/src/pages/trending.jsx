import React, { useState } from "react";
import {
  Flame,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Brain,
  Users,
  BarChart3,
  Zap,
  Target,
  Clock3,
  Star,
  ChevronRight,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";

/* ============================================================
   TRENDING MODELS
============================================================ */

const trendingModels = [
  {
    rank: 1,
    name: "Deep Learning",
    category: "Neural Networks",
    accuracy: "96.3%",
    predictions: "986",
    growth: "+28.7%",
    users: "2.4K",
    icon: Brain,
  },
  {
    rank: 2,
    name: "Random Forest",
    category: "Machine Learning",
    accuracy: "92.7%",
    predictions: "754",
    growth: "+21.4%",
    users: "1.9K",
    icon: Activity,
  },
  {
    rank: 3,
    name: "Gradient Boosting",
    category: "Machine Learning",
    accuracy: "94.1%",
    predictions: "682",
    growth: "+18.9%",
    users: "1.7K",
    icon: TrendingUp,
  },
  {
    rank: 4,
    name: "Logistic Regression",
    category: "Classification",
    accuracy: "89.5%",
    predictions: "632",
    growth: "+15.6%",
    users: "1.4K",
    icon: Target,
  },
];

/* ============================================================
   TRENDING PROJECTS
============================================================ */

const trendingProjects = [
  {
    title: "Student Placement Prediction",
    category: "Education",
    accuracy: "94.8%",
    predictions: "1,248",
    growth: "+32.5%",
    users: "3.2K",
  },
  {
    title: "House Price Prediction",
    category: "Real Estate",
    accuracy: "91.6%",
    predictions: "986",
    growth: "+26.8%",
    users: "2.8K",
  },
  {
    title: "Customer Churn Prediction",
    category: "Business",
    accuracy: "93.2%",
    predictions: "845",
    growth: "+22.4%",
    users: "2.1K",
  },
  {
    title: "Loan Approval Prediction",
    category: "Finance",
    accuracy: "90.7%",
    predictions: "728",
    growth: "+19.7%",
    users: "1.8K",
  },
];

/* ============================================================
   TRENDING CATEGORIES
============================================================ */

const categories = [
  {
    name: "Machine Learning",
    predictions: "8.4K",
    growth: "+24.6%",
    icon: Activity,
  },
  {
    name: "Deep Learning",
    predictions: "6.8K",
    growth: "+31.2%",
    icon: Brain,
  },
  {
    name: "Education",
    predictions: "4.9K",
    growth: "+27.8%",
    icon: Users,
  },
  {
    name: "Finance",
    predictions: "4.2K",
    growth: "+18.4%",
    icon: BarChart3,
  },
];

/* ============================================================
   TRENDING PAGE
============================================================ */

function Trending() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#080f22] text-white">

      {/* Background Glow */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[20%] top-[-200px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute right-[-150px] top-[200px] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[180px]" />

      </div>

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() =>
          setSidebarCollapsed((prev) => !prev)
        }
      />

      {/* ======================================================
          MAIN APPLICATION AREA
      ====================================================== */}

      <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">

        <Navbar
          onMenuClick={() =>
            setSidebarOpen((prev) => !prev)
          }
        />

        {/* ====================================================
            SCROLLABLE CONTENT
        ==================================================== */}

        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">

          <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">

            <div className="mx-auto w-full max-w-7xl">

              {/* =================================================
                  PAGE HEADER
              ================================================== */}

              <div className="mb-10">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                  <div>

                    {/* Badge */}

                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold tracking-wider text-orange-300">

                      <span className="h-2 w-2 rounded-full bg-orange-400" />

                      TRENDING · COMMUNITY INSIGHTS

                    </div>

                    <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">

                      Trending{" "}

                      <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Predictions
                      </span>

                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">

                      Discover the most popular models, predictions,
                      and technologies trending on PredictHub.

                    </p>

                  </div>

                  {/* Period */}

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
                      border-slate-700/50
                      bg-[#121b2b]/80
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-slate-300
                      shadow-lg
                      backdrop-blur-xl
                      transition
                      hover:border-orange-500/40
                      hover:bg-[#172238]
                      lg:self-auto
                    "
                  >

                    <Clock3 className="h-4 w-4 text-orange-400" />

                    This Month

                  </button>

                </div>

              </div>

              {/* =================================================
                  TRENDING OVERVIEW CARDS
              ================================================== */}

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {/* Trending Predictions */}

                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-[#121b2b]/80 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40">

                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />

                  <div className="relative flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-400">
                        Trending Predictions
                      </p>

                      <h2 className="mt-3 text-3xl font-bold text-white">
                        12.8K
                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-emerald-400">

                        <ArrowUpRight className="h-4 w-4" />

                        +24.8%

                      </div>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">

                      <Flame className="h-5 w-5 text-orange-400" />

                    </div>

                  </div>

                </div>

                {/* Active Users */}

                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-[#121b2b]/80 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">

                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />

                  <div className="relative flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-400">
                        Active Users
                      </p>

                      <h2 className="mt-3 text-3xl font-bold text-white">
                        8.6K
                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-emerald-400">

                        <ArrowUpRight className="h-4 w-4" />

                        +18.2%

                      </div>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">

                      <Users className="h-5 w-5 text-blue-400" />

                    </div>

                  </div>

                </div>

                {/* Popular Model */}

                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-[#121b2b]/80 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40">

                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />

                  <div className="relative flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-400">
                        Popular Model
                      </p>

                      <h2 className="mt-3 text-2xl font-bold text-white">
                        Deep Learning
                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-purple-400">

                        <Star className="h-4 w-4" />

                        96.3% accuracy

                      </div>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">

                      <Brain className="h-5 w-5 text-purple-400" />

                    </div>

                  </div>

                </div>

                {/* Growth */}

                <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-[#121b2b]/80 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40">

                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />

                  <div className="relative flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-400">
                        Overall Growth
                      </p>

                      <h2 className="mt-3 text-3xl font-bold text-white">
                        +27.4%
                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-emerald-400">

                        <TrendingUp className="h-4 w-4" />

                        Increasing

                      </div>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">

                      <TrendingUp className="h-5 w-5 text-emerald-400" />

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  TRENDING MODELS
              ================================================== */}

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-700/50 bg-[#121b2b]/80 shadow-xl backdrop-blur-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-700/50 p-6">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">

                        <Flame className="h-5 w-5 text-orange-400" />

                      </div>

                      <div>

                        <h2 className="text-lg font-bold text-white">
                          Trending Models
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Models receiving the most attention from the community.
                        </p>

                      </div>

                    </div>

                  </div>

                  <button
                    type="button"
                    className="hidden items-center gap-1 text-sm font-semibold text-blue-400 transition hover:text-blue-300 sm:flex"
                  >

                    View All

                    <ChevronRight className="h-4 w-4" />

                  </button>

                </div>

                {/* Models */}

                <div className="divide-y divide-slate-700/40">

                  {trendingModels.map((model) => {

                    const Icon = model.icon;

                    return (

                      <div
                        key={model.name}
                        className="
                          flex
                          flex-col
                          gap-5
                          p-5
                          transition
                          hover:bg-slate-800/40
                          sm:flex-row
                          sm:items-center
                        "
                      >

                        {/* Rank */}

                        <div className="flex items-center gap-4 sm:w-72">

                          <div
                            className={`
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              font-bold
                              ${
                                model.rank === 1
                                  ? "bg-orange-500/15 text-orange-400"
                                  : "bg-slate-700/50 text-slate-300"
                              }
                            `}
                          >
                            #{model.rank}
                          </div>

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">

                            <Icon className="h-5 w-5 text-blue-400" />

                          </div>

                          <div className="min-w-0">

                            <h3 className="truncate text-sm font-bold text-slate-200">
                              {model.name}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              {model.category}
                            </p>

                          </div>

                        </div>

                        {/* Accuracy */}

                        <div className="flex-1">

                          <p className="text-xs text-slate-500">
                            Accuracy
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-200">
                            {model.accuracy}
                          </p>

                        </div>

                        {/* Predictions */}

                        <div className="flex-1">

                          <p className="text-xs text-slate-500">
                            Predictions
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-200">
                            {model.predictions}
                          </p>

                        </div>

                        {/* Users */}

                        <div className="flex-1">

                          <p className="text-xs text-slate-500">
                            Users
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-200">
                            {model.users}
                          </p>

                        </div>

                        {/* Growth */}

                        <div>

                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">

                            <ArrowUpRight className="h-3.5 w-3.5" />

                            {model.growth}

                          </span>

                        </div>

                      </div>

                    );
                  })}

                </div>

              </div>

              {/* =================================================
                  TRENDING PROJECTS + CATEGORIES
              ================================================== */}

              <div className="mt-6 grid gap-6 lg:grid-cols-3">

                {/* TRENDING PROJECTS */}

                <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-[#121b2b]/80 shadow-xl backdrop-blur-xl lg:col-span-2">

                  <div className="border-b border-slate-700/50 p-6">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">

                        <Zap className="h-5 w-5 text-indigo-400" />

                      </div>

                      <div>

                        <h2 className="text-lg font-bold text-white">
                          Trending Predictions
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Prediction projects gaining popularity.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="divide-y divide-slate-700/40">

                    {trendingProjects.map((project) => (

                      <div
                        key={project.title}
                        className="
                          flex
                          flex-col
                          gap-4
                          p-5
                          transition
                          hover:bg-slate-800/40
                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >

                        {/* Project */}

                        <div className="flex min-w-0 items-center gap-4">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">

                            <Target className="h-5 w-5 text-blue-400" />

                          </div>

                          <div className="min-w-0">

                            <h3 className="truncate text-sm font-bold text-slate-200">
                              {project.title}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              {project.category}
                            </p>

                          </div>

                        </div>

                        {/* Stats */}

                        <div className="grid grid-cols-3 gap-5 sm:flex sm:items-center">

                          <div>

                            <p className="text-xs text-slate-500">
                              Accuracy
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-200">
                              {project.accuracy}
                            </p>

                          </div>

                          <div>

                            <p className="text-xs text-slate-500">
                              Predictions
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-200">
                              {project.predictions}
                            </p>

                          </div>

                          <div>

                            <p className="text-xs text-slate-500">
                              Growth
                            </p>

                            <p className="mt-1 text-sm font-bold text-emerald-400">
                              {project.growth}
                            </p>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* CATEGORIES */}

                <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-[#121b2b]/80 shadow-xl backdrop-blur-xl">

                  <div className="border-b border-slate-700/50 p-6">

                    <h2 className="text-lg font-bold text-white">
                      Trending Categories
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Popular areas this month.
                    </p>

                  </div>

                  <div className="divide-y divide-slate-700/40">

                    {categories.map((category) => {

                      const Icon = category.icon;

                      return (

                        <div
                          key={category.name}
                          className="flex items-center gap-3 p-5 transition hover:bg-slate-800/40"
                        >

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-700/40">

                            <Icon className="h-5 w-5 text-blue-400" />

                          </div>

                          <div className="min-w-0 flex-1">

                            <h3 className="truncate text-sm font-semibold text-slate-200">
                              {category.name}
                            </h3>

                            <div className="mt-1 flex items-center gap-2">

                              <span className="text-xs text-slate-500">
                                {category.predictions} predictions
                              </span>

                              <span className="text-xs font-semibold text-emerald-400">
                                {category.growth}
                              </span>

                            </div>

                          </div>

                          <ChevronRight className="h-4 w-4 text-slate-500" />

                        </div>

                      );
                    })}

                  </div>

                </div>

              </div>

              {/* =================================================
                  TRENDING ACTIVITY CHART
              ================================================== */}

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-700/50 bg-[#121b2b]/80 p-6 shadow-xl backdrop-blur-xl">

                <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="relative">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">

                          <BarChart3 className="h-5 w-5 text-orange-400" />

                        </div>

                        <div>

                          <h2 className="text-lg font-bold text-white">
                            Trending Activity
                          </h2>

                          <p className="mt-1 text-sm text-slate-400">
                            Overall prediction activity during the last 30 days.
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">

                      <TrendingUp className="h-4 w-4" />

                      +27.4%

                    </div>

                  </div>

                  {/* Chart */}

                  <div className="mt-8 h-64 w-full rounded-xl border border-slate-800 bg-[#080e1c]/70 p-4">

                    <div className="flex h-full items-end gap-1 sm:gap-2">

                      {[
                        30, 38, 35, 44, 41,
                        52, 48, 57, 54, 63,
                        59, 68, 64, 73, 70,
                        78, 74, 82, 79, 88,
                        84, 91, 87, 95, 90,
                        96, 92, 98, 94, 100,
                      ].map((height, index) => (

                        <div
                          key={index}
                          className="group flex h-full min-w-0 flex-1 items-end"
                        >

                          <div
                            style={{
                              height: `${height}%`,
                            }}
                            className="
                              w-full
                              rounded-t-md
                              bg-gradient-to-t
                              from-orange-600
                              via-orange-500
                              to-yellow-400
                              opacity-80
                              transition-all
                              duration-300
                              group-hover:opacity-100
                              group-hover:brightness-125
                            "
                          />

                        </div>

                      ))}

                    </div>

                  </div>

                  <div className="mt-4 flex justify-between text-xs text-slate-500">

                    <span>1 Aug</span>
                    <span>8 Aug</span>
                    <span>15 Aug</span>
                    <span>22 Aug</span>
                    <span>30 Aug</span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  COMMUNITY INSIGHT
              ================================================== */}

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-pink-500/5 to-purple-500/10 p-6 backdrop-blur-xl">

                <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">

                    <Flame className="h-6 w-6 text-orange-400" />

                  </div>

                  <div>

                    <h2 className="font-bold text-white">
                      Trending Insight
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">

                      <span className="font-semibold text-orange-300">
                        Deep Learning
                      </span>{" "}

                      is currently the fastest-growing model on PredictHub.
                      Education and Machine Learning predictions are also
                      receiving significantly more activity this month.

                    </p>

                  </div>

                </div>

              </div>

              <div className="h-10" />

            </div>

          </div>

          <Footer />

        </main>

      </div>

    </div>
  );
}

export default Trending;