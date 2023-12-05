const { v4 } = require("uuid");
const { nanoid } = require("nanoid");
const UserCourse = require("../models/registerCourse");

UserCourse.createTable();

async function register_course(req, res) {
  const user = req.user?._id;
  if (!req.body.courses)
    return res.status(400).json({ message: "Course Ids is not define" });
  console.log(user);
  const { courses } = req.body;

  courses.forEach(async (course) => {
    try {
      const id = v4();
      const user_course = await UserCourse.register({
        id,
        user,
        course,
        progress: 0,
        status: "inprogress",
        lessons: "",
      });
    } catch (err) {
      console.log("err", err.message);
      res.status(500).json({
        message: "Internal Error",
        error: err.message,
      });
    }
  });

  res.json({ message: "Registered courses Successfully" });
}

async function getUserCourse(req, res) {
  const userId = req.user?._id;
  try {
    const user_course = await UserCourse.getRegisterCourse(userId);

    res.json([...user_course]);
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function delete_Course(req, res) {
  const id = req.params.id;

  try {
    const user_course = await UserCourse.removeCourse(id);

    res.json({ ...user_course[0] });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function update_course_progress(req, res) {
  const user = req.user._id;

  if (!req.body.lessonId)
    return res.status(400).json({ message: "Lesson Id is not define" });

  if (!req.body.course)
    return res.status(400).json({ message: "Course Id is not define" });
  const { lessonId, course } = req.body;
  try {
    const user_course = await UserCourse.updateProgress({
      user,
      lessonId,
      course,
    });
    if (!user_course[0])
      return res.status(400).json({ message: "User has no related course" });

    res.json({ ...user_course[0] });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

module.exports = {
  register_course,
  getUserCourse,
  delete_Course,
  update_course_progress,
};
