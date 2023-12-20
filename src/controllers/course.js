const { v4 } = require("uuid");
const { nanoid } = require("nanoid");
const Course = require("../models/course");

Course.createTable();

async function createCourse(req, res) {
  console.log(req.files);

  if (!req.body.subject)
    return res.status(400).json({ message: "Subject Id is not define" });
  if (!req.body.grade)
    return res.status(400).json({ message: "Grade is not define" });
  if (!req.files)
    return res.status(400).json({ message: "Course banner is not define" });

  const file = req.files.banner;
  let banner = "/uploads/images/course/";
  if (file) {
    const type = file.mimetype.split("/")[1];
    banner += nanoid() + "." + type;
    file.mv("." + banner, (err) => {
      if (err) {
       console.log(err)
      } else {
        console.log("File  uploadeded successfully");
      }
    });
  }
  const { subject, grade } = req.body;

  try {
    const id = v4();
    const course = await Course.createCourse({
      id,
      subject,
      grade,
      banner,
    });

    res.json({ message: "Course created Successfully" });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function getCourses(req, res) {
  try {
    const output = await Course.getCourses();

    res.json([...output]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getCourseById(req, res) {
  try {
    const output = await Course.getCourseById(req.params.id);

    if (!output[0])
      return res.status(400).json({ message: "No Course with the given Id" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getCourseByGrade(req, res) {
  try {
    const output = await Course.getCourseByGrade(req.params.id);

    res.json([...output]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function updateCourse(req, res) {
  const courseId = req.params.id;
  const subject = req.body?.subject;
  const grade = req.body?.grade;
  const file = req.files?.banner;
  let banner = "/uploads/images/course/";
  if (file) {
    const type = file.mimetype.split("/")[1];
    banner += nanoid() + "." + type;
    file.mv("." + banner, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        console.log("File  uploadeded successfully");
      }
    });
  }
  try {
    const output = await Course.updateCourse({
      id: courseId,
      subject,
      grade,
      banner,
    });

    if (!output[0])
      return res.status(400).json({ message: "Invalid CourseId" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

module.exports = {
  createCourse,
  getCourseByGrade,
  getCourseById,
  getCourses,
  updateCourse,
};
