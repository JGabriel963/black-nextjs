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
} from "@dnd-kit/core";
import {
  restrictToWindowEdges,
  restrictToVerticalAxis
} from '@dnd-kit/modifiers';
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

export default function BudgetsList() {
  const { user } = useUser();
  const [budgerList, setBudgerList] = useState<Budget[]>([]);
  const budgersIds = useMemo(
    () => budgerList.map((item) => item.id),
    [budgerList]
  );
  const [activeCard, setActiveCard] = useState<Budget | null>(null);

  useEffect(() => {
    getBudgerList();
  }, [user]);

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

  return (
    <div className="mt-7">
      <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateNewBudget refreshList={() => getBudgerList()} />
          <SortableContext items={budgersIds}>
            {budgerList.map((buget, index) => (
              <BudgetItem data={buget} key={index} />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeCard && <BudgetItem data={activeCard} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
