const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const { jwtConfig } = require('../../config');

const { User } = require('../../db');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      session: false,
    },
    async (email, password, done) => {
      try {
        const userDocument = await User.findOne({ email }).exec();
        if (!userDocument) return done('Incorrect Username / Password');

        const passwordsMatch = await bcrypt.compare(
          password,
          userDocument.passwordHash,
        );
        if (!passwordsMatch) return done('Incorrect Username / Password');

        return done(null, userDocument);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    },
    (jwtPayload, done) => {
      if (jwtPayload.expires > Date.now()) {
        return done('jwt expired');
      }

      return done(null, jwtPayload);
    }
  )
);

module.exports = passport;
