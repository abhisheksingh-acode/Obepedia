require("express-async-errors");
const statusCodes = require("http-status-codes");

const errorResponse = require("./errorResponse");

const errorHandler = (err, req, res, next) => {
  if (err.name === "MongoServerError") {
    const keyPattern = Object.keys(err.keyPattern);
    const key = keyPattern[0];

    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      code: statusCodes.INTERNAL_SERVER_ERROR,
      msg: `${key} already registered!!`,
      type: err.name,
    });
  }

  if (err.name === "ValidationError") {
    let array_err = Object.values(err.errors)
      .map((item) => item.message)

    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      code: statusCodes.INTERNAL_SERVER_ERROR,
      msg: `${array_err[0]}`,
      type: err.name,
    });
  }

  return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message,
    code: statusCodes.INTERNAL_SERVER_ERROR,
    msg: `Internal server error!!`,
    type: err.name,
  });
};

module.exports = errorHandler;

// export { ErrorCodes };
