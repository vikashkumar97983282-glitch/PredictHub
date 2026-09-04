import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Brain,
  BarChart3,
  Activity,
  Database,
  Cpu,
  LineChart,
  Image,
  HeartPulse,
  GraduationCap,
  TrendingUp,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";
import { requestJson } from "../../lib/api";

const iconOptions = {
  Brain,
  BarChart3,
  Activity,
  Database,
  Cpu,
  LineChart,
  Image,
  HeartPulse,
  GraduationCap,
  TrendingUp,
};

const AdminModels = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [updatingModelId, setUpdatingModelId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(location.state?.success || "");

  useEffect(() => {
    let isMounted = true;

    const loadModels = async () => {
      try {
        const response = await requestJson("/model/models");
        const databaseModels = Array.isArray(response.data)
          ? response.data.map((model) => ({
            ...model,
            id: model._id,
            name: model.title,
            type: model.model_type,
            predictions: model.prediction_count ?? 0,
          }))
          : [];

        if (isMounted) {
          setModels(databaseModels);
          setLoadError("");
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error.message || "Unable to load models.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadModels();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!location.state?.success) {
      return;
    }

    window.history.replaceState({}, document.title);
    const timeoutId = window.setTimeout(() => setSuccessMessage(""), 4000);

    return () => window.clearTimeout(timeoutId);
  }, [location.state]);

  const toggleModelStatus = async (model) => {
    const nextStatus = model.status === "Active" ? "Inactive" : "Active";
    setUpdatingModelId(model.id);
    setActionError("");

    try {
      const response = await requestJson(`/admin/models/${model.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });

      setModels((currentModels) =>
        currentModels.map((currentModel) =>
          currentModel.id === model.id
            ? { ...currentModel, status: response.status || nextStatus }
            : currentModel
        )
      );
      setOpenMenu(null);
    } catch (error) {
      setActionError(error.message || "Unable to update model status.");
    } finally {
      setUpdatingModelId(null);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Models
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage machine learning prediction models.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/models/create")}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
        >
          <span aria-hidden="true">+</span>
          Add Model
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {actionError && (
          <p role="alert" className="md:col-span-2 xl:col-span-3 text-sm text-red-300">
            {actionError}
          </p>
        )}

        {loading && (
          <p className="text-sm text-slate-400">Loading models...</p>
        )}

        {!loading && loadError && (
          <p role="alert" className="text-sm text-red-300">{loadError}</p>
        )}

        {!loading && !loadError && models.length === 0 && (
          <p className="text-sm text-slate-400">No models found.</p>
        )}

        {!loading && !loadError && models.map((model) => (
          <div
            key={model.name}
            className={`group rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20 transition ${model.borderColor || ""}`}
          >

            <div className="relative flex items-start justify-between">

              <div className={`rounded-xl p-3 ${model.iconBg || "bg-cyan-400/10"} ${model.iconColor || "text-cyan-300"}`}>
                {(() => {
                  const Icon = iconOptions[model.icon] || Brain;
                  return <Icon size={22} />;
                })()}
              </div>

              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === model.name ? null : model.name)}
                aria-label={`Actions for ${model.name}`}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
              >
                <MoreHorizontal size={18} />
              </button>

              {openMenu === model.name && (
                <div className="absolute right-0 top-10 z-20 w-40 rounded-lg border border-[#243047] bg-[#111827] p-1 shadow-xl shadow-black/30">
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/models/${model.id}/edit`)}
                    className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200"
                  >
                    Edit model
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleModelStatus(model)}
                    disabled={updatingModelId === model.id}
                    className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200"
                  >
                    {updatingModelId === model.id
                      ? "Saving..."
                      : model.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              )}

            </div>

            <h2 className="mt-5 font-semibold text-white">
              {model.name || model.title}
            </h2>

            {model.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-400">
                {model.description}
              </p>
            )}

            <div className="mt-2 flex items-center gap-2">

              <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">
                {model.category || model.modelType || model.type}
              </span>

              <span className="text-xs text-slate-400">
                {model.version}
              </span>

            </div>

            {model.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {model.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-slate-800/80 px-2 py-1 text-[11px] text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 flex items-center justify-between border-t border-[#243047] pt-4">

              <div>
                <p className="text-xs text-slate-500">
                  Predictions
                </p>

                <p className="mt-1 font-semibold text-slate-200">
                  {model.predictions}
                </p>
              </div>

              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  model.status === "Active"
                    ? "text-emerald-300"
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

      {successMessage && (
        <div role="status" className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
          {successMessage}
        </div>
      )}

    </div>
  );
};

export default AdminModels;