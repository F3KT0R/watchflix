import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Search.css";
import Movie from "./Movie";

// creating a function for App.js
function AllMovies({ fetchUrl, searchParam }) {
  // re-structuring the code
  const [movies, setMovies] = useState([]); // creating a short tearm memory, a state

  // code snippet that runs on a specific condition
  useEffect(() => {
    // here we will load the TMDB json file's information
    async function fetchData() {
      // async can't be used right inside a useEffect function
      const request = await axios.get(fetchUrl); // await is to tell the program to wait for the response of the server
      setMovies(request.data.results);
      console.log(request); // to log it and see what we are getting back
      return request;
    }
    fetchData(); // so this is the way to solve it
  }, [fetchUrl]); // to run every time when movies load

  return (
    <div>
        <h2 className="list_title">{searchParam.length !== 0 ? "Searching:" : ''}</h2>
        <div className="block">
            <div className="posters"></div>
            {searchParam.length !== 0 && movies.length > 0 ? 
            movies.filter(movie => movie.title !== undefined && 
                movie.poster_path !== null && 
                movie.title.toLowerCase().includes(searchParam.toLowerCase()))
                .map(filteredMovie => {
              return (
                  <Movie key={filteredMovie.id} {...filteredMovie} />
              );
            }) : ''
            }
        </div>
        </div>
  );
}

export default AllMovies;