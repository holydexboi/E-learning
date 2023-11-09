module.exports = (app) => {
  const subject = require("../controllers/subject");
  let router = require("express").Router();

  router.post("/subject/create", subject.createSubject);
  router.put("/subject/update/:id", subject.update);
  router.get("/subject/subjects", subject.getSubject);
  router.get("/subject/:id", subject.getSubjectById);
  app.use("/api", router);
};
