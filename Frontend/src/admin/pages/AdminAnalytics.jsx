import React from "react";
import {
  TrendingUp,
  Users,
  Brain,
  Activity,
} from "lucide-react";

const AdminAnalytics = () => {

  const models = [
    ["House Price", 82],
    ["Placement", 67],
    ["Diabetes", 54],
    ["Student Performance", 41],
    ["Stock Prediction", 29],
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Analyze users, models and prediction performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {[
          ["Users Growth", "+24.8%", Users],
          ["Prediction Growth", "+32.4%", TrendingUp],
          ["Model Usage", "+18.6%", Brain],
          ["System Activity", "76.4%", Activity],
        ].map(([title, value, Icon]) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  {title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {value}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Icon size={21} />
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Model usage */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <h2 className="font-semibold text-slate-900">
          Model Usage
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Percentage of total prediction traffic
        </p>

        <div className="mt-6 space-y-5">

          {models.map(([name, value]) => (
            <div key={name}>

              <div className="mb-2 flex justify-between">

                <span className="text-sm font-medium text-slate-700">
                  {name}
                </span>

                <span className="text-sm font-semibold text-slate-600">
                  {value}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default AdminAnalytics;