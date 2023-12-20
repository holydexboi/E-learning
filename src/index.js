const express = require("express");
const cors = require("cors");
const config = require("config");
const winston = require("winston");
const fileupload = require("express-fileupload");
require("express-async-errors");
const error = require("./middleware/error");

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("images"));

app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(fileupload());
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
winston.add(
  winston.createLogger({
    exceptionHandlers: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.prettyPrint(),
          winston.format.json()
        ),
      }),
      new winston.transports.File({ filename: "exception.log" }),
    ],
  })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

require("./routes/activation")(app);
require("./routes/user")(app);
require("./routes/subject")(app);
require("./routes/grade")(app);
require("./routes/instructor")(app);
require("./routes/course")(app);
require("./routes/lesson")(app);
require("./routes/registerCourse")(app);
require("./routes/test")(app);
require("./routes/userTest")(app);
require("./routes/dashboard")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
