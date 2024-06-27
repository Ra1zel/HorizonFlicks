import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/prisma/client";

export async function GET(req: NextRequest, params: { movieId: number }) {
  const { movieId } = params;

  try {
    const movie = await prisma.savedMovie.findUnique({
      where: {
        id: movieId,
      },
    });

    return NextResponse.json({ inWatchlist: !!movie });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
