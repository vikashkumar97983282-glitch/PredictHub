import React, { useState } from "react";

import AdminHeader from "../components/adminHeader";
import AdminSidebar from "../components/adminSidebar";
import AdminFooter from "../components/adminFooter";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          SIDEBAR
      ========================== */}
      <AdminSidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() =>
          setSidebarCollapsed((previous) => !previous)
        }
      />

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <div
        className={`
          flex min-h-screen flex-col
          transition-all duration-300
          ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >

        {/* =========================
            HEADER
        ========================== */}
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* =========================
            PAGE CONTENT
        ========================== */}
        <main className="flex-1">
          {children}
        </main>

        {/* =========================
            FOOTER
        ========================== */}
        <AdminFooter />

      </div>
    </div>
  );
}

export default AdminLayout;