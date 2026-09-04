import { useState } from "react";
import { ArrowLeft, Brain, CheckCircle2, Plus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { requestJson, saveModel } from "../../lib/api";

const iconOptions = [
  "Brain",
  "Database",
  "BarChart3",
  "Activity",
  "Cpu",
  "LineChart",
  "Image",
  "HeartPulse",
  "GraduationCap",
  "TrendingUp",
];

const iconColors = [
  "text-cyan-400",
  "text-blue-400",
  "text-purple-400",
  "text-green-400",
  "text-yellow-400",
  "text-red-400",
  "text-pink-400",
];

const iconBackgrounds = [
  "bg-cyan-500/10",
  "bg-blue-500/10",
  "bg-purple-500/10",
  "bg-green-500/10",
  "bg-yellow-500/10",
  "bg-red-500/10",
];

const borderColors = [
  "group-hover:border-cyan-500/50",
  "group-hover:border-blue-500/50",
  "group-hover:border-purple-500/50",
  "group-hover:border-green-500/50",
  "group-hover:border-yellow-500/50",
];

const initialForm = {
  title: "",
  description: "",
  category: "Data Science",
  route: "/prediction/data-analysis",
  icon: "Database",
  iconColor: "text-cyan-400",
  iconBg: "bg-cyan-500/10",
  borderColor: "group-hover:border-cyan-500/50",
  modelType: "Analytics",
  version: "v1.0",
  status: "Active",
  predictions: 0,
};

const fieldClass = "w-full rounded-lg border border-[#243047] bg-slate-900/70 px-3 py-2.5 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";
const labelClass = "mb-2 block text-sm font-medium text-slate-300";

const normalizeRoute = (value) => {
  const route = value.trim().replace(/^\/+/, "");
  return `/${route}`;
};

const CreateModel = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["Analytics", "Prediction"]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const addTag = (event) => {
    event.preventDefault();
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags((current) => [...current, tag]);
    }
    setTagInput("");
  };

  const validate = () => {
    const requiredFields = ["title", "description", "category", "route", "modelType", "version"];
    const nextErrors = {};
    requiredFields.forEach((field) => {
      if (!String(form[field]).trim()) {
        nextErrors[field] = "This field is required.";
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const route = normalizeRoute(form.route);
    const modelPayload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      route,
      icon: form.icon,
      model_type: form.modelType,
      icon_color: form.iconColor,
      icon_background: form.iconBg,
      border_color: form.borderColor,
      version: form.version.trim(),
      status: form.status,
      prediction_count: Number(form.predictions) || 0,
      tags,
    };

    try {
      const response = await requestJson("/admin/add_model", {
        method: "POST",
        body: JSON.stringify(modelPayload),
      });

      const model = {
        id: response.model_id || crypto.randomUUID(),
        title: form.title.trim(),
        name: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        icon: form.icon,
        iconColor: form.iconColor,
        iconBg: form.iconBg,
        borderColor: form.borderColor,
        route,
        tags,
        modelType: form.modelType,
        version: form.version.trim(),
        status: form.status,
        predictions: Number(form.predictions) || 0,
      };

      saveModel(model);
      navigate("/admin/models", {
        state: { success: `${model.title} was created successfully.` },
      });
    } catch (error) {
      setErrors({ submit: error.message || "Unable to create model." });
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-start gap-3">
        <Link to="/admin/models" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white" aria-label="Back to models">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add Model</h1>
          <p className="mt-1 text-sm text-slate-400">Create a prediction model for the PredictHub catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-[#243047] bg-[#111827] p-4 shadow-xl shadow-black/20 sm:p-6">
        <div className="mb-6 flex items-center gap-3 border-b border-[#243047] pb-5">
          <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300"><Brain size={21} /></div>
          <div>
            <h2 className="font-semibold text-white">Model Information</h2>
            <p className="text-xs text-slate-400">All required fields must be completed before creating the model.</p>
          </div>
        </div>

        {errors.submit && (
          <p role="alert" className="mb-5 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">
            {errors.submit}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className={labelClass}>Model Title</label>
            <input id="title" name="title" value={form.title} onChange={updateField} className={fieldClass} placeholder="Data Analytics Prediction" />
            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className={labelClass}>Description</label>
            <textarea id="description" name="description" value={form.description} onChange={updateField} rows="4" className={fieldClass} placeholder="Upload your dataset and explore AI-powered predictions and insights." />
            {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <select id="category" name="category" value={form.category} onChange={updateField} className={fieldClass}>
              {['Data Science', 'Machine Learning', 'Deep Learning', 'Classification', 'Regression', 'NLP', 'Computer Vision', 'Analytics'].map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="route" className={labelClass}>Route</label>
            <input id="route" name="route" value={form.route} onChange={updateField} onBlur={() => setForm((current) => ({ ...current, route: normalizeRoute(current.route) }))} className={fieldClass} placeholder="/prediction/data-analysis" />
            {errors.route && <p className="mt-1 text-xs text-red-400">{errors.route}</p>}
          </div>

          <div>
            <label htmlFor="icon" className={labelClass}>Icon</label>
            <select id="icon" name="icon" value={form.icon} onChange={updateField} className={fieldClass}>{iconOptions.map((option) => <option key={option}>{option}</option>)}</select>
          </div>

          <div>
            <label htmlFor="modelType" className={labelClass}>Model Type</label>
            <select id="modelType" name="modelType" value={form.modelType} onChange={updateField} className={fieldClass}>{['Classification', 'Regression', 'NLP', 'Computer Vision', 'Analytics'].map((option) => <option key={option}>{option}</option>)}</select>
            {errors.modelType && <p className="mt-1 text-xs text-red-400">{errors.modelType}</p>}
          </div>

          <div>
            <label htmlFor="iconColor" className={labelClass}>Icon Color</label>
            <select id="iconColor" name="iconColor" value={form.iconColor} onChange={updateField} className={fieldClass}>{iconColors.map((option) => <option key={option}>{option}</option>)}</select>
          </div>

          <div>
            <label htmlFor="iconBg" className={labelClass}>Icon Background</label>
            <select id="iconBg" name="iconBg" value={form.iconBg} onChange={updateField} className={fieldClass}>{iconBackgrounds.map((option) => <option key={option}>{option}</option>)}</select>
          </div>

          <div>
            <label htmlFor="borderColor" className={labelClass}>Border Color</label>
            <select id="borderColor" name="borderColor" value={form.borderColor} onChange={updateField} className={fieldClass}>{borderColors.map((option) => <option key={option}>{option}</option>)}</select>
          </div>

          <div>
            <label htmlFor="version" className={labelClass}>Version</label>
            <input id="version" name="version" value={form.version} onChange={updateField} className={fieldClass} placeholder="v1.0" />
            {errors.version && <p className="mt-1 text-xs text-red-400">{errors.version}</p>}
          </div>

          <div>
            <label htmlFor="status" className={labelClass}>Status</label>
            <select id="status" name="status" value={form.status} onChange={updateField} className={fieldClass}><option>Active</option><option>Inactive</option></select>
          </div>

          <div>
            <label htmlFor="predictions" className={labelClass}>Prediction Count</label>
            <input id="predictions" name="predictions" type="number" min="0" value={form.predictions} onChange={updateField} className={fieldClass} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="tagInput" className={labelClass}>Tags</label>
            <div className="flex gap-2">
              <input id="tagInput" value={tagInput} onChange={(event) => setTagInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addTag(event); }} className={fieldClass} placeholder="Type a tag and press Enter" />
              <button type="button" onClick={addTag} className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300" aria-label="Add tag"><Plus size={16} /></button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">{tag}<button type="button" onClick={() => setTags((current) => current.filter((item) => item !== tag))} aria-label={`Remove ${tag}`}><X size={13} /></button></span>)}
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#243047] pt-5 sm:flex-row sm:justify-end">
          <Link to="/admin/models" className="inline-flex justify-center rounded-lg border border-[#243047] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white">Cancel</Link>
          <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
            <CheckCircle2 size={17} />
            {submitting ? "Creating..." : "Create Model"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateModel;
