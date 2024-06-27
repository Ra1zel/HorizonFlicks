import prisma from "@/app/_lib/prisma/client";

export async function fetchWatchlistMovies() {
  return prisma.savedMovie.findMany();
}
