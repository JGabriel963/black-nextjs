import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/app/libs/prismadb'

interface IParams {
    conversationId?: string
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = params

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const converation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        })

        if (!converation) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const lastMessage = converation.messages[converation.messages.length - 1]

        if (!lastMessage) {
            return NextResponse.json(converation)
        }

        const updateMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

        return NextResponse.json(updateMessage)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES_SEEN')
        return new NextResponse("Internal Error", {status: 500})
    }
}