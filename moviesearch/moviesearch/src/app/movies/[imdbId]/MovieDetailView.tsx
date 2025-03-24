"use client";
import { useState, useEffect } from "react";
import { MovieDetail } from "@/app/types/MovieDetail";
import RatingView from "./RatingView";

export default function MovieDetailView({ movieDetail }: { movieDetail: MovieDetail }) {
    const [errorMessage, setErrorMessage] = useState("");



    return (
        <div>
            <h1>{movieDetail.Title}</h1>
            <img src={movieDetail.Poster} alt={movieDetail.Title} />
            <p>{movieDetail.Plot}</p>
            <RatingView ratings={movieDetail.Ratings} />
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}
