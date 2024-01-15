const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const { customAlphabet, nanoid } = require("nanoid");
const userIdentifier = customAlphabet("1234567890", 7);
const jwt = require("jsonwebtoken");
const Users = require("../models/user");

Users.createTable();

async function createUser(req, res) {
  if (!req.body.firstName)
    return res.status(400).json({ message: "First Name is not define" });
  if (!req.body.lastName)
    return res.status(400).json({ message: "Last Name is not define" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is not define" });
  if (!req.body.gender)
    return res.status(400).json({ message: "Gender is not define" });
  if (!req.body.location)
    return res.status(400).json({ message: "Location is not define" });
  if (!req.body.dob)
    return res.status(400).json({ message: "Date of Birth is not define" });

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const { gender, dob, location, lastName, firstName } = req.body;

  try {
    const id = v4();
    const userId = userIdentifier();
    const user = await Users.createUser({
      id,
      userId,
      firstName,
      lastName,
      password,
      code: "",
      dob,
      gender,
      location,
    });
    const token = jwt.sign({ _id: userId }, "unsecure");
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .json({
        message: "User account created Successfully",
        data: { userId },
      });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function createAdmin(req, res) {
  if (!req.body.email)
    return res.status(400).json({ message: "Email is not define" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is not define" });

  const { email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const userId = 455447;
  try {
    const id = v4();
    const user = await Users.createAdmin({
      id,
      email,
      userId: 455447,
      password,
      isAdmin: true,
    });
    const token = jwt.sign({ _id: userId, isAdmin: true }, "unsecure");
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

    if (!output[0]) return res.status(400).json({ message: "Invalid UserId" });

    const result = await bcrypt.compare(password, output[0].password);
    if (!result) return res.status(400).json({ message: "Invalid password" });
    console.log(output[0]);
    const token = jwt.sign(
      { _id: output[0].userId, isAdmin: true },
      "unsecure"
    );

    res.json({ token, ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function loginAdmin(req, res) {
  if (!req.body.email)
    return res.status(400).json({ message: "Email is not define" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is not define" });
  const { email, password } = req.body;
  try {
    const output = await Users.signinAdmin({ email, password });

    if (!output[0]) return res.status(400).json({ message: "Invalid Email" });

    const result = await bcrypt.compare(password, output[0].password);
    if (!result) return res.status(400).json({ message: "Invalid password" });
    console.log(output[0]);
    const token = jwt.sign(
      { _id: output[0].userId, isAdmin: true },
      "unsecure"
    );

    res.json({ token, ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
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
  }else{
profilePic =null
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
  createAdmin,
  loginAdmin,
};
