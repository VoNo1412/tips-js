const LocalStrategy = require('passport-local').Strategy;
const userService = require("../service/user.service");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      userService.getUserByUsername(username).then(user => {
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        if (!userService.verifyPassword({ username, password })) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user.dataValues);
      }).catch(err => done(null, false, { message: err }));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    userService.getUserById(id).then(user => {
      done(null, user.dataValues);
    }).then(err => done(null, false, { message: err }));
  });
};
