require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const { User } = db.sequelize.models;
const { Op } = require("sequelize");

const authenticateJWT = (req, res, next) => {
  //
  //  Take header authorization from request
  //

  const authHeader = req.headers.authorization;
  const username = req.params.username || req.body.username || 'th'
  
  //
  //  if header authorization exist
  // take the token string from it
  //
  
  
  console.log(authHeader);
  if (authHeader) {
    let token = authHeader.split(" ")[1];
    //
    //  Checks if token exists else sends dack an error
    //
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
      

    }

    //
    //  Varify token
    //
    jwt.verify(token, 
      process.env.ACCESS_TOKEN_SECRET, 
      async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      //
      //  Find user based on the params.id
      //
    
      const validUser = await User.findOne({
        where: {
          [Op.and]: [{ username: username  }, { access_token: token }],
        },
      });
      //
      //  Varify the existance of the user
      //
      if (!validUser) {
        return res.status(403).send({
          message: "Access denied",
        });
      }
      //
      //  saves user to the req
      //
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
