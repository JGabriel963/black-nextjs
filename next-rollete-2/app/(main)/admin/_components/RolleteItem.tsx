import { Rollete } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import { div } from "motion/react-client";
import Link from "next/link";
import React from "react";

interface RolleteItemProps {
  rollete: Rollete;
}

export default function RolleteItem({ rollete }: RolleteItemProps) {
  return (
    <Link href={`/admin/${rollete.id}`}>
      <div className="w-full h-24 rounded-lg shadow border-[1px] px-4 border-gray-300 relative hover:scale-105 hover:shadow-sm transition-all cursor-pointer group">
        <h4 className="font-semibold text-gray-400 mt-3 group-hover:text-gray-500">
          {" "}
          {rollete.title}{" "}
        </h4>

        <ArrowUpRight className="absolute bottom-2 right-2 text-gray-400 group-hover:text-gray-500" />
      </div>
    </Link>
  );
}
