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
} from "lucide-react";

import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Footer from "../components/footer";
import { useSidebar } from "../contexts/use-sidebar";
import { requestJson } from "../lib/api";

const iconOptions = {
  Brain,
  BarChart3,
  Activity,
  Database,
  Cpu,
  TrendingUp,
};

const normalizeDatabaseModel = (model) => ({
  id: model._id || model.id,
  title: model.title,
  description: model.description,
  category: model.category,
  icon: model.icon,
  iconColor: model.icon_color,
  iconBg: model.icon_background,
  borderColor: model.border_color,
  route: model.route,
  tags: Array.isArray(model.tags) ? model.tags : [],
});

/* =====================================================
   PREDICTION PAGE
===================================================== */

function Prediction() {
  const navigate = useNavigate();

  /* =====================================================
     SIDEBAR STATE
  ===================================================== */

  const {
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();

  /* =====================================================
     SEARCH & CATEGORY
  ===================================================== */

  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadDatabaseModels = async () => {
      try {
        const response = await requestJson("/model/models");
        const databaseModels = Array.isArray(response.data)
          ? response.data.map(normalizeDatabaseModel)
          : [];

        if (isMounted) {
          setAvailableModels(databaseModels);
        }
      } catch (error) {
        console.error("Unable to load database models:", error);
      }
    };

    loadDatabaseModels();

    return () => {
      isMounted = false;
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const categories = useMemo(() => [
    "All",
    ...new Set(availableModels.map((model) => model.category).filter(Boolean)),
  ], [availableModels]);

  /* =====================================================
     FILTER MODELS
  ===================================================== */

  const filteredModels = useMemo(() => {
    const searchValue = searchTerm.trim().toLowerCase();

    return availableModels.filter((model) => {
      /* Category filter */

      const matchesCategory =
        activeCategory === "All" ||
        model.category === activeCategory;

      /* Search filter */

      const matchesSearch =
        searchValue === "" ||
        model.title.toLowerCase().includes(searchValue) ||
        model.description
          .toLowerCase()
          .includes(searchValue) ||
        model.category
          .toLowerCase()
          .includes(searchValue) ||
        model.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue)
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, availableModels, searchTerm]);

  /* =====================================================
     SCROLL TO MODELS
  ===================================================== */

  const handleExploreModels = () => {
    document
      .getElementById("prediction-models")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
        onToggleSidebar={toggleSidebar}
      />

      {/* =================================================
          MAIN APPLICATION
      ================================================= */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* =================================================
            HEADER
        ================================================= */}

        <Header
          onMenuClick={toggleMobileMenu}
        />

        {/* =================================================
            SCROLLABLE AREA
        ================================================= */}

        <main
          className="
            flex-1
            overflow-x-hidden
            scroll-smooth
          "
        >

          {/* =================================================
              PAGE
          ================================================= */}

          <div className="relative min-h-full bg-[#070b14]">

            {/* =================================================
                BACKGROUND EFFECTS
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

                <section className="text-center">

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

                    <Sparkles size={14} />

                    AI Prediction Platform

                  </div>

                  <h1
                    className="
                      mt-6
                      text-4xl
                      font-bold
                      tracking-tight
                      text-white
                      sm:text-5xl
                      lg:text-6xl
                    "
                  >

                    Explore{" "}

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
                      AI-Powered
                    </span>

                    <br />

                    Prediction Models

                  </h1>

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
                    Explore intelligent machine learning and deep
                    learning models designed to solve real-world
                    prediction problems.
                  </p>

                </section>

                {/* =================================================
                    SEARCH
                ================================================= */}

                <section className="mx-auto mt-10 max-w-3xl">

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-slate-800
                      bg-[#101827]/80
                      px-4
                      py-3
                      shadow-xl
                      shadow-black/20
                      backdrop-blur-xl
                      transition
                      focus-within:border-blue-500/50
                      focus-within:ring-4
                      focus-within:ring-blue-500/5
                    "
                  >

                    <Search
                      size={20}
                      className="shrink-0 text-slate-500"
                    />

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(event.target.value)
                      }
                      placeholder="Search prediction models..."
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-500
                      "
                    />

                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="
                          flex
                          h-8
                          w-8
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
                        <X size={17} />
                      </button>
                    )}

                  </div>

                </section>

                {/* =================================================
                    CATEGORY FILTER
                ================================================= */}

                <section
                  className="
                    mt-8
                    flex
                    flex-wrap
                    justify-center
                    gap-3
                  "
                >

                  <div className="flex items-center text-slate-500">
                    <Filter size={17} />
                  </div>

                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setActiveCategory(category)
                      }
                      className={`
                        rounded-xl
                        border
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        transition-all
                        duration-200

                        ${
                          activeCategory === category
                            ? `
                              border-blue-500/40
                              bg-blue-500/15
                              text-blue-400
                              shadow-lg
                              shadow-blue-500/5
                            `
                            : `
                              border-slate-800
                              bg-[#101827]/70
                              text-slate-400
                              hover:border-slate-700
                              hover:bg-slate-800
                              hover:text-white
                            `
                        }
                      `}
                    >
                      {category}
                    </button>
                  ))}

                </section>

                {/* =================================================
                    MODELS
                ================================================= */}

                <section
                  id="prediction-models"
                  className="mt-16 scroll-mt-8"
                >

                  <div className="mb-8">

                    <h2 className="text-2xl font-bold text-white">
                      Available Models
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      {filteredModels.length} model
                      {filteredModels.length !== 1
                        ? "s"
                        : ""}{" "}
                      available
                    </p>

                  </div>

                  {filteredModels.length > 0 ? (

                    <div
                      className="
                        grid
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-3
                      "
                    >

                      {filteredModels.map((model) => {
                        const Icon = typeof model.icon === "string"
                          ? iconOptions[model.icon] || Brain
                          : model.icon;

                        return (
                          <div
                            key={model.id}
                            className={`
                              group
                              relative
                              flex
                              min-h-82.5
                              flex-col
                              overflow-hidden
                              rounded-2xl
                              border
                              border-slate-800
                              bg-[#101827]/80
                              p-6
                              backdrop-blur-sm
                              transition-all
                              duration-300
                              hover:-translate-y-2
                              ${model.borderColor}
                              hover:shadow-2xl
                              hover:shadow-black/30
                            `}
                          >

                            {/* CARD GRADIENT */}

                            <div
                              className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-linear-to-br
                                from-blue-500/5
                                via-transparent
                                to-purple-500/5
                                opacity-0
                                transition-opacity
                                duration-300
                                group-hover:opacity-100
                              "
                            />

                            <div
                              className="
                                relative
                                z-10
                                flex
                                h-full
                                flex-col
                              "
                            >

                              {/* ICON */}

                              <div
                                className="
                                  flex
                                  items-start
                                  justify-between
                                  gap-4
                                "
                              >

                                <div
                                  className={`
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-white/5
                                    ${model.iconBg}
                                    transition-transform
                                    duration-300
                                    group-hover:scale-110
                                    group-hover:rotate-3
                                  `}
                                >

                                  <Icon
                                    size={25}
                                    className={model.iconColor}
                                  />

                                </div>

                                <span
                                  className="
                                    rounded-full
                                    border
                                    border-slate-700
                                    bg-slate-900/70
                                    px-3
                                    py-1
                                    text-[11px]
                                    font-medium
                                    text-slate-400
                                  "
                                >
                                  {model.category}
                                </span>

                              </div>

                              {/* TITLE */}

                              <h3
                                className="
                                  mt-6
                                  text-xl
                                  font-bold
                                  text-white
                                "
                              >
                                {model.title}
                              </h3>

                              {/* DESCRIPTION */}

                              <p
                                className="
                                  mt-3
                                  text-sm
                                  leading-6
                                  text-slate-400
                                "
                              >
                                {model.description}
                              </p>

                              {/* TAGS */}

                              <div
                                className="
                                  mt-5
                                  flex
                                  flex-wrap
                                  gap-2
                                "
                              >

                                {model.tags.map((tag) => (
                                  <span
                                    key={`${model.id}-${tag}`}
                                    className="
                                      rounded-lg
                                      bg-slate-800/80
                                      px-2.5
                                      py-1
                                      text-xs
                                      text-slate-400
                                    "
                                  >
                                    {tag}
                                  </span>
                                ))}

                              </div>

                              {/* BUTTON */}

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(model.route)
                                }
                                className="
                                  mt-auto
                                  flex
                                  items-center
                                  justify-between
                                  border-t
                                  border-slate-800
                                  pt-5
                                  text-sm
                                  font-semibold
                                  text-blue-400
                                  transition
                                  hover:text-blue-300
                                "
                              >

                                Start Prediction

                                <ArrowRight
                                  size={18}
                                  className="
                                    transition-transform
                                    duration-200
                                    group-hover:translate-x-1
                                  "
                                />

                              </button>

                            </div>

                          </div>
                        );
                      })}

                    </div>

                  ) : (

                    /* =================================================
                       NO RESULTS
                    ================================================= */

                    <div
                      className="
                        flex
                        min-h-75
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                        border-slate-700
                        bg-[#101827]/50
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
                          bg-slate-800
                          text-slate-500
                        "
                      >
                        <Search size={28} />
                      </div>

                      <h3
                        className="
                          mt-5
                          text-lg
                          font-semibold
                          text-white
                        "
                      >
                        No prediction models found
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-sm
                          text-sm
                          text-slate-500
                        "
                      >
                        Try searching with another keyword
                        or select a different category.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setSearchTerm("");
                          setActiveCategory("All");
                        }}
                        className="
                          mt-6
                          rounded-xl
                          bg-blue-600
                          px-5
                          py-2.5
                          text-sm
                          font-semibold
                          text-white
                          transition
                          hover:bg-blue-500
                        "
                      >
                        Reset Filters
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
                    bg-linear-to-br
                    from-blue-600/10
                    via-[#101827]
                    to-purple-600/10
                    px-6
                    py-12
                    text-center
                    sm:px-12
                  "
                >

                  <div
                    className="
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

                  <div className="relative z-10">

                    <div
                      className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-500/10
                        text-blue-400
                      "
                    >
                      <Sparkles size={26} />
                    </div>

                    <h2
                      className="
                        mt-6
                        text-2xl
                        font-bold
                        text-white
                        sm:text-3xl
                      "
                    >
                      Ready to make your prediction?
                    </h2>

                    <p
                      className="
                        mx-auto
                        mt-3
                        max-w-xl
                        text-sm
                        leading-6
                        text-slate-400
                      "
                    >
                      Select a prediction model and start
                      exploring the power of artificial
                      intelligence.
                    </p>

                    <button
                      type="button"
                      onClick={handleExploreModels}
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
                        shadow-lg
                        shadow-blue-500/20
                        transition-all
                        hover:scale-105
                        hover:bg-blue-500
                        active:scale-95
                      "
                    >
                      Explore Models

                      <ArrowRight size={18} />
                    </button>

                  </div>

                </section>

              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <Footer />

            </div>

          </div>

        </main>

        {/* =================================================
            ROUTER OUTLET
        ================================================= */}

        <Outlet />

      </div>

    </div>
  );
}

export default Prediction;

