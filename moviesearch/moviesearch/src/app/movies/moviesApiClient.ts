"use server"

import { Movie } from "../types/Movie";
import {MovieDetail} from "@/app/types/MovieDetail";

export async function getMovies(title: string): Promise<Movie[]|undefined> {
    try {
        //title = title.replace(/\s/g, '');
        title = title.trim();
        const response = await fetch(`https://www.omdbapi.com/?apikey=cd2aa4ca&s=${title}`);
        const data = await response.json();
        const movies = data.Search as Movie[];
        return movies;
    }
    catch {
        return undefined;
    }
}

export async function getMovieDetails(imdbId: string): Promise<MovieDetail | undefined> {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=cd2aa4ca&i=${imdbId}&plot=full`, {
            cache: "no-store",
        });
        const data = await response.json();

        if (!data || data.Response === "False") return undefined;

        return data as MovieDetail;
    } catch {
        return undefined;
    }
}
