const express = require("express");
const cors = require("cors");
const config = require("config")
const winston = require("winston");
require('express-async-errors')
const error = require("./middleware/error");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
  }

  app.use(cors(corsOptions));

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  winston.add( winston.createLogger({
    exceptionHandlers: [
        new winston.transports.Console({level: 'info', format: winston.format.combine(winston.format.colorize(), winston.format.simple(), winston.format.prettyPrint(), winston.format.json())}),
        new winston.transports.File({filename: 'exception.log'}),
    ]
}))
    
process.on('unhandledRejection', (ex) => {
    
    throw ex
})


  const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});