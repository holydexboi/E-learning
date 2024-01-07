module.exports = (app) => {
  const course = require("../controllers/course");
  const auth = require("../middleware/auth")
const upload = require('../middleware/upload');
  const admin = require("../middleware/admin")
  let router = require("express").Router();

  router.post("/course/create", [auth, admin], course.createCourse);
  router.put("/course/update/:id", [auth, admin], course.updateCourse);
  router.get("/course/grade/:id", course.getCourseByGrade);
  router.get("/course/courses", course.getCourses);
  router.get("/course/:id", course.getCourseById);
  app.use("/api", router);
};
