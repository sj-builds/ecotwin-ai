import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Brain,
  AlertTriangle,
  FileText
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Map, label: "Twin", path: "/digital-twin" },
  { icon: Brain, label: "AI", path: "/ai-insights" },
  { icon: AlertTriangle, label: "Alerts", path: "/alerts" },
  { icon: FileText, label: "Reports", path: "/reports" }
];

export default function MobileNavbar() {

  return (

    <div className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      bg-black/70
      backdrop-blur-xl
      border-t
      border-white/10
      flex
      justify-around
      py-2
      md:hidden
    ">

      {navItems.map((item) => {

        const Icon = item.icon;

        return (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex
              flex-col
              items-center
              text-xs
              px-2
              py-1
              ${isActive ? "text-emerald-400" : "text-gray-400"}
            `}
          >

            <Icon size={20} />

            <span className="text-[10px] mt-1">
              {item.label}
            </span>

          </NavLink>

        );

      })}

    </div>

  );

}