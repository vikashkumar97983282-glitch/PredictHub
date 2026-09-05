import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, Search, ShieldCheck, Users, XCircle } from "lucide-react";
import { requestJson } from "../../lib/api";

const AdminActivity = () => {
  const [data, setData] = useState({ active_users: 0, sessions_today: 0, predictions_today: 0, needs_review: 0, events: [], users: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    requestJson("/admin/activity")
      .then(setData)
      .catch((requestError) => setError(requestError.message));
  }, []);

  const filteredEvents = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();
    return (data?.events || []).filter((event) => !value || [event.user, event.action, event.detail, event.status].join(" ").toLowerCase().includes(value));
  }, [data, searchTerm]);

  return (
    <div className="space-y-6">
      <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">User monitoring</p><h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Activity Center</h1><p className="mt-1 text-sm text-slate-400">Monitor sessions, predictions, and recent account activity.</p></div>
      {error && <p role="alert" className="rounded-lg border border-[#243047] bg-[#111827] px-4 py-3 text-sm text-amber-300">Activity unavailable. Showing default values.</p>}
      <>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Active users", data.active_users ?? 0, Users], ["Sessions today", data.sessions_today ?? 0, Users], ["Predictions today", data.predictions_today ?? 0, CheckCircle2], ["Needs review", data.needs_review ?? 0, ShieldCheck]].map(([label, value, Icon]) => <div key={label} className="rounded-2xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-white">{value}</p></div><div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300"><Icon size={21} /></div></div></div>)}</div>
        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]"><section className="rounded-2xl border border-[#243047] bg-[#111827] shadow-xl shadow-black/20"><div className="flex flex-col gap-4 border-b border-[#243047] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold text-white">Recent activity</h2><p className="mt-1 text-xs text-slate-500">The latest events across your users.</p></div><div className="relative w-full sm:max-w-xs"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Filter activity" className="h-10 w-full rounded-lg border border-[#243047] bg-slate-900/70 pl-9 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" /></div></div><div className="divide-y divide-[#243047]">{filteredEvents.map((event) => <div key={event.id} className="flex gap-3 p-5"><div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${event.status === "Completed" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>{event.status === "Completed" ? <CheckCircle2 size={17} /> : <XCircle size={17} />}</div><div className="min-w-0 flex-1"><div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm font-medium text-slate-200">{event.user}</p><span className="flex items-center gap-1 text-xs text-slate-500"><Clock3 size={13} />{event.time ? new Date(event.time).toLocaleString() : "Recently"}</span></div><p className="mt-1 text-sm text-slate-400">{event.action}</p><p className="mt-1 text-xs text-slate-500">{event.detail}</p></div></div>)}{filteredEvents.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No activity matches your search.</p>}</div></section><section className="rounded-2xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20"><h2 className="font-semibold text-white">User presence</h2><p className="mt-1 text-xs text-slate-500">Current account status.</p><div className="mt-5 space-y-3">{data.users.map((item) => <div key={item.name} className="flex items-center justify-between rounded-xl border border-[#243047] bg-slate-900/50 p-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-300">{item.name.charAt(0)}</div><span className="text-sm text-slate-200">{item.name}</span></div><span className="text-xs text-emerald-300">{item.status}</span></div>)}</div></section></div>
      </>
    </div>
  );
};

export default AdminActivity;
