const CryptoJS = require("crypto-js");
const User = require("../models/user");

const updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ message: "you can update only your account" });
  }
};

const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ message: "you can delete only your account" });
  }
};

const findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user && res.status(404).json({ message: "user not found" });

    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllusers = async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } else {
    res.status(403).json({ message: "you can't access this route" });
  }
};

const getUsersStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.getFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  findUser,
  getAllusers,
  getUsersStats,
};
