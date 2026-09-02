import React from "react";
import {
  Users,
  Brain,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Users",
      value: "12,840",
      change: "+12.5%",
      positive: true,
      icon: Users,
    },
    {
      title: "Active Models",
      value: "24",
      change: "+8.2%",
      positive: true,
      icon: Brain,
    },
    {
      title: "Predictions",
      value: "48,392",
      change: "+18.7%",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "System Usage",
      value: "76.4%",
      change: "-2.4%",
      positive: false,
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Monitor your PredictHub platform and prediction activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {stat.value}
                  </h3>
                </div>

                <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                  <Icon size={21} />
                </div>

              </div>

              <div className="mt-4 flex items-center gap-1 text-xs">

                {stat.positive ? (
                  <ArrowUpRight
                    size={15}
                    className="text-emerald-500"
                  />
                ) : (
                  <ArrowDownRight
                    size={15}
                    className="text-emerald-500"
                  />
                )}

                <span className="font-semibold text-emerald-600">
                  {stat.change}
                </span>

                <span className="text-slate-400">
                  vs last month
                </span>

              </div>
            </div>
          );
        })}

      </div>

      {/* Bottom section */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Chart */}
        <div className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20 xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-white">
                Prediction Activity
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Prediction activity over the last 7 days
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/predictions")}
              title="View all predictions"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-cyan-300"
            >
              <MoreHorizontal size={19} />
            </button>

          </div>

          <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">

            {[45, 60, 48, 75, 58, 82, 94].map((height, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full max-w-12 rounded-t-lg bg-cyan-400 transition hover:bg-cyan-300"
                  style={{ height: `${height}%` }}
                />

                <span className="text-[11px] text-slate-400">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20">

          <h2 className="font-semibold text-white">
            Recent Activity
          </h2>

          <div className="mt-5 space-y-5">

            {[
              ["New user registered", "2 min ago"],
              ["House Price model used", "12 min ago"],
              ["Placement prediction", "24 min ago"],
              ["New model uploaded", "1 hour ago"],
              ["User account updated", "2 hours ago"],
            ].map(([title, time], index) => (
              <div
                key={index}
                className="flex gap-3"
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />

                <div>
                  <p className="text-sm font-medium text-slate-300">
                    {title}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {time}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;