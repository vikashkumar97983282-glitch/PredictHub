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
  Wrench,
  Clock3,
} from "lucide-react";
import { requestJson } from "../../lib/api";
import Commet from "react-loading-indicators/Commet";

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

const statusOptions = [
  {
    value: "Active",
    label: "Active",
    icon: CheckCircle2,
    color:
      "text-emerald-300 hover:bg-emerald-400/10 hover:text-emerald-200",
    dot: "bg-emerald-400",
  },
  {
    value: "Maintenance",
    label: "Maintenance",
    icon: Wrench,
    color: "text-amber-300 hover:bg-amber-400/10 hover:text-amber-200",
    dot: "bg-amber-400",
  },
  {
    value: "Coming Soon",
    label: "Coming Soon",
    icon: Clock3,
    color: "text-violet-300 hover:bg-violet-400/10 hover:text-violet-200",
    dot: "bg-violet-400",
  },
];

const getStatusConfig = (status) => {
  switch (status) {
    case "Active":
      return {
        icon: CheckCircle2,
        text: "text-emerald-300",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
        dot: "bg-emerald-400",
      };

    case "Maintenance":
      return {
        icon: Wrench,
        text: "text-amber-300",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20",
        dot: "bg-amber-400",
      };

    case "Coming Soon":
      return {
        icon: Clock3,
        text: "text-violet-300",
        bg: "bg-violet-400/10",
        border: "border-violet-400/20",
        dot: "bg-violet-400",
      };

    default:
      return {
        icon: CheckCircle2,
        text: "text-slate-400",
        bg: "bg-slate-800",
        border: "border-slate-700",
        dot: "bg-slate-500",
      };
  }
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
  const [successMessage, setSuccessMessage] = useState(
    location.state?.success || ""
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-model-actions]")) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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

    const timeoutId = window.setTimeout(
      () => setSuccessMessage(""),
      4000
    );

    return () => window.clearTimeout(timeoutId);
  }, [location.state]);

  // UPDATED:
  // Allows Active, Maintenance and Coming Soon
  const updateModelStatus = async (model, nextStatus) => {
    setUpdatingModelId(model.id);
    setActionError("");

    try {
      const response = await requestJson(
        `/admin/models/${model.id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      setModels((currentModels) =>
        currentModels.map((currentModel) =>
          currentModel.id === model.id
            ? {
                ...currentModel,
                status: response.status || nextStatus,
              }
            : currentModel
        )
      );

      setOpenMenu(null);
    } catch (error) {
      setActionError(
        error.message || "Unable to update model status."
      );
    } finally {
      setUpdatingModelId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
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
        {/* ACTION ERROR */}
        {actionError && (
          <p
            role="alert"
            className="text-sm text-red-300 md:col-span-2 xl:col-span-3"
          >
            {actionError}
          </p>
        )}

        {/* LOADING */}
        {loading && (
          <div className="col-span-full flex min-h-40 items-center justify-center">
            <Commet
              color="#32cd32"
              size="large"
              text="Loading"
              textColor=""
            />
          </div>
        )}

        {/* LOAD ERROR */}
        {loadError && (
          <p
            role="alert"
            className="text-sm text-amber-300 md:col-span-2 xl:col-span-3"
          >
            Models unavailable. Showing default values.
          </p>
        )}

        {/* EMPTY */}
        {!loading && models.length === 0 && (
          <p className="text-sm text-slate-400">
            No models found.
          </p>
        )}

        {/* MODELS */}
        {models.map((model) => {
          const statusConfig = getStatusConfig(model.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={model.name}
              className={`group rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20 transition ${model.borderColor || ""}`}
            >
              {/* TOP */}
              <div
                className="relative flex items-start justify-between"
                data-model-actions
              >
                <div
                  className={`rounded-xl p-3 ${
                    model.iconBg || "bg-cyan-400/10"
                  } ${model.iconColor || "text-cyan-300"}`}
                >
                  {(() => {
                    const Icon =
                      iconOptions[model.icon] || Brain;

                    return <Icon size={22} />;
                  })()}
                </div>

                {/* THREE-DOT MENU */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu(
                      openMenu === model.name
                        ? null
                        : model.name
                    )
                  }
                  aria-label={`Actions for ${model.name}`}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
                >
                  <MoreHorizontal size={18} />
                </button>

                {/* ACTION MENU */}
                {openMenu === model.name && (
                  <div className="absolute right-0 top-11 z-30 w-52 overflow-hidden rounded-xl border border-[#26334a] bg-[#0d1421] p-1.5 shadow-2xl shadow-black/50">
                    {/* MENU HEADER */}
                    <div className="px-3 pb-2 pt-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Model Actions
                      </p>
                    </div>

                    {/* EDIT MODEL */}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/admin/models/${model.id}/edit`
                        )
                      }
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-300">
                        <MoreHorizontal size={14} />
                      </div>

                      <div>
                        <p className="font-medium">
                          Edit Model
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-500">
                          Modify model details
                        </p>
                      </div>
                    </button>

                    {/* DIVIDER */}
                    <div className="my-1.5 border-t border-[#243047]" />

                    {/* STATUS LABEL */}
                    <div className="px-3 pb-1.5 pt-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Change Status
                      </p>
                    </div>

                    {/* STATUS OPTIONS */}
                    {statusOptions.map((status) => {
                      const Icon = status.icon;
                      const isSelected =
                        model.status === status.value;
                      const isUpdating =
                        updatingModelId === model.id;

                      return (
                        <button
                          key={status.value}
                          type="button"
                          onClick={() =>
                            updateModelStatus(
                              model,
                              status.value
                            )
                          }
                          disabled={isUpdating}
                          className={`group/status flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition ${
                            isSelected
                              ? `${status.color} bg-slate-800/80`
                              : `${status.color}`
                          } ${
                            isUpdating
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                        >
                          {/* ICON */}
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-md ${
                              isSelected
                                ? "bg-white/5"
                                : "bg-slate-800/70"
                            }`}
                          >
                            <Icon size={14} />
                          </div>

                          {/* TEXT */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {status.label}
                              </span>

                              {isSelected && (
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                                />
                              )}
                            </div>
                          </div>

                          {/* CHECK */}
                          {isSelected && (
                            <CheckCircle2
                              size={14}
                              className="shrink-0"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* MODEL NAME */}
              <h2 className="mt-5 font-semibold text-white">
                {model.name || model.title || "-"}
              </h2>

              {/* DESCRIPTION */}
              {model.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-400">
                  {model.description}
                </p>
              )}

              {/* CATEGORY + VERSION */}
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">
                  {model.category ||
                    model.modelType ||
                    model.type ||
                    "-"}
                </span>

                <span className="text-xs text-slate-400">
                  {model.version || "-"}
                </span>
              </div>

              {/* TAGS */}
              {model.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-800/80 px-2 py-1 text-[11px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* FOOTER */}
              <div className="mt-5 flex items-center justify-between border-t border-[#243047] pt-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Predictions
                  </p>

                  <p className="mt-1 font-semibold text-slate-200">
                    {model.predictions ?? 0}
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-semibold ${statusConfig.text} ${statusConfig.bg} ${statusConfig.border}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot} ${
                      model.status === "Active"
                        ? "animate-pulse"
                        : ""
                    }`}
                  />

                  <StatusIcon size={13} />

                  {model.status || "-"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div
          role="status"
          className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
        >
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AdminModels;