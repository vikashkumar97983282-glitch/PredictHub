import { useEffect, useState } from "react";
import { Activity, Brain, RefreshCw, TrendingUp, Users } from "lucide-react";
import { requestJson } from "../../lib/api";

const EMPTY_ANALYTICS = {
  users_growth: 0,
  predictions_growth: 0,
  model_usage_growth: 0,
  system_activity: 0,
  model_usage: [],
};

const safeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const normalizeAnalytics = (data) => ({
  users_growth: safeNumber(data?.users_growth),
  predictions_growth: safeNumber(data?.predictions_growth),
  model_usage_growth: safeNumber(data?.model_usage_growth),
  system_activity: safeNumber(data?.system_activity),
  model_usage: Array.isArray(data?.model_usage)
    ? data.model_usage.map((model, index) => ({
      name: model?.name || "-",
      percentage: safeNumber(model?.percentage),
      id: model?.name || `model-${index}`,
    }))
    : [],
});

const EmptyState = ({ title, description }) => (
  <div className="flex min-h-40 flex-col items-center justify-center px-6 py-8 text-center">
    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
      <Activity size={21} />
    </div>
    <p className="text-sm font-medium text-slate-300">{title}</p>
    <p className="mt-1 max-w-sm text-xs text-slate-500">{description}</p>
  </div>
);

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(EMPTY_ANALYTICS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      try {
        const data = await requestJson("/admin/analytics");
        setAnalytics(normalizeAnalytics(data));
        setError("");
      } catch (requestError) {
        setAnalytics(EMPTY_ANALYTICS);
        setError(requestError.message || "Analytics data is currently unavailable.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, [reloadToken]);

  const stats = [
    ["Users Growth", `${analytics.users_growth >= 0 ? "+" : ""}${analytics.users_growth}%`, Users],
    ["Prediction Growth", `${analytics.predictions_growth >= 0 ? "+" : ""}${analytics.predictions_growth}%`, TrendingUp],
    ["Model Usage", `${analytics.model_usage_growth >= 0 ? "+" : ""}${analytics.model_usage_growth}%`, Brain],
    ["System Activity", `${analytics.system_activity}%`, Activity],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="mt-1 text-sm text-slate-400">Analyze users, models and prediction performance.</p>
        </div>
        {error && <div className="flex items-center gap-2 text-xs text-amber-300"><span>Analytics data is currently unavailable.</span><button type="button" onClick={() => setReloadToken((value) => value + 1)} className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-amber-400/10"><RefreshCw size={13} />Retry</button></div>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([title, value, Icon]) => (
          <div key={title} className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-slate-400">{title}</p>{isLoading ? <div className="mt-3 h-8 w-24 animate-pulse rounded-md bg-slate-700/70" /> : <h2 className="mt-2 text-2xl font-bold text-white">{value}</h2>}</div>
              <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300"><Icon size={21} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20">
        <h2 className="font-semibold text-white">Model Usage</h2>
        <p className="mt-1 text-xs text-slate-400">Percentage of total prediction traffic</p>
        <div className="mt-6 min-h-40">
          {isLoading ? <div className="space-y-5 py-2">{[1, 2, 3].map((item) => <div key={item} className="space-y-2"><div className="h-4 w-full animate-pulse rounded bg-slate-700/70" /><div className="h-2 w-full animate-pulse rounded bg-slate-800" /></div>)}</div> : analytics.model_usage.length > 0 ? <div className="space-y-5">{analytics.model_usage.map((model) => <div key={model.id}><div className="mb-2 flex justify-between"><span className="text-sm font-medium text-slate-300">{model.name}</span><span className="text-sm font-semibold text-slate-300">{model.percentage}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${model.percentage}%` }} /></div></div>)}</div> : <EmptyState title="No model usage yet" description="Model activity will appear here after predictions are made." />}
        </div>
      </div>

    </div>
  );
};

export default AdminAnalytics;