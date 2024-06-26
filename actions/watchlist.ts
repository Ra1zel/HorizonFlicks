"use server";

import { SavedMovie } from ".prisma/client";

import prisma from "@/lib/prisma/client";
import { redirect } from "next/navigation";

export async function watchlistAction(movie: SavedMovie, redirectPath: string) {
  try {
    // Check if the movie exists in the table
    const existingMovie = await prisma.savedMovie.findUnique({
      where: {
        id: movie.id,
      },
    });

    if (existingMovie) {
      // Movie exists, delete it
      await prisma.savedMovie.delete({
        where: {
          id: movie.id,
        },
      });
    } else {
      // Movie doesn't exist, add it
      await prisma.savedMovie.create({
        data: {
          ...movie,
        },
      });
    }
  } catch (error) {
    return { error: `${error}` };
  }

  redirect(redirectPath);
}
