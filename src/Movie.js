import React, { useState } from "react";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Movie.css"

const base_url = "https://image.tmdb.org/t/p/original/";

function Movie({ title, name, original_name, id, poster_path, overview, release_date }) {
    const [trailerUrl, setTrailerUrl] = useState("");

    const opts = {
        height: "500vh",
        width: "800vw",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = () => {

        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            // movieTrailer is a pre written function that searches for a trailer of a movie based on it's name that we give as a parameter
            movieTrailer(title || name || original_name)
            // it's a promise, so it has to have a then
            .then((url) => {
                // this gives a full url, but YT videos have an id that is enough
                const urlParams = new URLSearchParams(new URL(url).search); // this is so that we can use the get function for urlParams // the .search is so that it gives back the content after the ? mark in the URL
                // this will return the value of v(that is the video id value on YT)
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error)); // to see what the error is if there is any
        }
    };

    return (
        <div>
            <h3>{title || name || original_name}</h3>

            <div className="movie">

                <img
                    key={id} // to optimize loading time, so it re-renders only what is necessary
                    onClick={() => handleClick()} // on image click show the trailer
                    className="row_posterLarge"
                    src={`${base_url}${poster_path}`}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block"
                    }}
                    alt={title || name || original_name}
                />
                
                <div className="movie_desc">
                    <p>{overview !== "" ? overview : "No overview found."}</p>
                </div>
            </div>

            {trailerUrl && (
                <YouTube
                className="youtube"
                videoId={trailerUrl}
                opts={opts}
                style={{
                    backgroundImage: `url("${base_url}")`,
                }}
                />
            )}
        </div>
    )
}

export default Movie