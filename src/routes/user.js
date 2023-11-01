module.exports = (app) => {
  const user = require("../controllers/user");
  const auth = require("../middleware/auth")
  let router = require("express").Router();

  router.post("/user/create", user.createUser);
  router.post("/user/login", user.login);
  router.put("/user/update/profile", auth, user.update)
  app.use("/api", router);
};