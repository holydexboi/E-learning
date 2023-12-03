module.exports = (app) => {
  const userTest = require("../controllers/userTest");
  const auth = require("../middleware/auth");
  let router = require("express").Router();

  router.post("/user_test/taketest", auth, userTest.takeTest);
  router.get("/user_test/get", auth, userTest.getUserTest);
  router.put("/user_test/update/score/:id", auth, userTest.update_score);
  app.use("/api", router);
};
