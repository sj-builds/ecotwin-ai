import {
  LayoutDashboard,
  Map,
  Brain,
  AlertTriangle,
  FileText,
  LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Digital Twin", url: "/digital-twin", icon: Map },
  { title: "AI Insights", url: "/ai-insights", icon: Brain },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Reports", url: "/reports", icon: FileText }
];

export function AppSidebar() {

  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (

    <Sidebar
      collapsible="icon"
      className="bg-white/5 backdrop-blur-xl border-r border-white/10"
    >

      <SidebarContent>

        <SidebarGroup>

          {/* Logo */}

          <div className="px-5 py-6 border-b border-white/10">

            {!collapsed ? (

              <div className="flex items-center gap-3">

                <div className="
                  h-9 w-9
                  rounded-lg
                  bg-gradient-to-br
                  from-emerald-400
                  to-emerald-600
                  flex
                  items-center
                  justify-center
                  text-black
                  font-bold
                  text-sm
                ">
                  ET
                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    EcoTwin AI
                  </p>

                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Sustainability OS
                  </p>

                </div>

              </div>

            ) : (

              <div className="
                h-9 w-9
                rounded-lg
                bg-emerald-500
                flex
                items-center
                justify-center
                mx-auto
                text-black
                font-bold
                text-xs
              ">
                ET
              </div>

            )}

          </div>


          {/* Navigation */}

          <SidebarGroupContent>

            <SidebarMenu className="mt-4 space-y-1 px-2">

              {navItems.map((item) => {

                const Icon = item.icon;

                return (

                  <SidebarMenuItem key={item.title}>

                    <SidebarMenuButton asChild>

                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `
                          flex items-center gap-3
                          px-3 py-2
                          rounded-lg
                          text-sm
                          transition
                          ${
                            isActive
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                              : "text-gray-400 hover:bg-white/10 hover:text-white"
                          }
                          `
                        }
                      >

                        <Icon size={16} />

                        {!collapsed && <span>{item.title}</span>}

                      </NavLink>

                    </SidebarMenuButton>

                  </SidebarMenuItem>

                );

              })}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>


      {/* Footer */}

      <SidebarFooter className="p-3 border-t border-white/10">

        <SidebarMenu>

          <SidebarMenuItem>

            <SidebarMenuButton asChild>

              <NavLink
                to="/login"
                className="
                  flex items-center gap-3
                  px-3 py-2
                  text-sm
                  text-gray-400
                  rounded-lg
                  hover:bg-red-500/10
                  hover:text-red-400
                  transition
                "
              >

                <LogOut size={16} />

                {!collapsed && <span>Sign Out</span>}

              </NavLink>

            </SidebarMenuButton>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarFooter>

    </Sidebar>

  );

}