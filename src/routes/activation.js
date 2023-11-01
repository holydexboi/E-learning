module.exports = (app) => {
  const activation = require("../controllers/activation");
  let router = require("express").Router();

  router.post("/activation/generate", activation.generateCode);
  router.get("/activation/codes", activation.getActivationCodes);
  router.post("/activation/activate", activation.activateUser);
  app.use("/api", router);
};
