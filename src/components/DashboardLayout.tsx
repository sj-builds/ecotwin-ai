import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import MobileNavbar from "@/components/MobileNavbar";
import AIAssistant from "@/components/AIAssistant";

export function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (

    <SidebarProvider>

      <AppSidebar />

      <SidebarInset>

        <main className="
          min-h-screen
          overflow-y-auto
          bg-gradient-to-br
          from-[#06110c]
          via-[#0a1f17]
          to-[#03130e]
          text-gray-200
          px-4
          py-6
          md:px-8
          md:py-8
        ">

          <div className="
            w-full
            max-w-[1400px]
            mx-auto
            space-y-6
            md:space-y-8
            pb-24
          ">

            {children}

          </div>

        </main>

      </SidebarInset>

      <MobileNavbar />

      <AIAssistant />

    </SidebarProvider>

  );

}