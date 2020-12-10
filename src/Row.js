import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

// creating a function for App.js
function Row({ title, fetchUrl, isLargeRow }) {
  // re-structuring the code
  const [movies, setMovies] = useState([]); // creating a short tearm memory, a state
  const [trailerUrl, setTrailerUrl] = useState("");

  // code snippet that runs on a specific condition
  useEffect(() => {
    // here we will load the TMDB json file's information
    async function fetchData() {
      // async can't be used right inside a useEffect function
      const request = await axios.get(fetchUrl); // await is to tell the program to wait for the response of the server
      setMovies(request.data.results);
      // console.log(request); // to log it and see what we are getting back
      return request;
    }
    fetchData(); // so this is the way to solve it
  }, [fetchUrl]); // to run every time when movies load

  const opts = {
    height: "390",
    width: "50%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // movieTrailer is a pre written function that searches for a trailer of a movie based on it's name that we give as a parameter
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
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
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/* several row posters */}

        {movies.map((
          movie // to import the images from the json and create the posters
        ) => (
          <img
            key={movie.id} // to optimize loading time, so it re-renders only what is necessary
            onClick={() => handleClick(movie)} // on image click show the trailer
            className={`row_poster ${isLargeRow && "row_posterLarge"}`} // to make a difference between the originals block and the rest
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie?.title || movie?.name || movie?.original_name}
          />
        ))}
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
  );
}

export default Row;
