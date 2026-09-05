import { useEffect, useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { requestJson } from "../../lib/api";

const AdminPredictions = () => {
  const [data, setData] = useState({ total: 0, completed: 0, processing: 0, predictions: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    requestJson("/admin/predictions")
      .then(setData)
      .catch((requestError) => setError(requestError.message));
  }, []);

  const formatTime = (value) => value ? new Date(value).toLocaleString() : "Recently";

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Predictions</h1><p className="mt-1 text-sm text-slate-400">Monitor prediction requests across all models.</p></div>
      {error && <p role="alert" className="rounded-lg border border-[#243047] bg-[#111827] px-4 py-3 text-sm text-amber-300">Predictions unavailable. Showing default values.</p>}
      <>
        <div className="grid gap-4 sm:grid-cols-3">{[["Total Predictions", data.total ?? 0, "text-white"], ["Completed", data.completed ?? 0, "text-emerald-300"], ["Processing", data.processing ?? 0, "text-amber-400"]].map(([label, value, color]) => <div key={label} className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20"><p className="text-sm text-slate-400">{label}</p><h2 className={`mt-2 text-2xl font-bold ${color}`}>{value}</h2></div>)}</div>
        <div className="overflow-hidden rounded-xl border border-[#243047] bg-[#111827] shadow-xl shadow-black/20"><div className="overflow-x-auto"><table className="w-full min-w-[750px]"><thead className="bg-slate-800/70"><tr>{["User", "Model", "Result", "Status", "Time"].map((heading) => <th key={heading} className="px-5 py-3 text-left text-xs uppercase tracking-wider text-slate-400">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{(data.predictions || []).map((prediction, index) => <tr key={prediction._id || index} className="transition hover:bg-slate-800/50"><td className="px-5 py-4 text-sm font-medium text-slate-300">{prediction.user_name || "-"}</td><td className="px-5 py-4 text-sm text-slate-400">{prediction.model || "-"}</td><td className="px-5 py-4 text-sm font-semibold text-slate-200">{prediction.result ?? 0}</td><td className="px-5 py-4"><span className="flex items-center gap-1.5 text-xs font-semibold">{prediction.status === "Completed" ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Clock size={15} className="text-amber-500" />}{prediction.status || "-"}</span></td><td className="px-5 py-4 text-xs text-slate-400">{formatTime(prediction.created_at)}</td></tr>)}</tbody></table>{(!data.predictions || data.predictions.length === 0) && <p className="p-8 text-center text-sm text-slate-500">No predictions found.</p>}</div></div>
      </>
    </div>
  );
};

export default AdminPredictions;
