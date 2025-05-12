import { cn } from "@/lib/utils";
import { Budget } from "@/schema";
import React from "react";

interface BudgetItemProps {
  data: Budget;
}

export default function BudgetInfo({ data }: BudgetItemProps) {
  return (
    <div
      className={
        "px-5 py-10 border rounded-lg bg-white w-full"
      }
    >
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center w-full">
          <h2 className="text-2xl p-3 bg-slate-100 rounded-full">
            {data.icon}
          </h2>
          <div>
            <h2 className="font-bold"> {data.name} </h2>
            <p className="text-slate-500 text-sm"> {data.amount} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
