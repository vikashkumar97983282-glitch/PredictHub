import { useState } from "react";
import {
  Brain,
  Plus,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";

const AdminModels = () => {

  const [models, setModels] = useState([
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
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [newModel, setNewModel] = useState({ name: "", type: "Regression" });

  const handleAddModel = (event) => {
    event.preventDefault();
    setModels((currentModels) => [
      ...currentModels,
      {
        name: newModel.name,
        type: newModel.type,
        version: "v1.0",
        status: "Active",
        predictions: "0",
      },
    ]);
    setNewModel({ name: "", type: "Regression" });
    setShowAddForm(false);
  };

  const toggleModelStatus = (modelName) => {
    setModels((currentModels) =>
      currentModels.map((model) =>
        model.name === modelName
          ? { ...model, status: model.status === "Active" ? "Inactive" : "Active" }
          : model
      )
    );
    setOpenMenu(null);
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
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
        >
          <Plus size={18} />
          Add Model
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {models.map((model) => (
          <div
            key={model.name}
            className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20"
          >

            <div className="relative flex items-start justify-between">

              <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                <Brain size={22} />
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
                    onClick={() => toggleModelStatus(model.name)}
                    className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200"
                  >
                    {model.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              )}

            </div>

            <h2 className="mt-5 font-semibold text-white">
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

      {showAddForm && (
        <form
          onSubmit={handleAddModel}
          className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              value={newModel.name}
              onChange={(event) => setNewModel({ ...newModel, name: event.target.value })}
              placeholder="Model name"
              className="rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
            <select
              value={newModel.type}
              onChange={(event) => setNewModel({ ...newModel, type: event.target.value })}
              className="rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-400"
            >
              <option>Regression</option>
              <option>Classification</option>
            </select>
          </div>
          <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setShowAddForm(false)} className="rounded-lg px-4 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white">Cancel</button>
            <button type="submit" className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Add Model</button>
          </div>
        </form>
      )}

    </div>
  );
};

export default AdminModels;