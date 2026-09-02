import React from "react";
import {
  Brain,
  Plus,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";

const AdminModels = () => {

  const models = [
    {
      name: "House Price Prediction",
      type: "Regression",
      version: "v1.2",
      status: "Active",
      predictions: "12,450",
    },
    {
      name: "Placement Prediction",
      type: "Classification",
      version: "v1.0",
      status: "Active",
      predictions: "8,240",
    },
    {
      name: "Diabetes Prediction",
      type: "Classification",
      version: "v2.1",
      status: "Active",
      predictions: "6,820",
    },
    {
      name: "Student Performance",
      type: "Regression",
      version: "v1.3",
      status: "Inactive",
      predictions: "4,210",
    },
  ];

  return (
    <div className="space-y-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Models
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage machine learning prediction models.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          <Plus size={18} />
          Add Model
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {models.map((model) => (
          <div
            key={model.name}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Brain size={22} />
              </div>

              <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50">
                <MoreHorizontal size={18} />
              </button>

            </div>

            <h2 className="mt-5 font-semibold text-slate-900">
              {model.name}
            </h2>

            <div className="mt-2 flex items-center gap-2">

              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
                {model.type}
              </span>

              <span className="text-xs text-slate-400">
                {model.version}
              </span>

            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

              <div>
                <p className="text-xs text-slate-400">
                  Predictions
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {model.predictions}
                </p>
              </div>

              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  model.status === "Active"
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
              >
                <CheckCircle2 size={14} />
                {model.status}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminModels;