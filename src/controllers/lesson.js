const { v4 } = require("uuid");
const { nanoid } = require("nanoid");
const Lesson = require("../models/lesson");

Lesson.createTable();

async function createLesson(req, res) {
  if (!req.body.name)
    return res.status(400).json({ message: "Lesson name is not define" });
  if (!req.body.course)
    return res.status(400).json({ message: "Course Id is not define" });
  if (!req.body.duration)
    return res.status(400).json({ message: "Duration is not define" });
  if (!req.body.description)
    return res.status(400).json({ message: "Description is not define" });
  if (!req.body.instructorName)
    return res.status(400).json({ message: "Instructor Name is not define" });
  if (!req.files)
    return res.status(400).json({ message: "Video file not uploaded" });
  let video = "/uploads/videos/lesson/";
  const file = req.files.video;
  console.log(file);
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

  let instructorPic = "/uploads/images/instructor/";
  const pic = req.files?.instructorPic;
  if (pic) {
    const type = pic.mimetype.split("/")[1];
    instructorPic += nanoid() + "." + type;
    pic.mv("." + instructorPic, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        console.log("File  uploadeded successfully");
      }
    });
  }
  const { name, course, description, instructorName, duration } = req.body;

  try {
    const id = v4();
    const lesson = await Lesson.createLesson({
      id,
      name,
      course,
      video,
      description,
      instructorName,
      duration: parseFloat(duration),
      instructorPic,
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

    res.json([...output]);
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

    res.json([...output]);
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
  const duration = req.body?.duration;
  const description = req.body?.description;
  const instructorName = req.body?.instructorName;
  const file = req.files?.video;
  let video = "/uploads/videos/lesson/";
  console.log(file);
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

  let instructorPic = "/uploads/images/instructor/";
  const pic = req.files?.instructorPic;
  if (pic) {
    const type = pic.mimetype.split("/")[1];
    instructorPic += nanoid() + "." + type;
    file.mv("." + instructorPic, (err) => {
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
      duration: parseFloat(duration),
      instructorName,
      instructorPic,
      description,
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
