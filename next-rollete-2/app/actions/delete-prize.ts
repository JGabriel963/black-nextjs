import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

interface DeletePrizeProps {
    id: string,
    rolleteId: string
}

const deletePrize = async ({ id, rolleteId }: DeletePrizeProps) => {

    let prize

    try {
       prize = prisma.options.delete({
        where: {
            id
        }
       }) 
    } catch (error) {
        return {
            error: error
        }
    }

    revalidatePath("/admin" + rolleteId);
    return { prize };
}

export default deletePrize