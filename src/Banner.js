import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Banner.css";
import requests from "./requests";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      async function fetchData() {
        const request = await axios.get(requests.fetchTrending);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
        return request;
      }
      fetchData();
    }, 7000);
    return() => clearTimeout(timer);
  }, []);

  // a function to cut of(truncate) very long descriptions
  function truncate(string, number) {
    return string?.length > number
      ? string.substring(0, number - 1) + " ..."
      : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {/*this is needed, because not all of the api results give back the same attribute */}
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 200)}
          </h1>
        </div>
      </div>

      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;
