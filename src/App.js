import React, { useState } from "react";
import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";
import Search from "./Search";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="app">
      <Nav />

      <input 
      type="search" 
      placeholder="Search for movies..." 
      value={searchTerm}
      className="search"
      autoComplete="off"
      onChange={handleOnChange}
      />

      <Banner />

      <Row title="TRENDING NOW" fetchUrl={requests.fetchTrending} searchParam={searchTerm}/>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} searchParam={searchTerm}/>
      <Row title="Action" fetchUrl={requests.fetchActionMovies} searchParam={searchTerm}/>
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} searchParam={searchTerm}/>
      <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} searchParam={searchTerm}/>
      <Row title="Drama" fetchUrl={requests.fetchDramaMovies} searchParam={searchTerm}/>
  
      <Search fetchUrl={`${requests.fetchSearch}&query=${searchTerm}`} searchParam={searchTerm.replace(/\s+/g, ' ').trim()}/>
    </div>
  );
}

export default App;
