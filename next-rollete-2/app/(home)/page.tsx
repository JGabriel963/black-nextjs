import { Button, buttonVariants } from "@/components/ui/button";
import { GridBackgroundDemo } from "@/components/ui/grid-background";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <GridBackgroundDemo>
      <div className="relative z-20">
        <Link href="/admin" className={cn(buttonVariants({ variant: "default" }))}>
            Admin
        </Link>
      </div>
    </GridBackgroundDemo>
  );
}
