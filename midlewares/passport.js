const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { getUserById } = require("../services/users");
const { getKeys } = require('../utils/helper')

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getKeys().publicKey,
  algorithms: ["RS256"],
};

/** index.js will pass the global @passport object, and this function will configure it */
const configurePassport = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      // use the `sub` property on the JWT as userId
      try {
        const user = await getUserById(jwt_payload.sub);
        console.log("user-jwt", user);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done({ err }, false);
      }
    })
  );
};

const authenticate = (passport) =>
  passport.authenticate("jwt", { session: false });

module.exports = {
  configurePassport,
  authenticate,
};
