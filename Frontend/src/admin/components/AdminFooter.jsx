import { Sparkles } from "lucide-react";

const AdminFooter = () => {
  return (
    <footer className="border-t border-[#243047] bg-[#0f172a] px-4 py-4 sm:px-6 lg:px-8">

      <div className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">

        <p>
          © {new Date().getFullYear()} PredictHub. All rights reserved.
        </p>

        <div className="flex items-center gap-1">
          <Sparkles size={13} />
          <span>AI Prediction Platform</span>
        </div>

      </div>

    </footer>
  );
};

export default AdminFooter;