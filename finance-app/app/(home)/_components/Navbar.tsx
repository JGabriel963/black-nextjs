import { auth } from "@clerk/nextjs/server"
import Link from "next/link";

export default async function Navbar() {
    const { userId } = await auth();

  return (
    <div className='flex items-center justify-center h-12 border-b border-separate px-4'>
        <div className='flex items-center justify-between w-full max-w-3xl'>
            <div className="flex">
                Finnance App
            </div>
            <div>
                {
                    userId
                    ? <Link href="/sign-in">
                        Entrar
                    </Link>
                    : <Link href="/sign-in">
                    Cadastre-se
                </Link>
                }
            </div>
        </div>
    </div>
  )
}
