const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const { Op } = require("sequelize");
const { User } = db.sequelize.models;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const validUser = await User.findOne({
        where: {
          [Op.and]: [{ id: req.params.id }, { access_token: token }],
        },
      });

      if (!validUser) {
        return res.status(403).send({
          message: "Access denied",
        });
      }
      console.log(user);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const isAdminCheck = (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin == true) return next();
  return res.json({
    message: "Access denied",
  });
};

module.exports = {
  authenticateJWT,
  isAdminCheck,
};
