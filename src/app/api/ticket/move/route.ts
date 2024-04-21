import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { schema } from "@/schema/moveTicket";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = schema.safeParse(body);
    if (!response.success) {
      return NextResponse.json(
        {
          error: {
            message: "Incorrect fields",
          },
        },
        { status: 400 }
      );
    }
    const { boardId, position, boardColumnId, ticketId } = body;

    const ticketData = await prisma.boardTicket.update({
      where: {
        id: ticketId,
      },
      data: {
        boardId,
        position,
        boardColumnId,
      },
    });

    return NextResponse.json(
      {
        data: {
          ticketData,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: {
          message: "Something went wrong!",
        },
      },
      { status: 500 }
    );
  }
}
