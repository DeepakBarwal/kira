import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const boardId = searchParams.get("boardId");
    const skip = searchParams.get("skip");
    const take = searchParams.get("take");

    if (!boardId || !skip || !take) {
      return NextResponse.json(
        {
          error: {
            message: "Fields are missing",
          },
        },
        { status: 400 }
      );
    }

    const board = prisma.board.findUniqueOrThrow({
      where: { id: boardId },
    });

    const boardColumns = prisma.boardColumn.findMany({
      where: {
        boardId,
      },
    });

    const boardTickets = prisma.boardTicket.findMany({
      where: {
        boardId,
      },
      skip: Number(skip),
      take: Number(take),
    });

    const data = await Promise.all([board, boardColumns, boardTickets]);

    return NextResponse.json(
      {
        data: {
          board: data[0],
          boardColumns: data[1],
          boardTickets: data[2],
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
