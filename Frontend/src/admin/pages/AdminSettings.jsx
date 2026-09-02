import React, { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Save,
} from "lucide-react";

const AdminSettings = () => {

  const [notifications, setNotifications] = useState(true);

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your admin account and platform preferences.
        </p>
      </div>

      {/* Profile */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <User size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
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
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              defaultValue="Admin"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              defaultValue="admin@predicthub.com"
              type="email"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

        </div>

      </div>

      {/* Security */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Shield size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
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
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

        </div>

      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Bell size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
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
                ? "bg-blue-600"
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

      <div className="flex justify-end">

        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          <Save size={17} />
          Save Changes
        </button>

      </div>

    </div>
  );
};

export default AdminSettings;