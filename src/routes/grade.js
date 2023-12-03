module.exports = (app) => {
  const grade = require("../controllers/grade");
  const auth = require("../middleware/auth");
  const admin = require("../middleware/admin");
  let router = require("express").Router();

  router.post("/grade/create", [auth, admin], grade.createGrade);
  router.put("/grade/update/:id", [auth, admin], grade.updateGrade);
  router.get("/grade/grades", grade.getGrades);
  router.get("/grade/:id", grade.getGradeById);
  app.use("/api", router);
};
