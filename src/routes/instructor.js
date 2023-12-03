module.exports = (app) => {
  const instructor = require("../controllers/instructor");
  const auth = require("../middleware/auth");
  const admin = require("../middleware/admin")
  let router = require("express").Router();

  router.post("/instructor/create", instructor.createInstuctor);
  router.put("/instructor/update/:id", instructor.updateInstructor);
  router.put("/instructor/rate/:id", instructor.rateInstructor);
  router.get("/instructor/instructors", instructor.getInstructors);
  router.get("/instructor/:id", instructor.getInstructorById);
  app.use("/api", router);
};
