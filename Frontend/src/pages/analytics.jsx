import { useEffect, useMemo, useState } from "react";
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
  Wrench,
  Clock,
  XCircle,
  RefreshCw,
  Database,
} from "lucide-react";
import Commet from "react-loading-indicators/Commet";
import { requestJson } from "../lib/api";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";
import { useSidebar } from "../contexts/use-sidebar";

/* ============================================================
   HELPERS
============================================================ */

const safeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const formatNumber = (value) => {
  return safeNumber(value).toLocaleString();
};

const normalizeStatus = (status) => {
  if (!status) return "Inactive";

  const normalized = String(status)
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

  switch (normalized) {
    case "active":
    case "available":
    case "online":
      return "Active";

    case "maintenance":
    case "under maintenance":
      return "Maintenance";

    case "coming soon":
    case "comingsoon":
      return "Coming Soon";

    case "inactive":
    case "disabled":
    case "unavailable":
      return "Inactive";

    default:
      return String(status);
  }
};

/* ============================================================
   STATUS CONFIG
============================================================ */

const getStatusConfig = (status) => {
  const normalizedStatus = normalizeStatus(status);

  switch (normalizedStatus) {
    case "Active":
      return {
        label: "Active",
        icon: CheckCircle2,
        dotClass: "bg-emerald-400",
        iconClass: "text-emerald-400",
        textClass: "text-emerald-400",
        bgClass: "bg-emerald-500/10",
        borderClass: "border-emerald-500/20",
      };

    case "Maintenance":
      return {
        label: "Maintenance",
        icon: Wrench,
        dotClass: "bg-amber-400",
        iconClass: "text-amber-400",
        textClass: "text-amber-400",
        bgClass: "bg-amber-500/10",
        borderClass: "border-amber-500/20",
      };

    case "Coming Soon":
      return {
        label: "Coming Soon",
        icon: Clock,
        dotClass: "bg-purple-400",
        iconClass: "text-purple-400",
        textClass: "text-purple-400",
        bgClass: "bg-purple-500/10",
        borderClass: "border-purple-500/20",
      };

    case "Inactive":
    default:
      return {
        label: normalizedStatus || "Inactive",
        icon: XCircle,
        dotClass: "bg-slate-500",
        iconClass: "text-slate-400",
        textClass: "text-slate-400",
        bgClass: "bg-slate-500/10",
        borderClass: "border-slate-500/20",
      };
  }
};

/* ============================================================
   ACTIVITY STATUS CONFIG
============================================================ */

const getActivityStatusConfig = (status) => {
  const normalized = String(status || "")
    .trim()
    .toLowerCase();

  if (
    normalized === "completed" ||
    normalized === "complete" ||
    normalized === "success" ||
    normalized === "successful"
  ) {
    return {
      label: "Completed",
      icon: CheckCircle2,
      textClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
      borderClass: "border-emerald-500/20",
    };
  }

  if (
    normalized === "pending" ||
    normalized === "processing" ||
    normalized === "in progress"
  ) {
    return {
      label: "Processing",
      icon: Clock,
      textClass: "text-amber-400",
      bgClass: "bg-amber-500/10",
      borderClass: "border-amber-500/20",
    };
  }

  if (
    normalized === "failed" ||
    normalized === "error"
  ) {
    return {
      label: "Failed",
      icon: XCircle,
      textClass: "text-red-400",
      bgClass: "bg-red-500/10",
      borderClass: "border-red-500/20",
    };
  }

  return {
    label: status || "Completed",
    icon: AlertCircle,
    textClass: "text-slate-400",
    bgClass: "bg-slate-500/10",
    borderClass: "border-slate-500/20",
  };
};

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
  subtitleClass = "text-emerald-400",
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
        hover:border-blue-500/40
      "
    >
      <div
        className="
          pointer-events-none
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

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </h2>

          <div className="mt-3 flex items-center gap-2">
            <TrendingUp className={`h-4 w-4 ${subtitleClass}`} />

            <span className={`text-sm font-semibold ${subtitleClass}`}>
              {subtitle}
            </span>
          </div>
        </div>

        <div
          className={`
            flex
            h-12
            w-12
            shrink-0
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
   EMPTY STATE
============================================================ */

function EmptyState({
  icon: Icon = Database,
  title,
  description,
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>

      <h3 className="text-sm font-semibold text-slate-300">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   LOADING SKELETON
============================================================ */

function TableSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-16 animate-pulse rounded-xl bg-slate-800/60"
        />
      ))}
    </div>
  );
}

/* ============================================================
   ANALYTICS
============================================================ */

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  const {
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();

  /* ============================================================
     LOAD ANALYTICS
  ============================================================ */

  useEffect(() => {
    let isMounted = true;

    const loadAnalytics = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await requestJson("/model/analytics");

        if (!isMounted) return;

        setAnalytics({
          total_predictions: safeNumber(response?.total_predictions),
          average_accuracy: safeNumber(response?.average_accuracy),
          active_models: safeNumber(response?.active_models),
          model_categories: safeNumber(response?.model_categories),
          success_rate: safeNumber(response?.success_rate),
          predictions_growth: safeNumber(response?.predictions_growth),
          accuracy_growth: safeNumber(response?.accuracy_growth),
          model_performance: Array.isArray(response?.model_performance)
            ? response.model_performance.map((model, index) => ({
                name: model?.name || `Model ${index + 1}`,
                accuracy: Math.min(
                  100,
                  Math.max(0, safeNumber(model?.accuracy))
                ),
                predictions: safeNumber(model?.predictions),
                trend: safeNumber(model?.trend),
                status: normalizeStatus(model?.status),
              }))
            : [],
          recent_activity: Array.isArray(response?.recent_activity)
            ? response.recent_activity.map((activity) => ({
                title: activity?.title || "Prediction",
                model: activity?.model || "Unknown model",
                result: activity?.result ?? "-",
                status: activity?.status || "Completed",
                time: activity?.time || "Recently",
              }))
            : [],
          chart_data: Array.isArray(response?.chart_data)
            ? response.chart_data.map((value) =>
                Math.max(0, safeNumber(value))
              )
            : [],
        });
      } catch (requestError) {
        if (!isMounted) return;

        setAnalytics(null);
        setError(
          requestError?.message ||
            "Unable to load analytics."
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, [reloadToken]);

  /* ============================================================
     DATA
  ============================================================ */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modelPerformance = analytics?.model_performance || [];
  const recentActivity = analytics?.recent_activity || [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartData = analytics?.chart_data || [];

  const totalPredictions = safeNumber(
    analytics?.total_predictions
  );

  const averageAccuracy = Math.min(
    100,
    Math.max(0, safeNumber(analytics?.average_accuracy))
  );

  const activeModels = safeNumber(
    analytics?.active_models
  );

  const modelCategories = safeNumber(
    analytics?.model_categories
  );

  const successRate = Math.min(
    100,
    Math.max(0, safeNumber(analytics?.success_rate))
  );

  const accuracyGrowth = safeNumber(
    analytics?.accuracy_growth
  );

  const predictionsGrowth = safeNumber(
    analytics?.predictions_growth
  );

  /* ============================================================
     BEST MODEL
  ============================================================ */

  const bestModel = useMemo(() => {
    if (!modelPerformance.length) {
      return null;
    }

    return modelPerformance.reduce((best, model) => {
      if (!best) return model;

      return model.accuracy > best.accuracy
        ? model
        : best;
    }, null);
  }, [modelPerformance]);

  /* ============================================================
     MAX CHART VALUE
  ============================================================ */

  const maxChartValue = useMemo(() => {
    if (!chartData.length) return 1;

    const max = Math.max(...chartData);

    return max > 0 ? max : 1;
  }, [chartData]);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="relative flex min-h-screen bg-[#080f22] text-white">

      {/* ======================================================
          LOADING
      ====================================================== */}

      {isLoading && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#080f22]/90 backdrop-blur-sm">
          <Commet
            color="#32cd32"
            size="large"
            text="Loading"
            textColor=""
          />
        </div>
      )}

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-[20%]
            -top-50
            h-125
            w-125
            rounded-full
            bg-blue-600/10
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            -right-37.5
            top-50
            h-150
            w-150
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

        <Navbar onMenuClick={toggleMobileMenu} />

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div className="mx-4 mt-4 flex flex-col gap-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 sm:mx-6 sm:flex-row sm:items-center sm:justify-between lg:mx-8">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />

              <p
                role="alert"
                className="text-sm text-red-300"
              >
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setReloadToken((value) => value + 1)
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-red-400/20
                bg-red-400/10
                px-3
                py-2
                text-xs
                font-semibold
                text-red-300
                transition
                hover:bg-red-400/20
              "
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        )}

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <main className="flex-1 overflow-x-hidden">

          <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">

            <div className="mx-auto w-full max-w-7xl">

              {/* =================================================
                  HEADER
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

                  <div>

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
                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />

                      ANALYTICS · AI INSIGHTS
                    </div>

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
                          bg-linear-to-r
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
                  STATISTICS
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
                  value={formatNumber(totalPredictions)}
                  subtitle={`${predictionsGrowth >= 0 ? "+" : ""}${predictionsGrowth}%`}
                  icon={
                    <Activity className="h-5 w-5 text-blue-400" />
                  }
                  iconClass="bg-blue-500/10"
                />

                <StatCard
                  title="Average Accuracy"
                  value={`${averageAccuracy}%`}
                  subtitle={`${accuracyGrowth >= 0 ? "+" : ""}${accuracyGrowth}%`}
                  icon={
                    <Target className="h-5 w-5 text-emerald-400" />
                  }
                  iconClass="bg-emerald-500/10"
                />

                <StatCard
                  title="Active Models"
                  value={formatNumber(activeModels)}
                  subtitle={`${modelCategories} categories`}
                  icon={
                    <Brain className="h-5 w-5 text-purple-400" />
                  }
                  iconClass="bg-purple-500/10"
                  subtitleClass="text-purple-400"
                />

                <StatCard
                  title="Success Rate"
                  value={`${successRate}%`}
                  subtitle="Completed predictions"
                  icon={
                    <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  }
                  iconClass="bg-cyan-500/10"
                  subtitleClass="text-cyan-400"
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

                {/* =================================================
                    PREDICTION OVERVIEW
                ================================================= */}

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

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
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
                        {predictionsGrowth >= 0 ? "+" : ""}
                        {predictionsGrowth}% Growth
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

                      {chartData.length > 0 ? (
                        <div className="flex h-full items-end gap-1 sm:gap-2">

                          {chartData.map((value, index) => {

                            const percentage =
                              value > 0
                                ? Math.max(
                                    4,
                                    (value / maxChartValue) * 100
                                  )
                                : 2;

                            return (
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
                                  title={`Day ${index + 1}: ${value} predictions`}
                                  style={{
                                    height: `${percentage}%`,
                                  }}
                                  className="
                                    relative
                                    w-full
                                    rounded-t-md
                                    bg-linear-to-t
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
                            );
                          })}

                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <EmptyState
                            icon={BarChart3}
                            title="No prediction activity"
                            description="Prediction activity will appear here after users make predictions."
                          />
                        </div>
                      )}

                    </div>

                    <div
                      className="
                        mt-4
                        flex
                        justify-between
                        text-xs
                        text-slate-500
                      "
                    >
                      <span>30 days ago</span>
                      <span>22 days</span>
                      <span>15 days</span>
                      <span>7 days</span>
                      <span>Today</span>
                    </div>

                  </div>

                </div>

                {/* =================================================
                    OVERALL ACCURACY
                ================================================= */}

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
                          shrink-0
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
                          background: `conic-gradient(
                            #6366f1 0deg ${averageAccuracy * 3.6}deg,
                            rgba(51,65,85,0.5) ${averageAccuracy * 3.6}deg 360deg
                          )`,
                        }}
                      >

                        <div
                          className="
                            flex
                            h-40
                            w-40
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
                              {averageAccuracy}%
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

                        {accuracyGrowth >= 0 ? "+" : ""}
                        {accuracyGrowth}% improvement
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

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
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

                  <div
                    className="
                      inline-flex
                      w-fit
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

                {isLoading ? (
                  <TableSkeleton />
                ) : modelPerformance.length === 0 ? (
                  <EmptyState
                    icon={Brain}
                    title="No model performance data"
                    description="Model performance will appear here once prediction models are available."
                  />
                ) : (
                  <div className="overflow-x-auto">

                    <table className="w-full min-w-200">

                      <thead>

                        <tr
                          className="
                            border-b
                            border-slate-700/50
                            bg-[#0d1525]/60
                            text-left
                          "
                        >

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Model
                          </th>

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Accuracy
                          </th>

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Predictions
                          </th>

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Trend
                          </th>

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Status
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {modelPerformance.map((model, index) => {

                          const statusConfig =
                            getStatusConfig(model.status);

                          const StatusIcon =
                            statusConfig.icon;

                          const accuracy = Math.min(
                            100,
                            Math.max(
                              0,
                              safeNumber(model.accuracy)
                            )
                          );

                          const trend =
                            safeNumber(model.trend);

                          return (
                            <tr
                              key={`${model.name}-${index}`}
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
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-xl
                                      bg-blue-500/10
                                    "
                                  >
                                    <Brain className="h-5 w-5 text-blue-400" />
                                  </div>

                                  <div className="min-w-0">
                                    <span className="block font-semibold text-slate-200">
                                      {model.name}
                                    </span>

                                    <span className="mt-1 block text-xs text-slate-500">
                                      Machine Learning Model
                                    </span>
                                  </div>

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
                                        width: `${accuracy}%`,
                                      }}
                                      className="
                                        h-full
                                        rounded-full
                                        bg-linear-to-r
                                        from-blue-600
                                        to-indigo-400
                                        transition-all
                                        duration-500
                                      "
                                    />
                                  </div>

                                  <span className="text-sm font-semibold text-slate-300">
                                    {accuracy}%
                                  </span>

                                </div>

                              </td>

                              {/* PREDICTIONS */}

                              <td className="px-6 py-5 text-sm font-medium text-slate-300">
                                {formatNumber(model.predictions)}
                              </td>

                              {/* TREND */}

                              <td className="px-6 py-5">

                                {trend !== 0 ? (
                                  <span
                                    className={`
                                      inline-flex
                                      items-center
                                      gap-1
                                      rounded-full
                                      px-3
                                      py-1.5
                                      text-sm
                                      font-semibold
                                      ${
                                        trend >= 0
                                          ? "bg-emerald-500/10 text-emerald-400"
                                          : "bg-red-500/10 text-red-400"
                                      }
                                    `}
                                  >
                                    <ArrowUpRight
                                      className={`h-4 w-4 ${
                                        trend < 0
                                          ? "rotate-90"
                                          : ""
                                      }`}
                                    />

                                    {trend > 0 ? "+" : ""}
                                    {trend}%
                                  </span>
                                ) : (
                                  <span className="text-sm text-slate-500">
                                    —
                                  </span>
                                )}

                              </td>

                              {/* STATUS */}

                              <td className="px-6 py-5">

                                <span
                                  className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    ${statusConfig.borderClass}
                                    ${statusConfig.bgClass}
                                    ${statusConfig.textClass}
                                  `}
                                >

                                  <span
                                    className={`
                                      h-2
                                      w-2
                                      rounded-full
                                      ${statusConfig.dotClass}
                                      ${
                                        statusConfig.label ===
                                        "Active"
                                          ? "animate-pulse"
                                          : ""
                                      }
                                    `}
                                  />

                                  <StatusIcon className="h-3.5 w-3.5" />

                                  {statusConfig.label}

                                </span>

                              </td>

                            </tr>
                          );
                        })}

                      </tbody>

                    </table>

                  </div>
                )}

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

                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    border-b
                    border-slate-700/50
                    p-6
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
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

                  <div
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      rounded-full
                      bg-slate-800/80
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-slate-400
                    "
                  >
                    <Activity className="h-3.5 w-3.5" />
                    {recentActivity.length} Recent
                  </div>

                </div>

                {isLoading ? (
                  <TableSkeleton />
                ) : recentActivity.length === 0 ? (
                  <EmptyState
                    icon={Activity}
                    title="No recent predictions"
                    description="Your latest prediction activity will appear here."
                  />
                ) : (
                  <div className="divide-y divide-slate-700/40">

                    {recentActivity.map((activity, index) => {

                      const activityStatus =
                        getActivityStatusConfig(
                          activity.status
                        );

                      const ActivityStatusIcon =
                        activityStatus.icon;

                      return (
                        <div
                          key={`${activity.title}-${index}`}
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

                          <div className="flex min-w-0 items-center gap-4">

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

                            <div className="min-w-0">

                              <h3 className="truncate font-semibold text-slate-200">
                                {activity.title}
                              </h3>

                              <p className="mt-1 truncate text-sm text-slate-500">
                                {activity.model}

                                <span className="mx-2">
                                  •
                                </span>

                                {activity.time}
                              </p>

                            </div>

                          </div>

                          {/* RIGHT */}

                          <div className="flex items-center justify-between gap-6 sm:justify-end">

                            <div>
                              <p className="text-xs text-slate-500">
                                Result
                              </p>

                              <p className="mt-1 max-w-45 truncate text-lg font-bold text-white">
                                {String(activity.result)}
                              </p>
                            </div>

                            <span
                              className={`
                                inline-flex
                                shrink-0
                                items-center
                                gap-2
                                rounded-full
                                border
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                ${activityStatus.borderClass}
                                ${activityStatus.bgClass}
                                ${activityStatus.textClass}
                              `}
                            >

                              <ActivityStatusIcon className="h-4 w-4" />

                              {activityStatus.label}

                            </span>

                          </div>

                        </div>
                      );
                    })}

                  </div>
                )}

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
                  bg-linear-to-r
                  from-indigo-500/10
                  via-blue-500/5
                  to-purple-500/10
                  p-6
                  backdrop-blur-xl
                "
              >

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-12.5
                    -top-12.5
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

                    {bestModel ? (
                      <p
                        className="
                          mt-3
                          max-w-3xl
                          text-sm
                          leading-7
                          text-slate-400
                        "
                      >
                        Your current average prediction accuracy
                        is{" "}
                        <span className="font-semibold text-emerald-400">
                          {averageAccuracy}%
                        </span>
                        .{" "}

                        <span className="font-semibold text-purple-300">
                          {bestModel.name}
                        </span>{" "}
                        is currently your best performing model
                        with an accuracy of{" "}

                        <span className="font-semibold text-blue-400">
                          {bestModel.accuracy}%.
                        </span>
                      </p>
                    ) : (
                      <p
                        className="
                          mt-3
                          max-w-3xl
                          text-sm
                          leading-7
                          text-slate-400
                        "
                      >
                        No model performance data is available
                        yet. Once predictions are made, PredictHub
                        will show useful performance insights here.
                      </p>
                    )}

                  </div>

                </div>

              </div>

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