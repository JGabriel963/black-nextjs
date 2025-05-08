import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";


export default async function HomePage() {


    return (
       <BackgroundBeamsWithCollision>
         <div className="h-full flex flex-col w-full items-center justify-center px-2">
            <div className="w-full max-w-3xl  items-center justify-center flex flex-col gap-1"> 
                <h1 className="text-2xl text-center md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">Organize e gerencie sua contas de um forma simple e sem planilhas</h1>
                <div>
                    <p className="text-center text-sm md:text-base ">Com o Finnance você pode organizar suas contas de forma simples e rápida, sem precisar de planilhas complicadas. Acesse sua conta e comece a usar agora mesmo!</p>
                </div>
                <div className="mt-5">
                    <Link href="/sign-up" className={cn(buttonVariants({ variant: "default"}))}>
                        Acessar
                    </Link>
                </div>
            </div>
        </div>
       </BackgroundBeamsWithCollision>
    )
}