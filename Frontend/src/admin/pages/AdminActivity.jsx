import React, { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";

const activityEvents = [
  {
    id: 1,
    user: "Rahul Kumar",
    action: "Completed a house price prediction",
    detail: "House Price model",
    time: "2 min ago",
    status: "Success",
  },
  {
    id: 2,
    user: "Priya Sharma",
    action: "Signed in to PredictHub",
    detail: "New session started",
    time: "10 min ago",
    status: "Success",
  },
  {
    id: 3,
    user: "Amit Singh",
    action: "Updated account settings",
    detail: "Profile information changed",
    time: "24 min ago",
    status: "Success",
  },
  {
    id: 4,
    user: "Neha Gupta",
    action: "Prediction request failed",
    detail: "Student Performance model",
    time: "32 min ago",
    status: "Review",
  },
  {
    id: 5,
    user: "Rahul Kumar",
    action: "Started a new session",
    detail: "Chrome on Windows",
    time: "1 hour ago",
    status: "Success",
  },
];

const monitoredUsers = [
  ["Rahul Kumar", "Active now", "12 predictions", "Online"],
  ["Priya Sharma", "Active 10 min ago", "8 predictions", "Online"],
  ["Amit Singh", "Active 24 min ago", "6 predictions", "Online"],
  ["Neha Gupta", "Active 32 min ago", "3 predictions", "Away"],
];

const AdminActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return activityEvents;
    }

    return activityEvents.filter((event) =>
      [event.user, event.action, event.detail, event.status]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          User monitoring
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Activity Center
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Monitor sessions, predictions, and recent account activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Active users", "3", Users, "text-cyan-300", "bg-cyan-400/10"],
          ["Sessions today", "128", Activity, "text-emerald-300", "bg-emerald-400/10"],
          ["Predictions today", "1,284", CheckCircle2, "text-violet-300", "bg-violet-400/10"],
          ["Needs review", "4", ShieldCheck, "text-amber-300", "bg-amber-400/10"],
        ].map(([label, value, Icon, color, background]) => (
          <div key={label} className="rounded-2xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-bold text-white">{value}</p>
              </div>
              <div className={`rounded-xl p-3 ${background} ${color}`}>
                <Icon size={21} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-[#243047] bg-[#111827] shadow-xl shadow-black/20">
          <div className="flex flex-col gap-4 border-b border-[#243047] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-white">Recent activity</h2>
              <p className="mt-1 text-xs text-slate-500">The latest events across your users.</p>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Filter activity"
                className="h-10 w-full rounded-lg border border-[#243047] bg-slate-900/70 pl-9 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <div className="divide-y divide-[#243047]">
            {filteredEvents.map((event) => (
              <div key={event.id} className="flex gap-3 p-5 transition hover:bg-slate-800/30 sm:gap-4">
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${event.status === "Success" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>
                  {event.status === "Success" ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-slate-200">{event.user}</p>
                    <span className="flex items-center gap-1 text-xs text-slate-500"><Clock3 size={13} />{event.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{event.action}</p>
                  <p className="mt-1 text-xs text-slate-600">{event.detail}</p>
                </div>
              </div>
            ))}
            {filteredEvents.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No activity matches your search.</p>}
          </div>
        </section>

        <section className="rounded-2xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">User presence</h2>
              <p className="mt-1 text-xs text-slate-500">Live status from recent sessions.</p>
            </div>
            <UserPlus size={19} className="text-cyan-300" />
          </div>

          <div className="mt-5 space-y-3">
            {monitoredUsers.map(([name, lastSeen, predictions, status]) => (
              <div key={name} className="rounded-xl border border-[#243047] bg-slate-900/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-300">{name.charAt(0)}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-200">{name}</p>
                      <p className="mt-1 truncate text-xs text-slate-500">{lastSeen}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold ${status === "Online" ? "text-emerald-300" : "text-slate-500"}`}>
                    <span className={`h-2 w-2 rounded-full ${status === "Online" ? "bg-emerald-400" : "bg-slate-600"}`} />
                    {status}
                  </span>
                </div>
                <p className="mt-3 border-t border-[#243047] pt-3 text-xs text-slate-500">{predictions}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminActivity;
