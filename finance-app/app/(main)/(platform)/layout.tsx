import Sidebar from "@/app/components/Sidebar"
import { SidebarDemo } from "@/app/components/SidebarDemo"
import { SignOutButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { useRouter } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { userId } = await auth()

  return (
    <div className="flex h-screen w-full bg-slate-100">
        {/* <Sidebar /> */}
      <div className="flex flex-col flex-1 w-full">
            {children}
      </div>
    </div>
  )

}