import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (

    <SidebarProvider>

      <div className="
        flex
        min-h-screen
        bg-gradient-to-br
        from-[#06110c]
        via-[#0a1f17]
        to-[#03130e]
        text-gray-200
      ">

        <AppSidebar />

        <main className="
          flex-1
          overflow-y-auto
          px-6
          py-8
        ">

          <div className="
            w-full
            max-w-[1400px]
            mx-auto
            space-y-6
          ">

            {children}

          </div>

        </main>

      </div>

    </SidebarProvider>

  );

}