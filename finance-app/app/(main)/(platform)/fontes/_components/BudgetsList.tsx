"use client";

import React, { useEffect, useMemo, useState } from "react";
import CreateNewBudget from "./CreateNewBudget";
import { db } from "@/lib/db";
import { Budget, Budgets } from "@/schema";
import { asc, eq, getTableColumns } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Skeleton } from "@/components/ui/skeleton";

export default function BudgetsList() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false)
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const pointerSensor = useSensor(PointerSensor);

  const sensors = useSensors(
    touchSensor,
    keyboardSensor,
    pointerSensor
  )
  const [budgerList, setBudgerList] = useState<Budget[]>([]);
  const budgersIds = useMemo(
    () => budgerList.map((item) => item.id),
    [budgerList]
  );
  const [activeCard, setActiveCard] = useState<Budget | null>(null);

  const getBudgerList = async () => {
    const budgets = await db
      .select({
        ...getTableColumns(Budgets),
      })
      .from(Budgets)
      .orderBy(asc(Budgets.order))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!));

    setBudgerList(budgets);
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    let items: Budget[] = [];

    setBudgerList((cards) => {
      const activeCardIndex = cards.findIndex(
        (card) => card.id === activeColumnId
      );

      const overCardIndex = cards.findIndex((card) => card.id === overColumnId);

      items = arrayMove(cards, activeCardIndex, overCardIndex);
      return items;
    });

    items.map(async (card, index) => {
      await db
        .update(Budgets)
        .set({ order: index })
        .where(eq(Budgets.id, card.id));
    });
  };

  const onDragStart = async (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Card") {
      setActiveCard(event.active.data.current.card);
    }
  };

  useEffect(() => {
    setLoading(true)
    try {
      getBudgerList();
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [user]);

  return (
    <div className="mt-7">
      <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart} sensors={sensors}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateNewBudget refreshList={() => getBudgerList()} />
          {!loading ? <SortableContext items={budgersIds}>
            {budgerList.map((buget, index) => (
              <BudgetItem data={buget} key={index} />
            ))}
          </SortableContext> : [1,2,3,4,5].map((i) => (
            <Skeleton key={i} className="w-full h-[150px] bg-slate-200" />
          ))}
        </div>

        <DragOverlay>
          {activeCard && <BudgetItem data={activeCard} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
