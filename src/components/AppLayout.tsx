import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Brain,
  Bell,
  FileBarChart,
  LogOut
} from "lucide-react";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const nav = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Digital Twin", icon: Building2, path: "/digital-twin" },
    { label: "AI Insights", icon: Brain, path: "/ai-insights" },
    { label: "Alerts", icon: Bell, path: "/alerts" },
    { label: "Reports", icon: FileBarChart, path: "/reports" },
  ];

  return (
    <div className="flex h-screen bg-[#0B0F0C] text-gray-200">

      {/* Sidebar */}

      <aside className="w-64 bg-[#111716] border-r border-[#1e2b26] flex flex-col">

        <div className="p-6 border-b border-[#1e2b26]">
          <h1 className="text-lg font-semibold text-emerald-400">
            EcoTwin AI
          </h1>
          <p className="text-xs text-gray-400">
            Sustainable Campus Intelligence
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          {nav.map(item => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "hover:bg-[#1a2521]"
                  }`
                }
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}

        </nav>

        <div className="p-4 border-t border-[#1e2b26]">

          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400">
            <LogOut size={16} />
            Logout
          </button>

        </div>

      </aside>


      {/* Content */}

      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}

        <header className="h-16 border-b border-[#1e2b26] flex items-center justify-between px-6">

          <h2 className="text-sm text-gray-400 uppercase tracking-widest">
            Sustainability Monitoring Platform
          </h2>

          <div className="text-xs text-gray-500">
            EcoTwin AI v1.0
          </div>

        </header>

        {/* Page Content */}

        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>

      </main>

    </div>
  );
}