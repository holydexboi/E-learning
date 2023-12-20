module.exports = (app) => {
  const activation = require("../controllers/activation");
  const auth = require("../middleware/auth");
  const admin = require("../middleware/admin");
  let router = require("express").Router();

  router.post("/activation/generate", [auth, admin], activation.generateCode);
  router.get("/activation/codes", [auth, admin], activation.getActivationCodes);
  router.post("/activation/activate", auth, activation.activateUser);
  app.use("/api", router);
};
