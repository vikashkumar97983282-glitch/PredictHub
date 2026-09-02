import React from "react";

function AdminFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="flex min-h-14 flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-500 sm:flex-row sm:px-6">

        <p>
          © {new Date().getFullYear()} PredictHub. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <span>Admin Panel</span>

          <span className="h-1 w-1 rounded-full bg-gray-300" />

          <span className="text-green-600">
            System Operational
          </span>
        </div>

      </div>
    </footer>
  );
}

export default AdminFooter;