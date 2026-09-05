import { useEffect, useState } from "react";
import { Activity, ArrowUpRight, Brain, MoreHorizontal, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Commet from "react-loading-indicators/Commet";
import { requestJson } from "../../lib/api";

const EMPTY_DASHBOARD = {
  total_users: 0,
  active_models: 0,
  predictions: 0,
  system_usage: 0,
  chart_data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label) => ({
    label,
    value: 0,
  })),
  recent_activity: [],
};

const normalizeDashboard = (data) => ({
  total_users: Number.isFinite(Number(data?.total_users)) ? Number(data.total_users) : 0,
  active_models: Number.isFinite(Number(data?.active_models)) ? Number(data.active_models) : 0,
  predictions: Number.isFinite(Number(data?.predictions)) ? Number(data.predictions) : 0,
  system_usage: Number.isFinite(Number(data?.system_usage)) ? Number(data.system_usage) : 0,
  chart_data: Array.isArray(data?.chart_data) ? data.chart_data : EMPTY_DASHBOARD.chart_data,
  recent_activity: Array.isArray(data?.recent_activity) ? data.recent_activity : [],
});

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await requestJson("/admin/dashboard");
        setDashboard(normalizeDashboard(data));
        setError("");
      } catch (requestError) {
        setDashboard(EMPTY_DASHBOARD);
        setError(requestError.message || "Dashboard data is currently unavailable.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = [
    ["Total Users", dashboard.total_users ?? 0, Users],
    ["Active Models", dashboard.active_models ?? 0, Brain],
    ["Predictions", dashboard.predictions ?? 0, TrendingUp],
    ["System Usage", `${dashboard.system_usage ?? 0}%`, Activity],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Monitor your PredictHub platform and prediction activity.</p>
      </div>

      {(isLoading || error) && <div className="flex items-center justify-between rounded-lg border border-[#243047] bg-[#111827] px-4 py-3 text-sm text-slate-400">
        <span>{isLoading ? "Loading dashboard data..." : "Dashboard data is currently unavailable. Showing default values."}</span>
        {isLoading && <Commet color="#32cd32" size="small" text="" textColor="" />}
      </div>}

      <>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(([title, value, Icon]) => (
            <div key={title} className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20">
              <div className="flex items-start justify-between">
                <div><p className="text-sm text-slate-400">{title}</p><h3 className="mt-2 text-2xl font-bold text-white">{value}</h3></div>
                <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300"><Icon size={21} /></div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs"><ArrowUpRight size={15} className="text-emerald-500" /><span className="font-semibold text-emerald-300">Live</span><span className="text-slate-400">from database</span></div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20 xl:col-span-2">
            <div className="flex items-center justify-between"><div><h2 className="font-semibold text-white">Prediction Activity</h2><p className="mt-1 text-xs text-slate-500">Prediction activity over the last 7 days</p></div><button type="button" onClick={() => navigate("/admin/predictions")} title="View all predictions" className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-cyan-300"><MoreHorizontal size={19} /></button></div>
            <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
              {dashboard.chart_data.map((item, index) => {
                const chartData = dashboard.chart_data || [];
                const max = Math.max(...chartData.map((entry) => entry.value ?? 0), 1);
                const height = item.value ? Math.max((item.value / max) * 100, 8) : 2;
                return <div key={item.label || index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full max-w-12 rounded-t-lg bg-cyan-400 transition hover:bg-cyan-300" style={{ height: `${height}%` }} /><span className="text-[11px] text-slate-400">{item.label || "-"}</span></div>;
              })}
            </div>
          </div>

          <div className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20"><h2 className="font-semibold text-white">Recent Activity</h2><div className="mt-5 space-y-5">{dashboard.recent_activity.map((item, index) => <div key={`${item.title || "-"}-${index}`} className="flex gap-3"><div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" /><div><p className="text-sm font-medium text-slate-300">{item.title || "-"}</p><p className="mt-1 text-xs text-slate-400">{item.time ? new Date(item.time).toLocaleString() : "-"}</p></div></div>)}{dashboard.recent_activity.length === 0 && <p className="text-sm text-slate-500">No recent activity.</p>}</div></div>
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
