import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface CreatePrizeProps {
  name: string;
  isPrize: boolean;
  color?: string;
  repeat: boolean;
  quantity: number;

  rolleteId: string;
}

const createPrize = async ({
  name,
  isPrize,
  color,
  repeat,
  quantity,
  rolleteId,
}: CreatePrizeProps) => {
  const rollete = await prisma.rollete.findFirst({
    where: {
      id: rolleteId,
    },
  });

  if (!rollete) {
    return {
      error: "Nenhuma rolleta encontrada",
    };
  }

  let prize;

  try {
    prize = prisma.options.create({
      data: {
        name,
        isPrize,
        color,
        repeat,
        quantity,
        rolleteId,
      },
    });
  } catch (error) {
    return {
      error: error,
    };
  }

  revalidatePath("/admin" + rolleteId);
  return { prize };
};

export default createPrize;
