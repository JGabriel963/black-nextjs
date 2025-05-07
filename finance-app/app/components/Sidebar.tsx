"use client"

import { cn } from '@/lib/utils';
import { ComponentRef, useRef, useState } from 'react'

export default function Sidebar() {
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ComponentRef<"aside">>(null);
    const navbarRef = useRef<ComponentRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            // navbarRef.current.style.setProperty("left", `${newWidth}px`);
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

  return (
    <>
        <aside
            ref={sidebarRef}
            className={cn("hidden group/sidebar h-full bg-slate-100 overflow-y-auto relative sm:flex w-60 flex-col z-[99999] border-r border-separate",
                isResetting && "transition-all duration-300 ease-in-out",
            )}
        >
            <div>
                <p>Actions</p>
            </div>
            <div>
                Options
            </div>
            <div 
            onMouseDown={handleMouseDown}
            onClick={() => {}}
            className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0' />
        </aside>
    </>
  )
}
