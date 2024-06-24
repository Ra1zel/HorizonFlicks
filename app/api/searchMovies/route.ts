import { NextResponse, NextRequest } from "next/server";

const generateUrl = (searchQuery: string) =>
  `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&?language=en-US&page=1&api_key=${process.env.NEXT_PRIVATE_MOVIE_API_KEY}`;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchQuery = searchParams.get("searchQuery");

  if (searchQuery) {
    const queryResult = await fetch(generateUrl(searchQuery));
    const movies = await queryResult.json();

    return NextResponse.json({ movies });
  }
}
