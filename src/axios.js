import axios from "axios";

// creating a base url for every one of my requests in the requests.js file
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance; // if the variable has default while exporting it can be named anything in the new file