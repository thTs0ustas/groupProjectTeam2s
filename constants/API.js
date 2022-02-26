// https://rapidapi.com/linaspurinis/api/mdblist/
// http://www.omdbapi.com/?apikey=[yourkey]&
// sz@mCzPt7yLtd9S

// var options = {
//   method: 'GET',
//   url: 'https://mdblist.p.rapidapi.com/',
//   params: {tm: '578'},
//   headers: {
//     'x-rapidapi-host': 'mdblist.p.rapidapi.com',
//     'x-rapidapi-key': '18b1966606msh4fc4d5f45807027p1f507ejsnda12d3023895'
//   }
// };
//
// const { find } = require("lodash");
// const API_KEY = "18b1966606msh4fc4d5f45807027p1f507ejsnda12d3023895";
// module.exports = API_KEY;
//
// const axios = require("axios").default;
//
// const options = (searchParam, param) => ({
//   method: "GET",
//   url: "https://mdblist.p.rapidapi.com/",
//   params: { [searchParam]: param },
//   headers: {
//     "x-rapidapi-host": "mdblist.p.rapidapi.com",
//     "x-rapidapi-key": "18b1966606msh4fc4d5f45807027p1f507ejsnda12d3023895",
//   },
// });
//
// axios
//   .request(options("s", "Airplane!"))
//   .then((response) => {
//     const movieId = find(response.data.search, (d) =>
//       d.title.includes("Airplane!")
//     ).imdbid;
//     console.log(movieId);
//   })
//   .then((data) => axios.request(options("i", `${data}`)))
//
//   .catch(function (error) {
//     console.error(error);
//   });

// const l = axios.request(options("i", `${f()}`));
// console.log(f());
