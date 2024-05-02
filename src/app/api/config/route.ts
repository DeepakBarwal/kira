import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export async function GET(request: NextRequest) {
  try {
    const navData = await get("navData");

    return NextResponse.json(
      {
        data: { navData },
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
