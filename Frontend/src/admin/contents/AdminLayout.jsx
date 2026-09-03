import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooter from "../components/AdminFooter";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 1024
  );

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100 [background-image:radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_32rem)]">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <div
        className={`min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.06),_transparent_32rem)] transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="min-h-[calc(100vh-128px)] p-3 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <AdminFooter />
      </div>

    </div>
  );
};

export default AdminLayout;