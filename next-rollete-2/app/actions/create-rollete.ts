"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface RolleteProps {
  title: string;
  description?: string;
}

const createRollete = async ({ title, description }: RolleteProps) => {

    let rollete

  try {
    rollete = prisma.rollete.create({
      data: {
        title,
        description,
      },
    });
  } catch (error) {
    return {
      error: error,
    };
  }

  revalidatePath("/admin")
  return { rollete }
};


export default createRollete