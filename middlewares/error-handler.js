const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (error, req, res, next) => {
  let customError = {
    message: error.message || "Something went Wrong",
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
