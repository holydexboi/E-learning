const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Subjects = require("../models/subject");

Subjects.createTable();

async function createSubject(req, res) {
  if (!req.body.title)
    return res.status(400).json({ message: "Subject title is not define" });
  const { title } = req.body;

  try {
    const id = v4();
    const subject = await Subjects.createSubject({ id, title });

    res.json({ message: "Subject created Successfully" });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function update(req, res) {
  if (!req.body.title)
    return res.status(400).json({ message: "Subject title is not define" });
  if (!req.body.title)
    return res
      .status(400)
      .json({ message: "Subject description is not define" });
  const { title, description } = req.body;
  try {
    const output = await Subjects.updateSubject({
      id: req.params.id,
      title,
      description,
    });

    if (!output[0])
      return res.status(400).json({ message: "No Subject with the given Id" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getSubject(req, res) {
  try {
    const output = await Subjects.getSubject();

    res.json([...output]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getSubjectById(req, res) {
  try {
    const output = await Subjects.getSubjectById(req.params.id);

    if (!output[0])
      return res.status(400).json({ message: "No Subject with the given Id" });

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
  createSubject,
  update,
  getSubjectById,
  getSubject,
};
