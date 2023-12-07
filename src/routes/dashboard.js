module.exports = (app) => {
    const Dashoard = require("../controllers/dashboard");
    const auth = require("../middleware/auth");
    const admin = require("../middleware/admin");
    let router = require("express").Router();
  
    router.get("/dashboard/overview", [auth, admin], Dashoard.dashboardOverview);
    router.get("/dashboard/allStudents", [auth, admin], Dashoard.getAllStudents);
    app.use("/api", router);
  };
  