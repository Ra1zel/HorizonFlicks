import { NextResponse, NextRequest } from "next/server";

const generateUrl = (feedCategory: string) =>
  `https://api.themoviedb.org/3/movie/${feedCategory}?language=en-US&page=1&api_key=${process.env.NEXT_PRIVATE_MOVIE_API_KEY}`;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const feedCategory = searchParams.get("cat");

  if (feedCategory) {
    const x = await fetch(generateUrl(feedCategory));
    const res = await x.json();

    return NextResponse.json({ movies: res });
  }
}
