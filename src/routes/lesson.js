module.exports = (app) => {
  const lesson = require("../controllers/lesson");
  const auth = require("../middleware/auth");
  const admin = require("../middleware/admin")
  let router = require("express").Router();

  router.post("/lesson/create", [auth, admin], lesson.createLesson);
  router.put("/lesson/update/:id", [auth, admin], lesson.updateLesson);
  router.get("/lesson/course/:id", lesson.getLessonByCourse);
  router.get("/lesson/lessons", lesson.getLessons);
  router.get("/lesson/:id", lesson.getLessonById);
  app.use("/api", router);
};
