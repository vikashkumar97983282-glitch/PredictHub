import { useState } from "react";
import {
  Flame,
  Users,
  Brain,
  TrendingUp,
  ChevronRight,
  ArrowUpRight,
  CalendarDays,
  Trophy,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";
import { useSidebar } from "../contexts/use-sidebar";

/* ============================================================
   TRENDING MODELS DATA
============================================================ */

const trendingModels = [
  {
    id: 1,
    name: "Deep Learning",
    category: "Neural Networks",
    accuracy: "96.3%",
    predictions: "986",
    users: "2.4K",
    growth: "+23.7%",
    icon: Brain,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    id: 2,
    name: "Random Forest",
    category: "Ensemble Learning",
    accuracy: "94.8%",
    predictions: "842",
    users: "1.9K",
    growth: "+18.4%",
    icon: TrendingUp,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
  },
  {
    id: 3,
    name: "XGBoost",
    category: "Gradient Boosting",
    accuracy: "95.6%",
    predictions: "764",
    users: "1.6K",
    growth: "+15.2%",
    icon: Trophy,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
  },
  {
    id: 4,
    name: "Support Vector Machine",
    category: "Classification",
    accuracy: "92.1%",
    predictions: "621",
    users: "1.2K",
    growth: "+10.6%",
    icon: Brain,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
  },
  {
    id: 5,
    name: "Linear Regression",
    category: "Regression",
    accuracy: "89.4%",
    predictions: "518",
    users: "980",
    growth: "+7.8%",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
];

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
  const [period, setPeriod] = useState("This Month");

  return (
    <div className="flex min-h-screen bg-[#0d1422] text-white">
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
          MAIN AREA
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* ====================================================
            NAVBAR
        ==================================================== */}

        <Navbar
          onMenuClick={toggleMobileMenu}
        />

        {/* ====================================================
            SCROLLABLE CONTENT
        ==================================================== */}

        <main className="flex-1 overflow-x-hidden bg-[#0f1726]">
          {/* Background Glow */}

          <div className="min-h-full bg-[radial-gradient(circle_at_70%_5%,rgba(120,70,200,0.16),transparent_28%)]">
            <div className="px-4 py-7 sm:px-6 lg:px-8 xl:px-12">
              <div className="mx-auto w-full max-w-7xl">
                {/* =================================================
                    PAGE HEADER
                ================================================== */}

                <div className="mb-10">
                  {/* Trending Badge */}

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />

                    <span className="text-xs font-bold tracking-wider text-orange-300">
                      TRENDING · COMMUNITY INSIGHTS
                    </span>
                  </div>

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    {/* Title */}

                    <div>
                      <h1 className="text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
                        Trending{" "}

                        <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                          Predictions
                        </span>
                      </h1>

                      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
                        Discover the most popular models, predictions,
                        and technologies trending on PredictHub.
                      </p>
                    </div>

                    {/* Period Button */}

                    <button
                      onClick={() =>
                        setPeriod(
                          period === "This Month"
                            ? "This Week"
                            : "This Month"
                        )
                      }
                      className="
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800/80
                        px-5
                        py-3.5
                        text-sm
                        font-semibold
                        text-slate-300
                        shadow-lg
                        shadow-black/20
                        transition
                        hover:border-slate-600
                        hover:bg-slate-700
                      "
                    >
                      <CalendarDays className="h-4 w-4 text-orange-400" />

                      {period}
                    </button>
                  </div>
                </div>

                {/* =================================================
                    STATISTICS CARDS
                ================================================== */}

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {/* Trending Predictions */}

                  <StatCard
                    title="Trending Predictions"
                    value="12.8K"
                    change="+24.8%"
                    icon={Flame}
                    iconClassName="text-orange-400"
                    iconBackground="bg-orange-500/10"
                    borderClassName="border-orange-500/30"
                  />

                  {/* Active Users */}

                  <StatCard
                    title="Active Users"
                    value="8.6K"
                    change="+18.2%"
                    icon={Users}
                    iconClassName="text-blue-400"
                    iconBackground="bg-blue-500/10"
                  />

                  {/* Popular Model */}

                  <StatCard
                    title="Popular Model"
                    value="Deep Learning"
                    change="96.3% accuracy"
                    icon={Brain}
                    iconClassName="text-purple-400"
                    iconBackground="bg-purple-500/10"
                    changeColor="text-purple-300"
                    isAccuracy
                  />

                  {/* Overall Growth */}

                  <StatCard
                    title="Overall Growth"
                    value="+27.4%"
                    change="Increasing"
                    icon={TrendingUp}
                    iconClassName="text-emerald-400"
                    iconBackground="bg-emerald-500/10"
                  />
                </div>

                {/* =================================================
                    TRENDING MODELS
                ================================================== */}

                <section
                  className="
                    mt-7
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-700/80
                    bg-slate-800/60
                    shadow-xl
                    shadow-black/20
                    backdrop-blur-sm
                  "
                >
                  {/* Section Header */}

                  <div className="flex items-center justify-between border-b border-slate-700/80 px-5 py-6 sm:px-7">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">
                        <Flame className="h-5 w-5 text-orange-400" />
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-slate-100">
                          Trending Models
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Models receiving the most attention from
                          the community.
                        </p>
                      </div>
                    </div>

                    <button
                      className="
                        hidden
                        items-center
                        gap-1
                        text-sm
                        font-semibold
                        text-blue-400
                        transition
                        hover:text-blue-300
                        sm:flex
                      "
                    >
                      View All

                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Table Header */}

                  <div
                    className="
                      hidden
                      border-b
                      border-slate-700/60
                      px-6
                      py-4
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                      md:grid
                      md:grid-cols-[70px_minmax(180px,1.7fr)_1fr_1fr_1fr_120px]
                      md:items-center
                    "
                  >
                    <div>Rank</div>

                    <div>Model</div>

                    <div>Accuracy</div>

                    <div>Predictions</div>

                    <div>Users</div>

                    <div>Growth</div>
                  </div>

                  {/* Model Rows */}

                  <div>
                    {trendingModels.map((model) => (
                      <ModelRow
                        key={model.id}
                        model={model}
                      />
                    ))}
                  </div>

                  {/* Mobile View All */}

                  <div className="border-t border-slate-700/70 p-4 text-center sm:hidden">
                    <button className="inline-flex items-center gap-1 text-sm font-semibold text-blue-400">
                      View All

                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </section>

                {/* Bottom Spacing */}

                <div className="h-10" />
              </div>
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD COMPONENT
============================================================ */

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconClassName,
  iconBackground,
  borderClassName = "border-slate-700/80",
  changeColor = "text-emerald-400",
  isAccuracy = false,
}) {
  return (
    <div
      className={`
        min-h-[170px]
        rounded-2xl
        border
        ${borderClassName}
        bg-slate-800/70
        p-5
        shadow-lg
        shadow-black/10
        transition
        duration-300
        hover:-translate-y-1
        hover:border-slate-600
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-400">
            {title}
          </p>

          <h3
            className={`
              mt-4
              font-bold
              text-slate-100
              ${
                value === "Deep Learning"
                  ? "text-2xl sm:text-3xl"
                  : "text-3xl"
              }
            `}
          >
            {value}
          </h3>
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
            ${iconBackground}
          `}
        >
          <Icon
            className={`h-5 w-5 ${iconClassName}`}
          />
        </div>
      </div>

      <div
        className={`
          mt-5
          flex
          items-center
          gap-1.5
          text-sm
          font-semibold
          ${changeColor}
        `}
      >
        {isAccuracy ? (
          <span className="text-base">☆</span>
        ) : (
          <ArrowUpRight className="h-4 w-4" />
        )}

        {change}
      </div>
    </div>
  );
}

/* ============================================================
   MODEL ROW COMPONENT
============================================================ */

function ModelRow({ model }) {
  const Icon = model.icon;

  return (
    <div
      className="
        border-b
        border-slate-700/60
        px-5
        py-5
        transition
        duration-200
        hover:bg-slate-700/20
        md:grid
        md:grid-cols-[70px_minmax(180px,1.7fr)_1fr_1fr_1fr_120px]
        md:items-center
        md:gap-4
      "
    >
      {/* Mobile Layout */}

      <div className="flex items-start gap-4 md:contents">
        {/* Rank */}

        <div className="flex md:block">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-orange-500/15
              text-sm
              font-bold
              text-orange-300
            "
          >
            #{model.id}
          </div>
        </div>

        {/* Model */}

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              ${model.iconBg}
            `}
          >
            <Icon
              className={`h-5 w-5 ${model.iconColor}`}
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-100">
              {model.name}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {model.category}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="mt-5 grid grid-cols-3 gap-4 pl-14 md:mt-0 md:contents md:pl-0">
        <InfoBlock
          label="Accuracy"
          value={model.accuracy}
        />

        <InfoBlock
          label="Predictions"
          value={model.predictions}
        />

        <InfoBlock
          label="Users"
          value={model.users}
        />
      </div>

      {/* Growth */}

      <div className="mt-5 pl-14 md:mt-0 md:pl-0">
        <span
          className="
            inline-flex
            items-center
            gap-1
            rounded-full
            border
            border-emerald-400/20
            bg-emerald-400/10
            px-3
            py-1.5
            text-xs
            font-bold
            text-emerald-400
          "
        >
          <ArrowUpRight className="h-3.5 w-3.5" />

          {model.growth}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   INFO BLOCK COMPONENT
============================================================ */

function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-200">
        {value}
      </p>
    </div>
  );
}

export default Trending;
