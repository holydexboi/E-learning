const { v4 } = require("uuid");
const Grades = require("../models/grade");

Grades.createTable();

async function createGrade(req, res) {
  if (!req.body.level)
    return res.status(400).json({ message: "Grade level is not define" });
  const { level } = req.body;

  try {
    const id = v4();
    const grade = await Grades.createGrade({ id, level });

    res.json({ message: "Grade created Successfully" });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function updateGrade(req, res) {
  if (!req.body.level)
    return res.status(400).json({ message: "Grade level is not define" });
  const { level } = req.body;
  try {
    const output = await Grades.updateGrade({
      id: req.params.id,
      level,
    });

    if (!output[0])
      return res.status(400).json({ message: "No Grade with the given Id" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getGrades(req, res) {
  try {
    const output = await Grades.getGrades();

    if (!output[0])
      return res.status(400).json({ message: "No Grades in the database" });

    res.json({ ...output });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getGradeById(req, res) {
  try {
    const output = await Grades.getGradeById(req.params.id);

    if (!output[0])
      return res.status(400).json({ message: "No Grades with the given Id" });

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
  createGrade,
  updateGrade,
  getGradeById,
  getGrades,
};
