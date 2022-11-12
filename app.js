// environment variable
require("dotenv").config();

//handle async errors
require("express-async-errors");

// requiring security packages

// requiring dependency packages
const express = require("express");
const bodyParser = require("body-parser");

// requiring local files
const connect = require("./db/connectDB");
const routeNotFoundMiddleware = require("./middlewares/route-not-found-middleware");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const dataRouter = require("./routes/data-route");

const app = express();

// package middlewares
app.use(bodyParser.json());

// route middlewares
app.use("/api/v1/data-visualization", dataRouter);

//error handling middlewares
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

// starting server
const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
