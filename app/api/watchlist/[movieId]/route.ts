import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/client";

export async function GET(params: { movieId: number }) {
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
