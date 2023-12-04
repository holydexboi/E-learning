const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const config = require("config");
const Users = require("../models/user");

Users.createTable();

async function createUser(req, res) {
  if (!req.body.userId)
    return res.status(400).json({ message: "UserId is not define" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is not define" });
  if (!req.body.gender)
    return res.status(400).json({ message: "Gender is not define" });
  if (!req.body.location)
    return res.status(400).json({ message: "Location is not define" });
  if (!req.body.dob)
    return res.status(400).json({ message: "Date of Birth is not define" });
  const { userId, gender, dob, location } = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  try {
    const id = v4();
    const user = await Users.createUser({
      id,
      userId,
      password,
      dob,
      gender,
      location,
    });
    const token = jwt.sign({ _id: userId }, config.get("jwtPrivateKey"));
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .json({ message: "User account created Successfully" });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function createAdmin(req, res) {
  if (!req.body.userId)
    return res.status(400).json({ message: "UserId is not define" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is not define" });

  const { userId } = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  try {
    const id = v4();
    const user = await Users.createAdmin({
      id,
      userId,
      password,
      isAdmin: true,
    });
    const token = jwt.sign(
      { _id: userId, isAdmin: true },
      config.get("jwtPrivateKey")
    );
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .json({ message: "User account created Successfully" });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function login(req, res) {
  if (!req.body.userId)
    return res.status(400).json({ message: "UserId is not define" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is not define" });
  const { userId, password } = req.body;
  try {
    const output = await Users.signin({ userId, password });

    if (!output[0]) return res.status(400).json({ message: "Invalid userId" });

    const result = await bcrypt.compare(password, output[0].password);
    if (!result) return res.status(400).json({ message: "Invalid password" });
    console.log(output[0]);
    const token = jwt.sign(
      { _id: output[0].userId, isAdmin: output[0].isAdmin },
      config.get("jwtPrivateKey")
    );

    res.json({ token, ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function update(req, res) {
  const salt = await bcrypt.genSalt(10);
  const userId = req.user._id;
  const firstName = req.body?.firstName;
  const lastName = req.body?.lastName;
  const password = !req.body.password
    ? ""
    : await bcrypt.hash(req.body.password, salt);
  const file = req.files?.profilePic;
  const grade = req.body?.grade;

  let profilePic = "/uploads/images/user/";
  if (file) {
    const type = file.mimetype.split("/")[1];
    profilePic += nanoid() + "." + type;
    file.mv("." + profilePic, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        console.log("File  uploadeded successfully");
      }
    });
  }

  try {
    const output = await Users.update({
      userId,
      password,
      firstName,
      lastName,
      profilePic,
      grade,
    });

    if (!output[0]) return res.status(400).json({ message: "Invalid userId" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

module.exports = {
  createUser,
  login,
  update,
  createAdmin
};
