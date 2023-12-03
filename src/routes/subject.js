module.exports = (app) => {
  const subject = require("../controllers/subject");
  const auth = require("../middleware/auth");
  const admin = require("../middleware/admin")
  let router = require("express").Router();

  router.post("/subject/create", [auth, admin], subject.createSubject);
  router.put("/subject/update/:id", [auth, admin], subject.update);
  router.get("/subject/subjects", subject.getSubject);
  router.get("/subject/:id", subject.getSubjectById);
  app.use("/api", router);
};
