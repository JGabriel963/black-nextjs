import { auth } from "@clerk/nextjs/server";
import { HandCoins } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <div className="flex items-center w-full justify-center h-12 border-b border-separate px-4 fixed top-0 right-0 left-0 z-[999]">
      <div className="flex items-center justify-between w-full max-w-3xl">
        <Link href="/" className="flex gap-1">
          <HandCoins className="bg-primary text-white p-1 rounded-lg border-dashed border-gray-500 hover:bg-primary/90" />
          <span className="font-bold">Finnance App</span>
        </Link>
        <div>
          {userId ? (
            <Link href="/sign-in">Entrar</Link>
          ) : (
            <Link href="/sign-in">Cadastre-se</Link>
          )}
        </div>
      </div>
    </div>
  );
}
