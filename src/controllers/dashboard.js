const User = require("../models/user");
const Subject = require("../models/subject");
const registerCourse = require("../models/registerCourse");

async function dashboardOverview(req, res) {
  try {
    const allStudent = await User.getStudentsCount();
    const allSubject = await Subject.getSubjectCount();
    const studentPerCourse = await registerCourse.getUserPerCourseCount();

    res.json({
      noOfStudent: allStudent[0],
      noOfSubject: allSubject[0],
      studentPerCourse,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getAllStudents(req, res) {
  try {
    const allStudent = await User.getStudents();

    res.json({ Students: allStudent });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  dashboardOverview,
  getAllStudents,
};
