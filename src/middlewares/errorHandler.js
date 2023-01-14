require("express-async-errors");
const statusCodes = require("http-status-codes");

const errorResponse = require("./errorResponse");

const errorHandler = (err, req, res, next) => {
  switch (err.message) {
    case ErrorCodes.USER.UNAUTHORIZED:
      return res
        .status(statusCodes.UNAUTHORIZED)
        .json(
          errorResponse(
            "Unauthorized",
            statusCodes.UNAUTHORIZED,
            "you're not authorized"
          )
        );
      break;
    case ErrorCodes.OTP.INVALID:
      return res
        .status(statusCodes.NOT_ACCEPTABLE)
        .json(
          errorResponse(
            "Not Acceptable",
            statusCodes.NOT_ACCEPTABLE,
            "Invalid OTP provided"
          )
        );
      break;
    case ErrorCodes.OTP.FAILED:
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json(
          errorResponse(
            "Internal Server Error",
            statusCodes.INTERNAL_SERVER_ERROR,
            "something went wrong with OTP, try again"
          )
        );
      break;
    case ErrorCodes.USER.DUPLICATE:
      return res
        .status(statusCodes.NOT_ACCEPTABLE)
        .json(
          errorResponse(
            "Not Acceptable",
            statusCodes.NOT_ACCEPTABLE,
            "user already registered"
          )
        );
      break;
    case ErrorCodes.USER.UNVERIFIED:
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json(
          errorResponse(
            ErrorCodes.USER.UNVERIFIED,
            statusCodes.INTERNAL_SERVER_ERROR,
            "Account is not approved by admin."
          )
        );
      break;
    case ErrorCodes.USER.DISABLED:
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json(
          errorResponse(
            ErrorCodes.USER.DISABLED,
            statusCodes.INTERNAL_SERVER_ERROR,
            "Account is disabled for some reason."
          )
        );
      break;

    default:
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json(
          errorResponse(
            "Internal Server Error",
            statusCodes.INTERNAL_SERVER_ERROR,
            err.message
          )
        );
      break;
  }
};


module.exports = errorHandler;

