import React from "react";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const AdminPredictions = () => {

  const predictions = [
    {
      user: "Rahul Kumar",
      model: "House Price",
      result: "$245,000",
      status: "Completed",
      time: "2 min ago",
    },
    {
      user: "Priya Sharma",
      model: "Placement",
      result: "High Chance",
      status: "Completed",
      time: "10 min ago",
    },
    {
      user: "Amit Singh",
      model: "Diabetes",
      result: "Low Risk",
      status: "Completed",
      time: "25 min ago",
    },
    {
      user: "Neha Gupta",
      model: "Student Performance",
      result: "87%",
      status: "Processing",
      time: "32 min ago",
    },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Predictions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor prediction requests across all models.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Predictions
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            48,392
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            47,821
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Processing
          </p>

          <h2 className="mt-2 text-2xl font-bold text-amber-500">
            571
          </h2>
        </div>

      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px]">

            <thead className="bg-slate-50">

              <tr>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-slate-400">
                  User
                </th>

                <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-slate-400">
                  Model
                </th>

                <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-slate-400">
                  Result
                </th>

                <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-slate-400">
                  Time
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {predictions.map((prediction, index) => (
                <tr key={index} className="hover:bg-slate-50">

                  <td className="px-5 py-4 text-sm font-medium text-slate-700">
                    {prediction.user}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {prediction.model}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    {prediction.result}
                  </td>

                  <td className="px-5 py-4">

                    <span className="flex items-center gap-1.5 text-xs font-semibold">

                      {prediction.status === "Completed" ? (
                        <CheckCircle2
                          size={15}
                          className="text-emerald-500"
                        />
                      ) : (
                        <Clock
                          size={15}
                          className="text-amber-500"
                        />
                      )}

                      {prediction.status}

                    </span>

                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {prediction.time}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminPredictions;