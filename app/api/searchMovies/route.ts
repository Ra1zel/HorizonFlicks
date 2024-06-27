import { NextResponse, NextRequest } from "next/server";
import { TMDB_BASE_URL } from "@/constants";

const generateUrl = (searchQuery: string, pageNumber: string) =>
  `${TMDB_BASE_URL}/search/movie?query=${searchQuery}&page=${pageNumber}?language=en-US&page=1&api_key=${process.env.NEXT_PRIVATE_MOVIE_API_KEY}`;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchQuery = searchParams.get("searchQuery");
  const pageNumber = searchParams.get("page");

  if (searchQuery && pageNumber) {
    const queryResult = await fetch(generateUrl(searchQuery, pageNumber));
    const movies = await queryResult.json();

    return NextResponse.json({ movies });
  }
}
