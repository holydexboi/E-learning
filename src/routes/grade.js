module.exports = (app) => {
    const grade = require("../controllers/grade");
    let router = require("express").Router();
  
    router.post("/grade/create", grade.createGrade);
    router.put("/grade/update/:id", grade.updateGrade);
    router.get("/grade/grades", grade.getGrades);
    router.get("/grade/:id", grade.getGradeById);
    app.use("/api", router);
  };
  