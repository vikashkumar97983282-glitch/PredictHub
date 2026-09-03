import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Save,
} from "lucide-react";
import { getStoredUser } from "../../lib/api";

const AdminSettings = () => {
  const currentUser = getStoredUser();

  const [notifications, setNotifications] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSave = () => {
    setSaveMessage("Changes saved successfully.");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Manage your admin account and platform preferences.
        </p>
      </div>

      {/* Profile */}
      <div className="rounded-xl border border-[#243047] bg-[#111827] shadow-xl shadow-black/20">

        <div className="border-b border-[#243047] p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
              <User size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Admin Profile
              </h2>

              <p className="text-xs text-slate-400">
                Update your account information.
              </p>
            </div>

          </div>

        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Name
            </label>

            <input
              defaultValue={currentUser?.name || "Admin"}
              className="w-full rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              defaultValue={currentUser?.email || ""}
              type="email"
              className="w-full rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

        </div>

      </div>

      {/* Security */}
      <div className="rounded-xl border border-[#243047] bg-[#111827] shadow-xl shadow-black/20">

        <div className="border-b border-[#243047] p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
              <Shield size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Security
              </h2>

              <p className="text-xs text-slate-400">
                Manage password and security settings.
              </p>
            </div>

          </div>

        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

        </div>

      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-[#243047] bg-[#111827] shadow-xl shadow-black/20">

        <div className="flex items-start justify-between gap-4 p-5 sm:items-center">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
              <Bell size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Notifications
              </h2>

              <p className="text-xs text-slate-400">
                Receive admin notifications.
              </p>
            </div>

          </div>

          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative h-6 w-11 rounded-full transition ${
              notifications
                ? "bg-cyan-400"
                : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                notifications
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>

        </div>

      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
        >
          <Save size={17} />
          Save Changes
        </button>

        {saveMessage && (
          <p className="text-center text-xs font-medium text-emerald-400 sm:text-right">
            {saveMessage}
          </p>
        )}

      </div>

    </div>
  );
};

export default AdminSettings;