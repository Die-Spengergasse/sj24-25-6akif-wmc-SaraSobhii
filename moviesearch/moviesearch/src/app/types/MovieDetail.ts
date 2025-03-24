import {Rating} from "@/app/types/Rating";

export interface MovieDetail {
    Title: string,
    Year: number,
    Plot: string,
    Ratings: Rating[],
    Poster: string
}
