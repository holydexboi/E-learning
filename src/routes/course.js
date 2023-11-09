module.exports = (app) => {
  const course = require("../controllers/course");
  let router = require("express").Router();

  router.post("/course/create", course.createCourse);
  router.put("/course/update/:id", course.updateCourse);
  router.get("/course/grade/:id", course.getCourseByGrade);
  router.get("/course/courses", course.getCourses);
  router.get("/course/:id", course.getCourseById);
  app.use("/api", router);
};
