import { AppSidebar } from "@/components/globals/app-sidebar"
import Header from "@/components/globals/site-header"
import { SidebarHeader, SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SignOutButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { useRouter } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { userId } = await auth()

  return (
    // <div className="flex h-screen w-full bg-slate-100">
    //     {/* <Sidebar /> */}
    //   <div className="flex flex-col flex-1 w-full">
    //         {children}
    //   </div>
    // </div>
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-2">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )

}