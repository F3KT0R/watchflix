const API_KEY = `${process.env.REACT_APP_WATCHFLIX_API_KEY}`;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
  fetchPopularMovies: `movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US&query=`,
};

export default requests;
