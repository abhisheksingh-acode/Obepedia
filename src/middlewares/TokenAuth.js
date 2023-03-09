// import jwt from 'jsonwebtoken';
// import { StatusCodes } from 'http-status-codes';
const StatusCodes = require("http-status-codes");
const Dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

Dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(500).send({
      message: "Access denied: you're not logged in.",
    });
  }

  jwt.verify(token, "This is Token Key", (err, decoded) => {
    if (err) {
      res.status(404).json({
        ...err,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

//  export default verifyToken;
module.exports = verifyToken;
