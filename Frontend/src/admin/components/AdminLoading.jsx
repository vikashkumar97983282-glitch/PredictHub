const AdminLoading = ({ label = "Loading" }) => {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-4 rounded-xl border border-[#243047] bg-[#111827] px-6 py-10">
      <span className="admin-loader" aria-hidden="true" />
      <p className="text-sm font-medium tracking-wide text-slate-400">{label}</p>
    </div>
  );
};

export default AdminLoading;