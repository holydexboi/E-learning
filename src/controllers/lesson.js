const { v4 } = require("uuid");
const { nanoid } = require("nanoid");
const Lesson = require("../models/lesson");

Lesson.createTable();

async function createLesson(req, res) {
  if (!req.body.name)
    return res.status(400).json({ message: "Lesson name is not define" });
  if (!req.body.course)
    return res.status(400).json({ message: "Course Id is not define" });
  if (!req.files)
    return res.status(400).json({ message: "Video file not uploaded" });
  let video = "/uploads/videos/lesson/";
  const file = req.files.video;
  console.log(file)
  if (file) {
    const type = file.mimetype.split("/")[1];
    video += nanoid() + "." + type;
    file.mv("." + video, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        console.log("File  uploadeded successfully");
      }
    });
  }
  const { name, course } = req.body;

  try {
    const id = v4();
    const lesson = await Lesson.createLesson({
      id,
      name,
      course,
      video,
    });

    res.json({ message: "Lessons created Successfully" });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function getLessons(req, res) {
  try {
    const output = await Lesson.getLessons();

    if (!output[0])
      return res.status(400).json({ message: "No Lesson in the database" });

    res.json({ ...output });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getLessonById(req, res) {
  try {
    const output = await Lesson.getLessonsById(req.params.id);

    if (!output[0])
      return res.status(400).json({ message: "No Lesson with the given Id" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getLessonByCourse(req, res) {
  try {
    const output = await Lesson.getLessonsByCourse(req.params.id);

    if (!output[0])
      return res
        .status(400)
        .json({ message: "No Lesson with the given Course Id" });

    res.json({ ...output });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function updateLesson(req, res) {
  const lessonId = req.params.id;
  const name = req.body?.name;
  const course = req.body?.course;
  const file = req.files?.video;
  let video = "/uploads/videos/lesson/";
  console.log(file)
  if (file) {
    const type = file.mimetype.split("/")[1];
    video += nanoid() + "." + type;
    file.mv("." + video, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        console.log("File  uploadeded successfully");
      }
    });
  }
  try {
    const output = await Lesson.updateLesson({
      id: lessonId,
      name,
      course,
      video,
    });

    if (!output[0]) return res.status(400).json({ message: "Invalid Id" });

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
  createLesson,
  getLessonByCourse,
  getLessonById,
  getLessons,
  updateLesson,
};
