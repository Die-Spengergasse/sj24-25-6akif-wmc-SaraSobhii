import { getMovieDetails } from "@/app/movies/moviesApiClient";
import MovieDetailView from "./MovieDetailView";

export default async function Page({ params }: { params: Promise<{ imdbId: string }> }) {
    const { imdbId } = await params;
    const movieDetail = await getMovieDetails(imdbId);
    if (!movieDetail) return <div>Movie details could not be loaded.</div>;
    return <MovieDetailView movieDetail={movieDetail} />;
}
