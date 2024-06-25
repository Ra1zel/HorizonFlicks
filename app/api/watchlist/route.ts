import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/client";

export async function GET() {
  const watchlistMovies = await prisma.savedMovie.findMany();

  return NextResponse.json({ movies: watchlistMovies });
}
