"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { id, boardId } = data;
    let list;

    try {
        const listToCopy = await db.list.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId
                },
            },
            include: {
                card: true,
            }
        });

        if (!listToCopy) {
            return { error: "List not found" };
        }

        const lastList = await db.list.findFirst({
            where: { boardId },
            orderBy: { order: "desc" },
            select: { order: true }
        });

        const newOrder = lastList ? lastList.order + 1: 1;


        list = await db.list.create({
            data: {
                boardId: listToCopy.boardId,
                title: `${listToCopy.title} - Copy`,
                order: newOrder,
                card: {
                    createMany: {
                        data: listToCopy.card.map((card) => ({
                            title: card.title,
                            description: card.description,
                            order: card.order
                        }))
                    }
                }
            },
            include: { card: true }
        });
    } catch (error) {
        return {
            error: "Failed to delete."
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list }
}

export const copyList = createSafeAction(CopyList, handler);