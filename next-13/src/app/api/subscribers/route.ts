import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/prisma";

export async function POST(request) {
  const body = 

  const subscriber = await prismaClient.subscribers.create({
    data: {
      email: body.email
    }
  })

  return NextResponse.json({ created: true })

}