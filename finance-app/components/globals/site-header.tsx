"use client"

import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname();

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear px-3">
        <SidebarTrigger className="" />
        <Separator orientation='vertical' className="mx-2 data-[orientation=vertical]:h-4" />
        <div className='w-full flex'>
            <h3 className='font-semibold capitalize'>
                {pathname.split("/")[1]}
            </h3>
        </div>
    </header>
  )
}
