import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LogoImage from '../public/logo.jpg'

export function Logo() {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image
                    src={LogoImage}
                    alt="Logo"
                    height={30}
                    width={30}
                    className="rounded-full"
                />
                <p className={cn("text-lg text-neutral-700 pb-1")}>
                    Taskify
                </p>
            </div>
        </Link>
    )
}