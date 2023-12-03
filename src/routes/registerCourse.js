module.exports = (app) => {
  const userCourse = require("../controllers/registerCourse");
  const auth = require("../middleware/auth");
  let router = require("express").Router();

  router.post("/user_course/create", auth, userCourse.register_course);
  router.get("/user_course/get", auth, userCourse.getUserCourse);
  router.delete("/user_course/delete/:id", auth, userCourse.delete_Course);
  router.put(
    "/user_course/update/progress",
    auth,
    userCourse.update_course_progress
  );
  app.use("/api", router);
};
