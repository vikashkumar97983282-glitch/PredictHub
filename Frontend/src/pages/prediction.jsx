
import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  Search,
  Sparkles,
  TrendingUp,
  Activity,
  BarChart3,
  ArrowRight,
  Database,
  Cpu,
  Filter,
  X,
  CheckCircle2,
  Clock3,
  Wrench,
  Zap,
  Layers3,
} from "lucide-react";

import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Footer from "../components/footer";
import { useSidebar } from "../contexts/use-sidebar";
import { requestJson } from "../lib/api";

import Commet from "react-loading-indicators/Commet";

/* =========================================================
   ICON OPTIONS
========================================================= */

const iconOptions = {
  Brain,
  BarChart3,
  Activity,
  Database,
  Cpu,
  TrendingUp,
};

/* =========================================================
   STATUS CONFIG
========================================================= */

const getStatusConfig = (status) => {
  const normalizedStatus = String(status || "")
    .trim()
    .toLowerCase()
    .replace(/-/g, "_");

  switch (normalizedStatus) {
    case "active":
    case "available":
    case "online":
      return {
        label: "Active",
        description: "Ready to predict",
        icon: CheckCircle2,
        badge:
          "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
        dot: "bg-emerald-400",
        glow: "bg-emerald-400",
        available: true,
      };

    case "maintenance":
      return {
        label: "Maintenance",
        description: "Temporarily unavailable",
        icon: Wrench,
        badge:
          "border-amber-400/20 bg-amber-400/10 text-amber-400",
        dot: "bg-amber-400",
        glow: "bg-amber-400",
        available: false,
      };

    case "coming_soon":
    case "coming soon":
      return {
        label: "Coming Soon",
        description: "Available soon",
        icon: Clock3,
        badge:
          "border-purple-400/20 bg-purple-400/10 text-purple-400",
        dot: "bg-purple-400",
        glow: "bg-purple-400",
        available: false,
      };

    case "inactive":
    case "disabled":
    default:
      return {
        label: "Inactive",
        description: "Currently unavailable",
        icon: Activity,
        badge:
          "border-slate-700 bg-slate-800/80 text-slate-400",
        dot: "bg-slate-500",
        glow: "bg-slate-500",
        available: false,
      };
  }
};

/* =========================================================
   NORMALIZE DATABASE MODEL
========================================================= */

const normalizeDatabaseModel = (model) => ({
  id: model?._id || model?.id,

  title: model?.title || "Untitled Model",

  description:
    model?.description ||
    "No description available for this model.",

  category: model?.category || "Other",

  status: model?.status || "inactive",

  icon: model?.icon || "Brain",

  iconColor:
    model?.icon_color || "text-blue-400",

  iconBg:
    model?.icon_background ||
    "bg-blue-500/10",

  borderColor:
    model?.border_color ||
    "border-slate-800",

  route: model?.route || "#",

  tags: Array.isArray(model?.tags)
    ? model.tags
    : [],
});

/* =========================================================
   PREDICTION PAGE
========================================================= */

function Prediction() {
  const navigate = useNavigate();

  /* =======================================================
     SIDEBAR
  ======================================================= */

  const {
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();

  /* =======================================================
     STATE
  ======================================================= */

  const [availableModels, setAvailableModels] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [activeStatus, setActiveStatus] =
    useState("All");

  /* =======================================================
     LOAD MODELS
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const loadDatabaseModels = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await requestJson("/model/models");

        const databaseModels =
          Array.isArray(response?.data)
            ? response.data.map(
                normalizeDatabaseModel
              )
            : [];

        if (isMounted) {
          setAvailableModels(
            databaseModels
          );
        }
      } catch (err) {
        console.error(
          "Unable to load database models:",
          err
        );

        if (isMounted) {
          setAvailableModels([]);

          setError(
            "Unable to load prediction models. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDatabaseModels();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = useMemo(() => {
    const categorySet = new Set();

    availableModels.forEach((model) => {
      if (model.category) {
        categorySet.add(
          model.category
        );
      }
    });

    return [
      "All",
      ...Array.from(categorySet),
    ];
  }, [availableModels]);

  /* =======================================================
     STATUS COUNTS
  ======================================================= */

  const statusCounts = useMemo(() => {
    return {
      all: availableModels.length,

      active: availableModels.filter(
        (model) =>
          getStatusConfig(model.status)
            .available
      ).length,

      inactive: availableModels.filter(
        (model) =>
          getStatusConfig(model.status)
            .label === "Inactive"
      ).length,

      maintenance: availableModels.filter(
        (model) =>
          getStatusConfig(model.status)
            .label === "Maintenance"
      ).length,

      comingSoon: availableModels.filter(
        (model) =>
          getStatusConfig(model.status)
            .label === "Coming Soon"
      ).length,
    };
  }, [availableModels]);

  /* =======================================================
     FILTER MODELS
  ======================================================= */

  const filteredModels = useMemo(() => {
    const searchValue =
      searchTerm.trim().toLowerCase();

    return availableModels.filter(
      (model) => {
        /* CATEGORY */

        const matchesCategory =
          activeCategory === "All" ||
          model.category ===
            activeCategory;

        /* STATUS */

        const modelStatus =
          getStatusConfig(
            model.status
          ).label;

        const matchesStatus =
          activeStatus === "All" ||
          modelStatus ===
            activeStatus;

        /* SEARCH */

        const title =
          String(
            model.title || ""
          ).toLowerCase();

        const description =
          String(
            model.description || ""
          ).toLowerCase();

        const category =
          String(
            model.category || ""
          ).toLowerCase();

        const tags =
          Array.isArray(model.tags)
            ? model.tags
            : [];

        const matchesSearch =
          searchValue === "" ||
          title.includes(searchValue) ||
          description.includes(
            searchValue
          ) ||
          category.includes(
            searchValue
          ) ||
          tags.some((tag) =>
            String(tag)
              .toLowerCase()
              .includes(searchValue)
          );

        return (
          matchesCategory &&
          matchesStatus &&
          matchesSearch
        );
      }
    );
  }, [
    availableModels,
    activeCategory,
    activeStatus,
    searchTerm,
  ]);

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const handleResetFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setActiveStatus("All");
  };

  /* =======================================================
     EXPLORE MODELS
  ======================================================= */

  const handleExploreModels = () => {
    document
      .getElementById(
        "prediction-models"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /* =======================================================
     START PREDICTION
  ======================================================= */

  const handleStartPrediction = (
    model
  ) => {
    const statusConfig =
      getStatusConfig(
        model.status
      );

    if (
      !statusConfig.available ||
      !model.route ||
      model.route === "#"
    ) {
      return;
    }

    navigate(model.route);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        isSidebarOpen={
          isSidebarOpen
        }
        isMobileMenuOpen={
          isMobileMenuOpen
        }
        onCloseMobileMenu={
          closeMobileMenu
        }
        onToggleSidebar={
          toggleSidebar
        }
      />

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* HEADER */}

        <Header
          onMenuClick={
            toggleMobileMenu
          }
        />

        {/* =================================================
            MAIN
        ================================================= */}

        <main
          className="
            relative
            flex-1
            overflow-x-hidden
            scroll-smooth
            bg-[#070b14]
          "
        >

          {/* =================================================
              BACKGROUND
          ================================================= */}

          <div
            className="
              pointer-events-none
              fixed
              inset-0
              overflow-hidden
            "
          >

            {/* GRID */}

            <div
              className="
                absolute
                inset-0
                opacity-[0.025]
                bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                bg-size-[40px_40px]
              "
            />

            {/* BLUE GLOW */}

            <div
              className="
                absolute
                -right-40
                -top-40
                h-125
                w-125
                rounded-full
                bg-blue-600/10
                blur-[120px]
              "
            />

            {/* PURPLE GLOW */}

            <div
              className="
                absolute
                -bottom-60
                -left-40
                h-125
                w-125
                rounded-full
                bg-purple-600/10
                blur-[120px]
              "
            />

          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="relative z-10">

            <div
              className="
                mx-auto
                w-full
                max-w-7xl
                px-4
                py-10
                sm:px-6
                lg:px-8
              "
            >

              {/* =================================================
                  HERO
              ================================================= */}

              <section className="relative">

                <div
                  className="
                    mx-auto
                    max-w-4xl
                    text-center
                  "
                >

                  {/* SMALL BADGE */}

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-blue-500/20
                      bg-blue-500/5
                      px-4
                      py-2
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-blue-400
                    "
                  >

                    <Sparkles
                      size={14}
                    />

                    AI Prediction Platform

                  </div>

                  {/* TITLE */}

                  <h1
                    className="
                      mt-6
                      text-4xl
                      font-bold
                      leading-[1.1]
                      tracking-tight
                      text-white
                      sm:text-5xl
                      lg:text-6xl
                    "
                  >

                    Predict Smarter with{" "}

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
                      AI Models
                    </span>

                  </h1>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mx-auto
                      mt-6
                      max-w-2xl
                      text-base
                      leading-7
                      text-slate-400
                      sm:text-lg
                    "
                  >
                    Discover machine learning and
                    deep learning models built to
                    solve real-world prediction
                    problems with speed and
                    intelligence.
                  </p>

                </div>

              </section>

              {/* =================================================
                  SEARCH + STATS
              ================================================= */}

              <section
                className="
                  mx-auto
                  mt-10
                  max-w-5xl
                "
              >

                <div
                  className="
                    rounded-3xl
                    border
                    border-slate-800/80
                    bg-[#0d1422]/80
                    p-3
                    shadow-2xl
                    shadow-black/20
                    backdrop-blur-xl
                  "
                >

                  {/* SEARCH */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-slate-800
                      bg-[#101827]
                      px-4
                      py-3.5
                      transition
                      focus-within:border-blue-500/40
                      focus-within:ring-4
                      focus-within:ring-blue-500/5
                    "
                  >

                    <Search
                      size={20}
                      className="
                        shrink-0
                        text-slate-500
                      "
                    />

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
                        )
                      }
                      placeholder="Search models, categories, technologies..."
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                      "
                    />

                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() =>
                          setSearchTerm(
                            ""
                          )
                        }
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-500
                          transition
                          hover:bg-slate-800
                          hover:text-white
                        "
                        aria-label="Clear search"
                      >
                        <X
                          size={17}
                        />
                      </button>
                    )}

                  </div>

                  {/* STATS */}

                  <div
                    className="
                      mt-3
                      grid
                      grid-cols-2
                      gap-2
                      sm:grid-cols-4
                    "
                  >

                    {/* TOTAL */}

                    <button
                      type="button"
                      onClick={() =>
                        setActiveStatus(
                          "All"
                        )
                      }
                      className={`
                        rounded-xl
                        border
                        px-4
                        py-3
                        text-left
                        transition
                        ${
                          activeStatus ===
                          "All"
                            ? "border-blue-500/30 bg-blue-500/5"
                            : "border-transparent hover:border-slate-800 hover:bg-slate-900/50"
                        }
                      `}
                    >

                      <div className="flex items-center justify-between">

                        <Layers3
                          size={16}
                          className="text-blue-400"
                        />

                        <span className="text-lg font-bold text-white">
                          {
                            statusCounts.all
                          }
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Total Models
                      </p>

                    </button>

                    {/* ACTIVE */}

                    <button
                      type="button"
                      onClick={() =>
                        setActiveStatus(
                          "Active"
                        )
                      }
                      className={`
                        rounded-xl
                        border
                        px-4
                        py-3
                        text-left
                        transition
                        ${
                          activeStatus ===
                          "Active"
                            ? "border-emerald-500/30 bg-emerald-500/5"
                            : "border-transparent hover:border-slate-800 hover:bg-slate-900/50"
                        }
                      `}
                    >

                      <div className="flex items-center justify-between">

                        <CheckCircle2
                          size={16}
                          className="text-emerald-400"
                        />

                        <span className="text-lg font-bold text-white">
                          {
                            statusCounts.active
                          }
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Active Models
                      </p>

                    </button>

                    {/* MAINTENANCE */}

                    <button
                      type="button"
                      onClick={() =>
                        setActiveStatus(
                          "Maintenance"
                        )
                      }
                      className={`
                        rounded-xl
                        border
                        px-4
                        py-3
                        text-left
                        transition
                        ${
                          activeStatus ===
                          "Maintenance"
                            ? "border-amber-500/30 bg-amber-500/5"
                            : "border-transparent hover:border-slate-800 hover:bg-slate-900/50"
                        }
                      `}
                    >

                      <div className="flex items-center justify-between">

                        <Wrench
                          size={16}
                          className="text-amber-400"
                        />

                        <span className="text-lg font-bold text-white">
                          {
                            statusCounts.maintenance
                          }
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Maintenance
                      </p>

                    </button>

                    {/* COMING SOON */}

                    <button
                      type="button"
                      onClick={() =>
                        setActiveStatus(
                          "Coming Soon"
                        )
                      }
                      className={`
                        rounded-xl
                        border
                        px-4
                        py-3
                        text-left
                        transition
                        ${
                          activeStatus ===
                          "Coming Soon"
                            ? "border-purple-500/30 bg-purple-500/5"
                            : "border-transparent hover:border-slate-800 hover:bg-slate-900/50"
                        }
                      `}
                    >

                      <div className="flex items-center justify-between">

                        <Clock3
                          size={16}
                          className="text-purple-400"
                        />

                        <span className="text-lg font-bold text-white">
                          {
                            statusCounts.comingSoon
                          }
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Coming Soon
                      </p>

                    </button>

                  </div>

                </div>

              </section>

              {/* =================================================
                  FILTERS
              ================================================= */}

              <section className="mt-10">

                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                  "
                >

                  {/* CATEGORY */}

                  <div className="flex min-w-0 items-center gap-3">

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-800
                        bg-[#101827]
                        text-slate-500
                      "
                    >
                      <Filter
                        size={16}
                      />
                    </div>

                    <div
                      className="
                        flex
                        min-w-0
                        gap-2
                        overflow-x-auto
                        pb-1
                        scrollbar-none
                      "
                    >

                      {categories.map(
                        (category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() =>
                              setActiveCategory(
                                category
                              )
                            }
                            className={`
                              shrink-0
                              rounded-xl
                              border
                              px-4
                              py-2
                              text-sm
                              font-medium
                              transition-all
                              ${
                                activeCategory ===
                                category
                                  ? `
                                    border-blue-500/30
                                    bg-blue-500/10
                                    text-blue-400
                                  `
                                  : `
                                    border-slate-800
                                    bg-[#101827]/70
                                    text-slate-500
                                    hover:border-slate-700
                                    hover:text-white
                                  `
                              }
                            `}
                          >
                            {category}
                          </button>
                        )
                      )}

                    </div>

                  </div>

                  {/* RESULTS */}

                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-2
                      text-sm
                      text-slate-500
                    "
                  >

                    <Zap
                      size={15}
                      className="text-blue-400"
                    />

                    <span>
                      Showing{" "}
                      <span className="font-semibold text-white">
                        {
                          filteredModels.length
                        }
                      </span>{" "}
                      models
                    </span>

                  </div>

                </div>

              </section>

              {/* =================================================
                  MODEL SECTION
              ================================================= */}

              <section
                id="prediction-models"
                className="
                  mt-12
                  scroll-mt-8
                "
              >

                {/* SECTION HEADER */}

                <div
                  className="
                    mb-7
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-blue-400
                      "
                    >
                      Explore
                    </p>

                    <h2
                      className="
                        mt-2
                        text-2xl
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-3xl
                      "
                    >
                      Prediction Models
                    </h2>

                  </div>

                  <p className="text-sm text-slate-500">
                    Choose a model and start
                    making predictions.
                  </p>

                </div>

                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (
                  <div
                    className="
                      flex
                      min-h-80
                      items-center
                      justify-center
                      rounded-3xl
                      border
                      border-slate-800
                      bg-[#0d1422]/70
                    "
                  >
                    <Commet
                      color="#32cd32"
                      size="large"
                      text="Loading"
                      textColor=""
                    />
                  </div>
                )}

                {/* =================================================
                    ERROR
                ================================================= */}

                {!loading &&
                  error && (
                    <div
                      className="
                        flex
                        min-h-80
                        flex-col
                        items-center
                        justify-center
                        rounded-3xl
                        border
                        border-red-500/20
                        bg-red-500/5
                        px-6
                        text-center
                      "
                    >

                      <div
                        className="
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-2xl
                          bg-red-500/10
                          text-red-400
                        "
                      >
                        <Activity
                          size={28}
                        />
                      </div>

                      <h3
                        className="
                          mt-5
                          text-lg
                          font-semibold
                          text-white
                        "
                      >
                        Unable to load models
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-md
                          text-sm
                          leading-6
                          text-slate-500
                        "
                      >
                        {error}
                      </p>

                    </div>
                  )}

                {/* =================================================
                    MODEL GRID
                ================================================= */}

                {!loading &&
                  !error &&
                  filteredModels.length >
                    0 && (

                    <div
                      className="
                        grid
                        gap-5
                        md:grid-cols-2
                        xl:grid-cols-3
                      "
                    >

                      {filteredModels.map(
                        (model) => {

                          /* ICON */

                          const Icon =
                            typeof model.icon ===
                            "string"
                              ? iconOptions[
                                  model.icon
                                ] || Brain
                              : model.icon ||
                                Brain;

                          /* STATUS */

                          const statusConfig =
                            getStatusConfig(
                              model.status
                            );

                          const StatusIcon =
                            statusConfig.icon;

                          const isAvailable =
                            statusConfig.available;

                          return (
                            <article
                              key={model.id}
                              className={`
                                group
                                relative
                                flex
                                min-h-90
                                flex-col
                                overflow-hidden
                                rounded-3xl
                                border
                                bg-[#0d1422]/90
                                p-6
                                shadow-xl
                                shadow-black/10
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                ${
                                  isAvailable
                                    ? "border-slate-800 hover:-translate-y-1.5 hover:border-blue-500/30 hover:shadow-blue-950/20"
                                    : "border-slate-800/70"
                                }
                              `}
                            >

                              {/* CARD GLOW */}

                              <div
                                className={`
                                  pointer-events-none
                                  absolute
                                  -right-20
                                  -top-20
                                  h-48
                                  w-48
                                  rounded-full
                                  blur-[80px]
                                  transition-opacity
                                  duration-300
                                  ${
                                    isAvailable
                                      ? "bg-blue-500/10 opacity-0 group-hover:opacity-100"
                                      : "opacity-0"
                                  }
                                `}
                              />

                              {/* TOP LINE */}

                              <div
                                className={`
                                  absolute
                                  inset-x-0
                                  top-0
                                  h-px
                                  ${
                                    isAvailable
                                      ? "bg-linear-to-r from-transparent via-blue-500/50 to-transparent"
                                      : "bg-slate-800"
                                  }
                                `}
                              />

                              <div className="relative z-10 flex h-full flex-col">

                                {/* =================================================
                                    TOP
                                ================================================= */}

                                <div
                                  className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                  "
                                >

                                  {/* ICON */}

                                  <div
                                    className={`
                                      flex
                                      h-14
                                      w-14
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-2xl
                                      border
                                      border-white/5
                                      ${model.iconBg}
                                      transition-all
                                      duration-300
                                      ${
                                        isAvailable
                                          ? "group-hover:scale-105 group-hover:rotate-2"
                                          : "opacity-70"
                                      }
                                    `}
                                  >

                                    <Icon
                                      size={25}
                                      className={
                                        model.iconColor
                                      }
                                    />

                                  </div>

                                  {/* STATUS */}

                                  <div
                                    className={`
                                      inline-flex
                                      max-w-[55%]
                                      items-center
                                      gap-1.5
                                      rounded-full
                                      border
                                      px-3
                                      py-1.5
                                      text-[10px]
                                      font-semibold
                                      uppercase
                                      tracking-wide
                                      ${statusConfig.badge}
                                    `}
                                  >

                                    <span
                                      className={`
                                        h-1.5
                                        w-1.5
                                        shrink-0
                                        rounded-full
                                        ${statusConfig.dot}
                                        ${
                                          isAvailable
                                            ? "animate-pulse"
                                            : ""
                                        }
                                      `}
                                    />

                                    {
                                      statusConfig.label
                                    }

                                  </div>

                                </div>

                                {/* =================================================
                                    CATEGORY
                                ================================================= */}

                                <div
                                  className="
                                    mt-6
                                    flex
                                    items-center
                                    gap-2
                                  "
                                >

                                  <span
                                    className="
                                      rounded-lg
                                      border
                                      border-slate-800
                                      bg-slate-900/70
                                      px-2.5
                                      py-1
                                      text-[10px]
                                      font-semibold
                                      uppercase
                                      tracking-wider
                                      text-slate-500
                                    "
                                  >
                                    {
                                      model.category
                                    }
                                  </span>

                                  <span className="h-1 w-1 rounded-full bg-slate-700" />

                                  <span
                                    className="
                                      text-[11px]
                                      text-slate-600
                                    "
                                  >
                                    AI Model
                                  </span>

                                </div>

                                {/* =================================================
                                    TITLE
                                ================================================= */}

                                <h3
                                  className={`
                                    mt-4
                                    text-xl
                                    font-bold
                                    tracking-tight
                                    ${
                                      isAvailable
                                        ? "text-white"
                                        : "text-slate-300"
                                    }
                                  `}
                                >
                                  {
                                    model.title
                                  }
                                </h3>

                                {/* =================================================
                                    DESCRIPTION
                                ================================================= */}

                                <p
                                  className="
                                    mt-3
                                    line-clamp-3
                                    text-sm
                                    leading-6
                                    text-slate-500
                                  "
                                >
                                  {
                                    model.description
                                  }
                                </p>

                                {/* =================================================
                                    TAGS
                                ================================================= */}

                                <div
                                  className="
                                    mt-5
                                    flex
                                    min-h-7
                                    flex-wrap
                                    gap-2
                                  "
                                >

                                  {model.tags
                                    .slice(0, 4)
                                    .map(
                                      (tag) => (
                                        <span
                                          key={`${model.id}-${tag}`}
                                          className="
                                            rounded-lg
                                            bg-slate-800/60
                                            px-2.5
                                            py-1
                                            text-[11px]
                                            font-medium
                                            text-slate-500
                                          "
                                        >
                                          {tag}
                                        </span>
                                      )
                                    )}

                                </div>

                                {/* =================================================
                                    STATUS INFO
                                ================================================= */}

                                <div
                                  className={`
                                    mt-5
                                    mb-2
                                    flex
                                    items-center
                                    gap-2
                                    text-xs
                                    ${
                                      isAvailable
                                        ? "text-emerald-400/80"
                                        : "text-red-700"
                                    }
                                  `}
                                >

                                  <StatusIcon
                                    size={14}
                                  />

                                  {
                                    statusConfig.description
                                  }

                                </div>

                                {/* =================================================
                                    BUTTON
                                ================================================= */}

                                <button
                                  type="button"
                                  disabled={
                                    !isAvailable
                                  }
                                  onClick={() =>
                                    handleStartPrediction(
                                      model
                                    )
                                  }
                                  className={`
                                    mt-auto
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    rounded-xl
                                    border
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    transition-all
                                    duration-200
                                    ${
                                      isAvailable
                                        ? `
                                          border-blue-500/20
                                          bg-blue-500/10
                                          text-blue-400
                                          hover:border-blue-500/40
                                          hover:bg-blue-500/15
                                          hover:text-blue-300
                                        `
                                        : `
                                          cursor-not-allowed
                                          border-slate-800
                                          bg-slate-900/50
                                          text-slate-600
                                        `
                                    }
                                  `}
                                >

                                  <span>
                                    {isAvailable
                                      ? "Start Prediction"
                                      : statusConfig.label ===
                                          "Coming Soon"
                                        ? "Coming Soon"
                                        : statusConfig.label ===
                                            "Maintenance"
                                          ? "Under Maintenance"
                                          : "Currently Unavailable"}
                                  </span>

                                  <ArrowRight
                                    size={17}
                                    className={
                                      isAvailable
                                        ? "transition-transform group-hover:translate-x-1"
                                        : "opacity-40"
                                    }
                                  />

                                </button>

                              </div>

                            </article>
                          );
                        }
                      )}

                    </div>
                  )}

                {/* =================================================
                    EMPTY
                ================================================= */}

                {!loading &&
                  !error &&
                  filteredModels.length ===
                    0 && (

                    <div
                      className="
                        flex
                        min-h-80
                        flex-col
                        items-center
                        justify-center
                        rounded-3xl
                        border
                        border-dashed
                        border-slate-800
                        bg-[#0d1422]/60
                        px-6
                        text-center
                      "
                    >

                      <div
                        className="
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-2xl
                          bg-slate-800/70
                          text-slate-500
                        "
                      >
                        <Search
                          size={27}
                        />
                      </div>

                      <h3
                        className="
                          mt-5
                          text-lg
                          font-semibold
                          text-white
                        "
                      >
                        No models found
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-md
                          text-sm
                          leading-6
                          text-slate-500
                        "
                      >
                        We couldn't find any
                        prediction models matching
                        your current search and
                        filters.
                      </p>

                      <button
                        type="button"
                        onClick={
                          handleResetFilters
                        }
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-blue-600
                          px-5
                          py-2.5
                          text-sm
                          font-semibold
                          text-white
                          shadow-lg
                          shadow-blue-500/10
                          transition
                          hover:bg-blue-500
                        "
                      >
                        Reset Filters

                        <X size={16} />

                      </button>

                    </div>
                  )}

              </section>

              {/* =================================================
                  CTA
              ================================================= */}

              <section
                className="
                  relative
                  mt-20
                  overflow-hidden
                  rounded-3xl
                  border
                  border-blue-500/15
                  bg-[#0d1422]
                  px-6
                  py-12
                  sm:px-12
                "
              >

                {/* BACKGROUND */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-br
                    from-blue-500/10
                    via-transparent
                    to-purple-500/10
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-64
                    w-64
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-blue-500/10
                    blur-[100px]
                  "
                />

                <div
                  className="
                    relative
                    z-10
                    mx-auto
                    max-w-3xl
                    text-center
                  "
                >

                  {/* ICON */}

                  <div
                    className="
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-blue-500/20
                      bg-blue-500/10
                      text-blue-400
                    "
                  >
                    <Sparkles
                      size={25}
                    />
                  </div>

                  {/* TITLE */}

                  <h2
                    className="
                      mt-6
                      text-2xl
                      font-bold
                      tracking-tight
                      text-white
                      sm:text-3xl
                    "
                  >
                    Ready to make your
                    prediction?
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-xl
                      text-sm
                      leading-6
                      text-slate-500
                      sm:text-base
                    "
                  >
                    Choose one of our active AI
                    models and turn your data into
                    meaningful predictions.
                  </p>

                  {/* BUTTON */}

                  <button
                    type="button"
                    onClick={
                      handleExploreModels
                    }
                    className="
                      mt-7
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      px-6
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-xl
                      shadow-blue-500/20
                      transition-all
                      hover:-translate-y-0.5
                      hover:bg-blue-500
                      hover:shadow-blue-500/30
                      active:translate-y-0
                    "
                  >
                    Explore Active Models

                    <ArrowRight
                      size={18}
                    />

                  </button>

                </div>

              </section>

            </div>

            {/* FOOTER */}

            <Footer />

          </div>

        </main>

        {/* =================================================
            OUTLET
        ================================================= */}

        <Outlet />

      </div>

    </div>
  );
}

export default Prediction;

