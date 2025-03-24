"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { getMovies } from "./moviesApiClient";

type SearchFormProps = {
    setMovies: Dispatch<SetStateAction<Movie[]>>;
};

export default function SearchForm({ setMovies }: SearchFormProps) {
    const [error, setError] = useState<string>("");
    const [title, setTitle] = useState<string>("");


    useEffect(() => {
        const storedTitle = sessionStorage.getItem("movieSearch");
        if (storedTitle) {
            setTitle(storedTitle);
        }
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        sessionStorage.setItem("movieSearch", newTitle);
    };

    return (
        <div>
            <form
                onSubmit={async e => {
                    e.preventDefault();

                    const movies = await getMovies(title);
                    if (!movies) {
                        setMovies([]);
                        setError("An error occurred while searching for movies.");
                        return;
                    }
                    setError("");
                    setMovies(movies);
                }}
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Search for a movie"
                    value={title}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
                <div>{error}</div>
            </form>
        </div>
    );
}
