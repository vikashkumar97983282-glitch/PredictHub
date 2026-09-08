import { useEffect, useMemo, useState } from "react";

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
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import Commet from "react-loading-indicators/Commet";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";
import { useSidebar } from "../contexts/use-sidebar";
import { requestJson } from "../lib/api";


/* ============================================================
   HELPERS
============================================================ */

const formatNumber = (value) => {
  const number = Number(value) || 0;

  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1)}M`;
  }

  if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1)}K`;
  }

  return number.toLocaleString();
};


const formatPredictionCount = (value) => {
  const number = Number(value) || 0;

  return number.toLocaleString();
};


const formatPercentage = (value) => {
  const number =
    typeof value === "string"
      ? Number(value.replace("%", "").replace("+", "").trim())
      : Number(value) || 0;

  return `${number > 0 ? "+" : ""}${number.toFixed(1)}%`;
};


const formatAccuracy = (value) => {
  const number =
    typeof value === "string"
      ? Number(value.replace("%", "").trim())
      : Number(value) || 0;

  return `${number.toFixed(1)}%`;
};


/* ============================================================
   ICON HELPERS

   Backend returns strings/data only.
   Lucide React components must be selected on frontend.
============================================================ */

const getModelIcon = (model) => {
  const name = String(model?.name || "").toLowerCase();

  if (
    name.includes("deep learning") ||
    name.includes("neural")
  ) {
    return Brain;
  }

  if (
    name.includes("random forest") ||
    name.includes("forest")
  ) {
    return Activity;
  }

  if (
    name.includes("gradient") ||
    name.includes("boost")
  ) {
    return TrendingUp;
  }

  if (
    name.includes("logistic") ||
    name.includes("classification")
  ) {
    return Target;
  }

  return Brain;
};


const getCategoryIcon = (category) => {
  const name = String(category?.name || "").toLowerCase();

  if (
    name.includes("deep") ||
    name.includes("neural")
  ) {
    return Brain;
  }

  if (
    name.includes("education") ||
    name.includes("student")
  ) {
    return Users;
  }

  if (
    name.includes("finance") ||
    name.includes("bank") ||
    name.includes("loan")
  ) {
    return BarChart3;
  }

  if (
    name.includes("business") ||
    name.includes("customer")
  ) {
    return Users;
  }

  return Activity;
};


/* ============================================================
   TRENDING PAGE
============================================================ */

function Trending() {
  const {
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();


  /* ==========================================================
     STATE
  ========================================================== */

  const [trendingData, setTrendingData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* ==========================================================
     FETCH TRENDING DATA
  ========================================================== */

  const loadTrendingData = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await requestJson(
        "/model/trending"
      );

      /*
       * Your backend returns:
       *
       * {
       *   message,
       *   overview,
       *   trending_models,
       *   trending_projects,
       *   categories,
       *   activity_chart
       * }
       */

      setTrendingData(response);

    } catch (err) {

      console.error(
        "Failed to load trending data:",
        err
      );

      setError(
        err?.message ||
        "Unable to load trending data."
      );

    } finally {

      setLoading(false);
    }
  };


  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {

    loadTrendingData();

  }, []);


  /* ==========================================================
     DATA
  ========================================================== */

  const overview = trendingData?.overview || {};

  const trendingModels =
    trendingData?.trending_models || [];

  const trendingProjects =
    trendingData?.trending_projects || [];

  const categories =
    trendingData?.categories || [];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activityChart =
    trendingData?.activity_chart || [];


  /* ==========================================================
     MAX CHART VALUE
  ========================================================== */

  const maxChartValue = useMemo(() => {

    if (!activityChart.length) {
      return 1;
    }

    const max = Math.max(
      ...activityChart.map(
        (value) => Number(value) || 0
      )
    );

    return max || 1;

  }, [activityChart]);


  /* ==========================================================
     CHART LABELS
  ========================================================== */

  const chartLabels = useMemo(() => {

    const today = new Date();

    const startDate = new Date(today);

    startDate.setDate(
      today.getDate() - 29
    );

    const labels = [];

    for (let index = 0; index < 30; index++) {

      const date = new Date(startDate);

      date.setDate(
        startDate.getDate() + index
      );

      labels.push(
        date.toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "short",
          }
        )
      );
    }

    return labels;

  }, []);


  /* ============================================================
     LOADING STATE
  ============================================================ */

  if (loading) {

    return (
      <div className="relative flex min-h-screen bg-[#080f22] text-white">

        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={closeMobileMenu}
          onToggleSidebar={toggleSidebar}
        />

        <div className="relative z-10 flex min-w-0 flex-1 flex-col">

          <Navbar
            onMenuClick={toggleMobileMenu}
          />

          <main className="flex flex-1 items-center justify-center">

            <div className="flex flex-col items-center justify-center gap-5">

              {/* YOUR OWN LOADING TAG */}

              <Commet
                color="#32cd32"
                size="medium"
                text="Loading"
                textColor=""
              />

              <div className="text-center">

                <p className="text-sm font-semibold text-slate-300">
                  Loading trending insights...
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Fetching the latest PredictHub activity
                </p>

              </div>

            </div>

          </main>

        </div>

      </div>
    );
  }


  /* ============================================================
     ERROR STATE
  ============================================================ */

  if (error) {

    return (
      <div className="relative flex min-h-screen bg-[#080f22] text-white">

        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={closeMobileMenu}
          onToggleSidebar={toggleSidebar}
        />

        <div className="relative z-10 flex min-w-0 flex-1 flex-col">

          <Navbar
            onMenuClick={toggleMobileMenu}
          />

          <main className="flex flex-1 items-center justify-center px-4">

            <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#121b2b]/80 p-8 text-center shadow-xl backdrop-blur-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">

                <AlertCircle className="h-7 w-7 text-red-400" />

              </div>

              <h2 className="mt-5 text-xl font-bold text-white">
                Unable to load trending data
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {error}
              </p>

              <button
                type="button"
                onClick={loadTrendingData}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-orange-500
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-orange-400
                "
              >

                <RefreshCw className="h-4 w-4" />

                Try Again

              </button>

            </div>

          </main>

        </div>

      </div>
    );
  }


  /* ============================================================
     MAIN PAGE
  ============================================================ */

  return (
    <div className="relative flex min-h-screen bg-[#080f22] text-white">

      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[20%] -top-50 h-125 w-125 rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute -right-37.5 top-50 h-150 w-150 rounded-full bg-purple-600/10 blur-[180px]" />

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

        <Navbar
          onMenuClick={toggleMobileMenu}
        />


        {/* ====================================================
            SCROLLABLE CONTENT
        ==================================================== */}

        <main className="flex-1 overflow-x-hidden">

          <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">

            <div className="mx-auto w-full max-w-7xl">


              {/* =================================================
                  PAGE HEADER
              ================================================== */}

              <div className="mb-10">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                  <div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold tracking-wider text-orange-300">

                      <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />

                      TRENDING · COMMUNITY INSIGHTS

                    </div>


                    <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">

                      Trending{" "}

                      <span className="bg-linear-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">

                        Predictions

                      </span>

                    </h1>


                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">

                      Discover the most popular models, predictions,
                      and technologies trending on PredictHub.

                    </p>

                  </div>


                  {/* Period */}

                  <div
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
                      lg:self-auto
                    "
                  >

                    <Clock3 className="h-4 w-4 text-orange-400" />

                    Last 30 Days

                  </div>

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

                        {formatNumber(
                          overview.trending_predictions
                        )}

                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-emerald-400">

                        <ArrowUpRight className="h-4 w-4" />

                        {formatPercentage(
                          overview.trending_predictions_growth
                        )}

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

                        {formatNumber(
                          overview.active_users
                        )}

                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-emerald-400">

                        <ArrowUpRight className="h-4 w-4" />

                        {formatPercentage(
                          overview.active_users_growth
                        )}

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

                    <div className="min-w-0">

                      <p className="text-sm font-medium text-slate-400">
                        Popular Model
                      </p>

                      <h2 className="mt-3 truncate text-2xl font-bold text-white">

                        {overview.popular_model ||
                          "No data"}

                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-purple-400">

                        <Star className="h-4 w-4" />

                        {formatAccuracy(
                          overview.popular_model_accuracy
                        )}{" "}
                        accuracy

                      </div>

                    </div>

                    <div className="ml-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">

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

                        {formatPercentage(
                          overview.overall_growth
                        )}

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
                    onClick={loadTrendingData}
                    className="hidden items-center gap-1 text-sm font-semibold text-blue-400 transition hover:text-blue-300 sm:flex"
                  >

                    Refresh

                    <RefreshCw className="h-4 w-4" />

                  </button>

                </div>


                {/* Models */}

                {trendingModels.length === 0 ? (

                  <div className="p-10 text-center">

                    <Brain className="mx-auto h-10 w-10 text-slate-600" />

                    <p className="mt-3 text-sm text-slate-400">
                      No trending models available yet.
                    </p>

                  </div>

                ) : (

                  <div className="divide-y divide-slate-700/40">

                    {trendingModels.map((model) => {

                      const Icon = getModelIcon(
                        model
                      );

                      return (

                        <div
                          key={`${model.name}-${model.rank}`}
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

                              {formatAccuracy(
                                model.accuracy
                              )}

                            </p>

                          </div>


                          {/* Predictions */}

                          <div className="flex-1">

                            <p className="text-xs text-slate-500">
                              Predictions
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-200">

                              {formatPredictionCount(
                                model.predictions
                              )}

                            </p>

                          </div>


                          {/* Users */}

                          <div className="flex-1">

                            <p className="text-xs text-slate-500">
                              Users
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-200">

                              {formatNumber(
                                model.users
                              )}

                            </p>

                          </div>


                          {/* Growth */}

                          <div>

                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-1
                                rounded-full
                                border
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                ${
                                  Number(
                                    model.growth
                                  ) >= 0
                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                    : "border-red-500/20 bg-red-500/10 text-red-400"
                                }
                              `}
                            >

                              <ArrowUpRight className="h-3.5 w-3.5" />

                              {formatPercentage(
                                model.growth
                              )}

                            </span>

                          </div>

                        </div>

                      );

                    })}

                  </div>

                )}

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


                  {trendingProjects.length === 0 ? (

                    <div className="p-10 text-center">

                      <Target className="mx-auto h-10 w-10 text-slate-600" />

                      <p className="mt-3 text-sm text-slate-400">
                        No trending predictions available yet.
                      </p>

                    </div>

                  ) : (

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

                                {formatAccuracy(
                                  project.accuracy
                                )}

                              </p>

                            </div>


                            <div>

                              <p className="text-xs text-slate-500">
                                Predictions
                              </p>

                              <p className="mt-1 text-sm font-bold text-slate-200">

                                {formatPredictionCount(
                                  project.predictions
                                )}

                              </p>

                            </div>


                            <div>

                              <p className="text-xs text-slate-500">
                                Growth
                              </p>

                              <p className="mt-1 text-sm font-bold text-emerald-400">

                                {formatPercentage(
                                  project.growth
                                )}

                              </p>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

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


                  {categories.length === 0 ? (

                    <div className="p-10 text-center">

                      <Activity className="mx-auto h-10 w-10 text-slate-600" />

                      <p className="mt-3 text-sm text-slate-400">
                        No categories available yet.
                      </p>

                    </div>

                  ) : (

                    <div className="divide-y divide-slate-700/40">

                      {categories.map((category) => {

                        const Icon =
                          getCategoryIcon(
                            category
                          );

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

                                  {formatNumber(
                                    category.predictions
                                  )}{" "}
                                  predictions

                                </span>

                                <span
                                  className={`
                                    text-xs
                                    font-semibold
                                    ${
                                      Number(
                                        category.growth
                                      ) >= 0
                                        ? "text-emerald-400"
                                        : "text-red-400"
                                    }
                                  `}
                                >

                                  {formatPercentage(
                                    category.growth
                                  )}

                                </span>

                              </div>

                            </div>


                            <ChevronRight className="h-4 w-4 text-slate-500" />

                          </div>

                        );

                      })}

                    </div>

                  )}

                </div>

              </div>


              {/* =================================================
                  TRENDING ACTIVITY CHART
              ================================================== */}

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-700/50 bg-[#121b2b]/80 p-6 shadow-xl backdrop-blur-xl">

                <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="relative">


                  {/* Header */}

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

                      {formatPercentage(
                        overview.overall_growth
                      )}

                    </div>

                  </div>


                  {/* Chart */}

                  <div className="mt-8 h-64 w-full rounded-xl border border-slate-800 bg-[#080e1c]/70 p-4">

                    {activityChart.length === 0 ? (

                      <div className="flex h-full items-center justify-center">

                        <p className="text-sm text-slate-500">
                          No activity data available yet.
                        </p>

                      </div>

                    ) : (

                      <div className="flex h-full items-end gap-1 sm:gap-2">

                        {activityChart.map(
                          (value, index) => {

                            const numericValue =
                              Number(value) || 0;

                            const height =
                              numericValue === 0
                                ? 2
                                : Math.max(
                                    (
                                      numericValue /
                                      maxChartValue
                                    ) * 100,
                                    4
                                  );

                            return (

                              <div
                                key={index}
                                className="group flex h-full min-w-0 flex-1 items-end"
                                title={`${chartLabels[index] || `Day ${index + 1}`}: ${numericValue} predictions`}
                              >

                                <div
                                  style={{
                                    height: `${height}%`,
                                  }}
                                  className="
                                    w-full
                                    rounded-t-md
                                    bg-linear-to-t
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

                            );
                          }
                        )}

                      </div>

                    )}

                  </div>


                  {/* Chart Labels */}

                  <div className="mt-4 flex justify-between text-xs text-slate-500">

                    <span>
                      {chartLabels[0] || "30 days ago"}
                    </span>

                    <span>
                      {chartLabels[7] || ""}
                    </span>

                    <span>
                      {chartLabels[14] || ""}
                    </span>

                    <span>
                      {chartLabels[21] || ""}
                    </span>

                    <span>
                      {chartLabels[29] || "Today"}
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  COMMUNITY INSIGHT
              ================================================== */}

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-orange-500/20 bg-linear-to-r from-orange-500/10 via-pink-500/5 to-purple-500/10 p-6 backdrop-blur-xl">

                <div className="absolute -right-12.5 -top-12.5 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">

                    <Flame className="h-6 w-6 text-orange-400" />

                  </div>


                  <div>

                    <h2 className="font-bold text-white">
                      Trending Insight
                    </h2>


                    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">

                      {trendingModels.length > 0 ? (

                        <>

                          <span className="font-semibold text-orange-300">

                            {trendingModels[0].name}

                          </span>{" "}

                          is currently the most popular model
                          based on prediction activity.

                          {categories.length > 0 && (

                            <>

                              {" "}

                              <span className="font-semibold text-orange-300">

                                {categories[0].name}

                              </span>{" "}

                              is currently the most active
                              category on PredictHub.

                            </>

                          )}

                        </>

                      ) : (

                        "Trending insights will appear here once prediction activity is available."

                      )}

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