const { customAlphabet } = require("nanoid");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const Users = require("../models/user");

Users.createTable();

async function createUser(req, res) {
  if (!req.body.userId)
    return res.status(400).json({ message: "UserId is not define" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is not define" });
  const { userId } = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  try {
    const id = v4();
    const user = await Users.createUser({ id, userId, password });
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

    const token = jwt.sign(
      { _id: output[0].userId },
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
  const gender = req.body?.gender;
  const dob = req.body?.dob;
  const profilePic = req.body?.profilePic;
  const grade = req.body?.grade;
  try {
    const output = await Users.update({
      userId,
      password,
      firstName,
      lastName,
      gender,
      dob,
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
};
