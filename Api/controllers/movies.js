const Movie = require("../models/movie");
const createMovie = async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You are not allowed!");
  }
};
const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(201).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You are not allowed!");
  }
};
const deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);

      res.status(201).json("movie deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You are not allowed!");
  }
};
const getAllMovies = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();

      res.status(201).json(movies.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You are not allowed!");
  }
};
const findMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        {
          $match: {
            isSeries: true,
          },
        },
        {
          $sample: {
            size: 1,
          },
        },
      ]);
    } else {
      movie = await Movie.aggregate([
        {
          $match: {
            isSeries: false,
          },
        },
        {
          $sample: {
            size: 1,
          },
        },
      ]);
    }
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  findMovie,
  getRandomMovie,
  getAllMovies,
};
