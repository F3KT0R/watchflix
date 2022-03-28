import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Movie from "./Movie";


// creating a function for App.js
function Row({ title, fetchUrl, searchParam }) {
  // re-structuring the code
  const [movies, setMovies] = useState([]); // creating a short tearm memory, a state
  const [collapse, setCollapse] = useState();

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
      <h2 onClick={() => setCollapse(!collapse)}>{searchParam.length === 0 ? title : ''}</h2>
      <div className="row">
        <div className="row_posters"></div>
        {!collapse? searchParam.length === 0 && movies.length > 0 ? 
        movies.map(movie => <Movie key={movie.id} {...movie} />) : 
        '' : ''
        }
      </div>
    </div>
  );
}

export default Row;