module.exports = (app) => {
  const test = require("../controllers/test");
  const auth = require("../middleware/auth");
  const admin = require("../middleware/admin")
  let router = require("express").Router();

  router.post("/test/create", [auth, admin], test.createTest);
  router.put("/test/update/:id", [auth, admin], test.updateTest);
  router.get("/test/lesson/:id", test.getTestByLesson);
  router.get("/test/questions", test.getTests);
  router.get("/test/tests", test.getAvailableTests);
  router.get("/test/:id", [auth, admin], test.getTestById);
  app.use("/api", router);
};
