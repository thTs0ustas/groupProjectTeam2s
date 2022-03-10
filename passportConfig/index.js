const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const { User } = db.sequelize.models;

const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    User.findOne({ where: { username }, raw: true })
      .then(async (user) => {
        console.log(user);
        if (user == null) {
          return done(null, false, { message: "No user with that email" });
        }

        if (await bcrypt.compare(password, user.password)) {
          console.log("Nice");
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      })
      .catch((e) => done(e));
  };

  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser((user, done) => {
    return done(null, user.id);
  });
}

module.exports = initialize;
