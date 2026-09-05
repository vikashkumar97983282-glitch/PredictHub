import { useEffect, useState } from "react";
import { Activity, Brain, TrendingUp, Users } from "lucide-react";
import Commet from "react-loading-indicators/Commet";
import { requestJson } from "../../lib/api";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadAnalytics = async () => {
      try {
        const data = await requestJson("/admin/analytics");
        if (isMounted) {
          setAnalytics(data);
          setError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || "Unable to load analytics.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = analytics ? [
    ["Users Growth", `${analytics.users_growth >= 0 ? "+" : ""}${analytics.users_growth}%`, Users],
    ["Prediction Growth", `${analytics.predictions_growth >= 0 ? "+" : ""}${analytics.predictions_growth}%`, TrendingUp],
    ["Model Usage", `${analytics.model_usage_growth >= 0 ? "+" : ""}${analytics.model_usage_growth}%`, Brain],
    ["System Activity", `${analytics.system_activity}%`, Activity],
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-slate-400">
          Analyze users, models and prediction performance.
        </p>
      </div>

      {isLoading && (
        <div className="flex min-h-52 items-center justify-center rounded-xl border border-[#243047] bg-[#111827]">
          <Commet color="#32cd32" size="large" text="Loading" textColor="" />
        </div>
      )}

      {!isLoading && error && (
        <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {!isLoading && !error && analytics && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(([title, value, Icon]) => (
              <div
                key={title}
                className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{title}</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">{value}</h2>
                  </div>
                  <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                    <Icon size={21} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20">
            <h2 className="font-semibold text-white">Model Usage</h2>
            <p className="mt-1 text-xs text-slate-400">
              Percentage of total prediction traffic
            </p>

            {analytics.model_usage.length > 0 ? (
              <div className="mt-6 space-y-5">
                {analytics.model_usage.map((model) => (
                  <div key={model.name}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium text-slate-300">{model.name}</span>
                      <span className="text-sm font-semibold text-slate-300">{model.percentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{ width: `${model.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm text-slate-400">No model usage data found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAnalytics;