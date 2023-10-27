const List = require("../models/list");

const createList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newList = new List(req.body);

      const savedList = await newList.save();

      res.status(201).json(savedList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("not allowed");
  }
};

const deleteList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);

      res.status(200).json("list deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("not allowed");
  }
};

const getAllLists = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          {
            $match: {
              type: typeQuery,
              genre: genreQuery,
            },
          },
          {
            $sample: { size: 10 },
          },
        ]);
      } else {
        list = await List.aggregate([
          {
            $match: {
              type: typeQuery,
            },
          },
          {
            $sample: { size: 10 },
          },
        ]);
      }
    } else {
      list = await List.aggregate([
        {
          $sample: { size: 10 },
        },
      ]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createList, deleteList, getAllLists };
