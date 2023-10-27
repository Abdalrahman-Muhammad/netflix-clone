const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
  //encrypt password
  const hasedPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.SECRET_KEY
  ).toString();

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hasedPassword,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    //find user by email
    const user = await User.findOne({ email: req.body.email });

    //if user not exists
    !user && res.status(404).json({ message: "Wrong password or email" });

    //decrypt the password
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    //if password is wrong
    decryptedPassword !== req.body.password &&
      res.status(404).send({ message: "Wrong password or email" });

    //if password is correct

    const accessToke = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToke });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login };
