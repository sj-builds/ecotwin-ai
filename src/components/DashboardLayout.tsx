import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (

    <SidebarProvider>

      <AppSidebar />

      <SidebarInset>

        <main className="
          min-h-screen
          bg-gradient-to-br
          from-[#06110c]
          via-[#0a1f17]
          to-[#03130e]
          text-gray-200
          p-8
        ">

          <div className="space-y-8">

            {children}

          </div>

        </main>

      </SidebarInset>

    </SidebarProvider>

  );

}