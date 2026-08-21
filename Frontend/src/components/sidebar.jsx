import React from "react";
import {
  Home,
  Info,
  SquareText,
  TrendingUpDown,
  FileText,
  PieChart,
  Settings,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: Home },
    { name: "About", icon: Info },
    { name: "Prediction", icon: TrendingUpDown },
    { name: "Analytics", icon: SquareText },
    { name: "Trending", icon: FileText },
    { name: "Community", icon: PieChart },
  ];

  const teams = [
    { name: "Placement Prediction", letter: "P" },
    { name: "Home Price", letter: "H" },
    { name: "Study hours", letter: "S" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] p-0 text-white">
      <div className="flex h-screen overflow-hidden  border border-[#263244] bg-[#0d1626]">

        {/* Sidebar */}
        <aside className="flex w-57.5 flex-col border-r border-[#263244]">

          {/* Logo */}
          <div className="flex h-16.75 items-center px-5">
            <div className="text-3xl font-bold text-indigo-500">
              PredictHub
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-3">

            {navItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={`mb-1 flex h-8 w-full items-center gap-3 rounded-md px-2 text-left text-sm ${
                    index === 0
                      ? "bg-[#1b2637] text-white"
                      : "text-[#9aa8bd] hover:bg-[#172235] hover:text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.6} />
                  <span>{item.name}</span>
                </button>
              );
            })}

          </nav>

          {/* Teams */}
          <div className="mt-7 px-5">
            <p className="mb-3 text-[11px] font-medium text-[#8b9ab1]">
              My Acitvity
            </p>

            <div className="space-y-3">
              {teams.map((team) => (
                <button
                  key={team.name}
                  className="flex items-center gap-3 text-sm text-[#aebbd0] hover:text-white"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md border border-[#334155] bg-[#172235] text-[10px]">
                    {team.letter}
                  </span>

                  <span>{team.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="mt-auto px-3 pb-4">
            <button className="flex h-8 w-full items-center gap-3 px-2 text-sm text-[#aebbd0] hover:text-white">
              <Settings size={18} strokeWidth={1.6} />
              <span>Settings</span>
            </button>
          </div>
        </aside>

        
      </div>
    </div>
  );
}

export default Sidebar;
