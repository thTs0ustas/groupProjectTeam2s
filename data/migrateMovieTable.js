const db = require("../models");
const { Movie } = db.sequelize.models;

const movies = require("./movies.json");

const migrate = async () => {
  movies.forEach(async (movie) => {
    await Movie.create({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      genre: movie.genre,
      release_year: movie.releaseYear,
      image: `/images/movie_${movie.id}.jpg`,
    });
    // .then(async (movie) => {
    //   await MovieOfTheMonth.create({
    //     movie_id: movie.id,
    //   });
    // });
  });
};

migrate();
