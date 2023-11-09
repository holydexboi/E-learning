module.exports = (app) => {
  const lesson = require("../controllers/lesson");
  let router = require("express").Router();

  router.post("/lesson/create", lesson.createLesson);
  router.put("/lesson/update/:id", lesson.updateLesson);
  router.get("/lesson/course/:id", lesson.getLessonByCourse);
  router.get("/lesson/lessons", lesson.getLessons);
  router.get("/lesson/:id", lesson.getLessonById);
  app.use("/api", router);
};
