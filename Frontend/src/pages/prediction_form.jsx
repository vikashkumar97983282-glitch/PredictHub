import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, Brain, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Commet from "react-loading-indicators/Commet";
import { API_BASE_URL, getStoredToken } from "../lib/api";

const inputClassName = "box-border block w-full rounded-xl border border-slate-800 bg-[#070b14] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 disabled:cursor-not-allowed disabled:opacity-60";
const createInitialFormData = (fields = []) => fields.reduce((data, field) => ({ ...data, [field.name]: field.type === "checkbox" ? false : "" }), {});

export const parsePredictionResponse = (response) => {
  const data = response?.data;
  const value = (data && typeof data === "object" ? data.prediction ?? data.result ?? data.value : data) ?? response?.prediction ?? response?.result ?? response?.value;
  if (value === undefined || value === null) throw new Error("Prediction value was not returned by the server.");
  const numericValue = Number(value);
  return {
    value: Number.isFinite(numericValue) ? numericValue : value,
    message: response?.message || "Prediction completed successfully.",
    modelName: data?.model_name || data?.model || response?.model_name,
    predictionId: response?.prediction_id || data?.prediction_id,
    status: response?.status || data?.status || "Completed",
  };
};

function Form() {
  const navigate = useNavigate();
  const { modelKey } = useParams();
  const [models, setModels] = useState([]);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [selectedModelKey, setSelectedModelKey] = useState("");
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [predictionInfo, setPredictionInfo] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const selectedModel = useMemo(() => models.find((model) => model.key === selectedModelKey) || null, [models, selectedModelKey]);

  useEffect(() => {
    let active = true;
    const fetchModels = async () => {
      try {
        const token = getStoredToken();
        const response = await fetch(`${API_BASE_URL}/prediction/models`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.detail || data?.message || "Unable to load prediction models.");
        if (active) {
          const availableModels = Array.isArray(data?.models) ? data.models : [];
          const routeKey = String(modelKey || "").replace(/-/g, "_");
          const routeModel = availableModels.find((model) => model.key === routeKey);

          setModels(availableModels);
          if (routeModel) {
            setSelectedModelKey(routeModel.key);
            setFormData(createInitialFormData(routeModel.fields));
          } else if (modelKey) {
            // A card without a configured form is not ready for predictions.
            // Send the user to the existing Coming Soon experience instead of
            // showing an empty form with a disabled Predict button.
            navigate(`/prediction/coming-soon/${modelKey}`, {
              replace: true,
            });
          }
        }
      } catch (requestError) {
        if (active) setError(requestError.message || "Unable to load prediction models.");
      } finally { if (active) setModelsLoading(false); }
    };
    fetchModels();
    return () => { active = false; };
  }, [modelKey]);

  const clearResultState = () => { setError(""); setSuccessMessage(""); setPrediction(null); setPredictionInfo(null); };
  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setFieldErrors((current) => ({ ...current, [name]: "" })); clearResultState();
  };
  const validateForm = () => {
    const errors = {};
    (selectedModel?.fields || []).forEach((field) => {
      const value = formData[field.name];
      const empty = value === "" || value === undefined || value === null || (field.type === "checkbox" && !value);
      if (field.required && empty) { errors[field.name] = `${field.label} is required.`; return; }
      if (value === "" || value === undefined || value === null) return;
      if (field.type === "number") {
        const number = Number(value);
        if (!Number.isFinite(number)) errors[field.name] = `Enter a valid ${field.label}.`;
        else if (field.min !== undefined && number < field.min) errors[field.name] = `${field.label} must be at least ${field.min}.`;
        else if (field.max !== undefined && number > field.max) errors[field.name] = `${field.label} must be at most ${field.max}.`;
      }
      if (field.type === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) errors[field.name] = "Enter a valid email address.";
    });
    setFieldErrors(errors); return Object.keys(errors).length === 0;
  };
  const buildPayload = () => (selectedModel?.fields || []).reduce((payload, field) => ({ ...payload, [field.name]: field.type === "number" && formData[field.name] !== "" ? Number(formData[field.name]) : formData[field.name] }), {});
  const handleSubmit = async (event) => {
    event.preventDefault(); clearResultState();
    if (!selectedModel) { setError("Please select a prediction model."); return; }
    if (!validateForm()) return;
    try {
      setLoading(true);
      const token = getStoredToken();
      const response = await fetch(`${API_BASE_URL}${selectedModel.endpoint}`, { method: selectedModel.method || "POST", headers: { "Content-Type": "application/json", Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(buildPayload()) });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json") ? await response.json() : {};
      if (!response.ok) {
        const fallback = { 400: "Please check the entered values and try again.", 401: "Unauthorized. Please login again.", 403: "This prediction model is currently unavailable.", 404: "Prediction endpoint or model not found.", 500: "Prediction server error. Please try again." };
        throw new Error(result?.detail || result?.message || fallback[response.status] || "Unable to generate prediction.");
      }
      const parsed = parsePredictionResponse(result);
      setPrediction(parsed.value); setPredictionInfo({ ...parsed, modelName: parsed.modelName || selectedModel.model_name }); setSuccessMessage(parsed.message);
    } catch (requestError) { setError(requestError.message || "Network error. Please check your connection and try again."); }
    finally { setLoading(false); }
  };
  const renderField = (field) => {
    const common = { id: field.name, name: field.name, required: field.required, disabled: loading, onChange: handleInputChange };
    const options = Array.isArray(field.options) ? field.options : [];
    if (field.type === "select") return <select {...common} value={formData[field.name] ?? ""} className={inputClassName}><option value="">Select {field.label}</option>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>;
    if (field.type === "radio") return <div className="space-y-2">{options.map((option) => <label key={option.value} className="flex items-center gap-2 text-sm text-slate-300"><input {...common} type="radio" value={option.value} checked={formData[field.name] === option.value} className="accent-purple-500" />{option.label}</label>)}</div>;
    if (field.type === "checkbox") return <label className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#070b14] px-4 py-3.5 text-sm text-slate-300"><input {...common} type="checkbox" checked={Boolean(formData[field.name])} className="h-4 w-4 accent-purple-500" />{field.placeholder || field.label}</label>;
    return <input {...common} type={field.type || "text"} value={formData[field.name] ?? ""} placeholder={field.placeholder || `Enter ${field.label}`} min={field.min} max={field.max} step={field.step} className={inputClassName} />;
  };
  const predictionText = typeof prediction === "object" ? JSON.stringify(prediction) : String(prediction ?? "");

  return <div className="fixed inset-0 z-50 w-full overflow-y-auto overflow-x-hidden bg-[#070b14] text-white">
    <div className="pointer-events-none fixed inset-0 overflow-hidden"><div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" /><div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-purple-600/10 blur-[100px]" /><div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[40px_40px]" /></div>
    <main className="relative z-10 min-h-screen w-full"><div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div><button type="button" onClick={() => navigate("/prediction")} className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#101827] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:border-slate-700 hover:bg-[#151f31] hover:text-white"><ArrowLeft size={17} />Back to Models</button></div>
      <section className="mt-8 text-center sm:mt-10"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-lg shadow-purple-500/10 sm:h-16 sm:w-16"><Brain size={30} /></div><div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-purple-400"><Sparkles size={13} />Machine Learning</div><h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{selectedModel?.model_name || "Prediction"}</h1><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">{selectedModel?.description || "Select a model and enter its required information to generate a prediction."}</p></section>
      <section className="mx-auto mt-8 w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#101827]/95 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:mt-10 sm:p-8"><form onSubmit={handleSubmit}>
        {modelsLoading && <div className="mb-5 text-center text-sm text-slate-400">Loading model form...</div>}
        {selectedModel?.fields?.map((field) => <div key={field.name} className="mb-5"><label htmlFor={field.name} className="mb-2 block text-sm font-semibold text-slate-200">{field.type !== "checkbox" && field.type !== "radio" ? field.label : null}{field.required && field.type !== "checkbox" && field.type !== "radio" ? <span className="ml-1 text-purple-400">*</span> : null}</label>{renderField(field)}{fieldErrors[field.name] && <p className="mt-2 text-xs text-rose-400">{fieldErrors[field.name]}</p>}</div>)}
        {error && <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-300"><AlertCircle size={18} className="mt-0.5 shrink-0" />{error}</div>}
        <button type="submit" disabled={loading || modelsLoading || !selectedModel} className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-500 hover:shadow-purple-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">{loading ? <Commet color="#32cd32" size="small" text="Loading" textColor="" /> : <><Brain size={19} />Predict</>}</button>
      </form>
      {prediction !== null && <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 sm:p-6"><div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><CheckCircle size={21} /></div><div><p className="text-sm text-slate-400">Prediction Result</p><h2 className="text-lg font-bold text-white sm:text-xl">{successMessage}</h2></div></div><div className="mt-5 rounded-xl border border-slate-800 bg-[#070b14] p-5 text-center"><p className="text-xs uppercase tracking-wider text-slate-500">Model Output</p><p className="mt-3 text-4xl font-bold text-emerald-400">{predictionText}</p></div><div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"><div className="rounded-xl border border-slate-800 bg-[#070b14] p-3"><p className="text-xs text-slate-500">Model</p><p className="mt-1 text-sm font-medium text-slate-200">{predictionInfo?.modelName}</p></div><div className="rounded-xl border border-slate-800 bg-[#070b14] p-3"><p className="text-xs text-slate-500">Status</p><p className="mt-1 text-sm font-medium text-emerald-400">{predictionInfo?.status}</p></div>{predictionInfo?.predictionId && <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3 sm:col-span-2"><p className="text-xs text-slate-500">Prediction ID</p><p className="mt-1 break-all text-xs font-medium text-slate-400">{predictionInfo.predictionId}</p></div>}</div></div>}
      </section><div className="h-20" /></div></main>
  </div>;
}

export default Form;
