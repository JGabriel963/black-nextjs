"use client"
import { AddNewTransition } from "./_components/AddNewTransition";

export default function ExpensePage() {
  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-slate-900">Nova Fonte</h2>
        <AddNewTransition />
      </div>
    </div>
  );
}
