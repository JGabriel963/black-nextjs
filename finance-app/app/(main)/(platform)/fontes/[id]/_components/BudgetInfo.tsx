import { BudgetType } from "@/schema";
import { BudgetItem } from "../page";

interface BudgetItemProps {
  data: BudgetItem;
}

export default function BudgetInfo({ data }: BudgetItemProps) {
  return (
    <div className={"px-5 py-10 border rounded-lg bg-white w-full h-[150px]"}>
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
      <div className="flex items-center justify-end gap-1">
        <h2 className="font-medium">Total:  </h2>
        <span className="font-bold text-slate-600">{new Intl.NumberFormat('pt-BR', {
          style: "currency", currency: "BRL"
        }).format(data.totalSpend)}</span>
      </div>
    </div>
  );
}
