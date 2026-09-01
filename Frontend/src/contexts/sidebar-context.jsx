import { createContext, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const value = {
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar: () => setIsSidebarOpen((previous) => !previous),
    toggleMobileMenu: () => setIsMobileMenuOpen((previous) => !previous),
    closeMobileMenu: () => setIsMobileMenuOpen(false),
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarContext };
