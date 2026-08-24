import React, { useState } from "react";
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
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";

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
  35, 48, 42, 58, 51, 65, 72, 60, 75, 68,
  82, 73, 88, 79, 92, 84, 76, 90, 95, 87,
  98, 91, 84, 96, 89, 94, 86, 92, 97, 100,
];

/* ============================================================
   ANALYTICS
============================================================ */

function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

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

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* ====================================================
            NAVBAR
        ==================================================== */}

        <Navbar
          onMenuClick={() =>
            setSidebarOpen((prev) => !prev)
          }
        />

        {/* ====================================================
            SCROLLABLE CONTENT
        ==================================================== */}

        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">

          <div className="px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-7xl">

              {/* =================================================
                  PAGE HEADER
              ================================================== */}

              <div className="mb-8">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  {/* Heading */}

                  <div>

                    <div className="mb-2 flex items-center gap-2">

                      <BarChart3 className="h-6 w-6 text-indigo-600" />

                      <span className="text-sm font-semibold text-indigo-600">
                        Analytics
                      </span>

                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Prediction Analytics
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                      Monitor your prediction performance, model
                      accuracy, and activity from one place.
                    </p>

                  </div>

                  {/* Date Button */}

                  <button
                    type="button"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-slate-700
                      shadow-sm
                      transition
                      hover:bg-slate-50
                    "
                  >

                    <Clock3 className="h-4 w-4" />

                    Last 30 Days

                  </button>

                </div>

              </div>

              {/* =================================================
                  STATISTICS CARDS
              ================================================== */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* Card 1 */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        Total Predictions
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        3,620
                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-emerald-600">

                        <TrendingUp className="h-4 w-4" />

                        +14.8%

                      </div>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">

                      <Activity className="h-5 w-5 text-indigo-600" />

                    </div>

                  </div>

                </div>

                {/* Card 2 */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        Average Accuracy
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        93.4%
                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-emerald-600">

                        <TrendingUp className="h-4 w-4" />

                        +6.2%

                      </div>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">

                      <Target className="h-5 w-5 text-emerald-600" />

                    </div>

                  </div>

                </div>

                {/* Card 3 */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        Active Models
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        12
                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-slate-500">

                        <Brain className="h-4 w-4" />

                        4 categories

                      </div>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">

                      <Brain className="h-5 w-5 text-purple-600" />

                    </div>

                  </div>

                </div>

                {/* Card 4 */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        Success Rate
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        98.2%
                      </h2>

                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-emerald-600">

                        <TrendingUp className="h-4 w-4" />

                        +3.4%

                      </div>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">

                      <CheckCircle2 className="h-5 w-5 text-blue-600" />

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  CHART SECTION
              ================================================== */}

              <div className="mt-6 grid gap-6 lg:grid-cols-3">

                {/* Prediction Overview */}

                <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-lg font-bold text-slate-900">
                        Prediction Overview
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Prediction activity over the last 30 days
                      </p>

                    </div>

                    <BarChart3 className="h-5 w-5 text-slate-400" />

                  </div>

                  {/* Bars */}

                  <div className="mt-8 h-64 w-full overflow-hidden">

                    <div className="flex h-full items-end gap-1 sm:gap-2">

                      {chartData.map((height, index) => (

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
                              bg-indigo-500
                              opacity-80
                              transition-all
                              duration-200
                              group-hover:bg-indigo-600
                              group-hover:opacity-100
                            "
                          />

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* Dates */}

                  <div className="mt-4 flex justify-between text-xs text-slate-400">

                    <span>1 Aug</span>
                    <span>8 Aug</span>
                    <span>15 Aug</span>
                    <span>22 Aug</span>
                    <span>30 Aug</span>

                  </div>

                </div>

                {/* =================================================
                    OVERALL ACCURACY
                ================================================== */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <h2 className="text-lg font-bold text-slate-900">
                    Overall Accuracy
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Performance across all models
                  </p>

                  <div className="flex flex-col items-center py-8">

                    {/* Circle */}

                    <div className="relative h-44 w-44">

                      <div className="absolute inset-0 rounded-full border-[18px] border-indigo-100" />

                      <div
                        className="
                          absolute
                          inset-0
                          rounded-full
                          border-[18px]
                          border-indigo-600
                          border-b-transparent
                          border-l-transparent
                          rotate-[-35deg]
                        "
                      />

                      <div className="absolute inset-[18px] flex items-center justify-center rounded-full bg-white">

                        <div className="text-center">

                          <p className="text-3xl font-bold text-slate-900">
                            93.4%
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Accuracy
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-600">

                      <TrendingUp className="h-4 w-4" />

                      6.2% improvement

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  MODEL PERFORMANCE
              ================================================== */}

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                  <h2 className="text-lg font-bold text-slate-900">
                    Model Performance
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Compare prediction models and their performance.
                  </p>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[700px]">

                    <thead>

                      <tr className="border-b border-slate-100 text-left">

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

                      {modelPerformance.map((model) => (

                        <tr
                          key={model.name}
                          className="
                            border-b
                            border-slate-100
                            last:border-0
                            hover:bg-slate-50
                          "
                        >

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">

                                <Brain className="h-4 w-4 text-indigo-600" />

                              </div>

                              <span className="font-semibold text-slate-800">
                                {model.name}
                              </span>

                            </div>

                          </td>

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">

                                <div
                                  style={{
                                    width: `${model.accuracy}%`,
                                  }}
                                  className="h-full rounded-full bg-indigo-500"
                                />

                              </div>

                              <span className="text-sm font-semibold text-slate-700">
                                {model.accuracy}%
                              </span>

                            </div>

                          </td>

                          <td className="px-6 py-5 text-sm font-medium text-slate-700">

                            {model.predictions.toLocaleString()}

                          </td>

                          <td className="px-6 py-5">

                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">

                              <ArrowUpRight className="h-4 w-4" />

                              {model.trend}

                            </span>

                          </td>

                          <td className="px-6 py-5">

                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">

                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

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
              ================================================== */}

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="flex items-center justify-between border-b border-slate-100 p-6">

                  <div>

                    <h2 className="text-lg font-bold text-slate-900">
                      Recent Predictions
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Latest prediction activity from your models.
                    </p>

                  </div>

                  <button
                    type="button"
                    className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                  >
                    View All
                  </button>

                </div>

                <div className="divide-y divide-slate-100">

                  {recentActivity.map((activity, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        flex-col
                        gap-4
                        p-5
                        transition
                        hover:bg-slate-50
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">

                          <Activity className="h-5 w-5 text-indigo-600" />

                        </div>

                        <div>

                          <h3 className="text-sm font-semibold text-slate-800">
                            {activity.title}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {activity.model} • {activity.time}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-6">

                        <div>

                          <p className="text-xs text-slate-400">
                            Result
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-800">
                            {activity.result}
                          </p>

                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">

                          <CheckCircle2 className="h-3.5 w-3.5" />

                          {activity.status}

                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* =================================================
                  INSIGHT
              ================================================== */}

              <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">

                    <AlertCircle className="h-5 w-5 text-indigo-600" />

                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Analytics Insight
                    </h2>

                    <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                      Your prediction accuracy has improved by 6.2%
                      over the previous period. Deep Learning is
                      currently your best performing model with an
                      accuracy of 96.3%.
                    </p>

                  </div>

                </div>

              </div>

              {/* Bottom spacing */}

              <div className="h-10" />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Analytics;