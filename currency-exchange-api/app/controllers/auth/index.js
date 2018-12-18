const jwt = require('jsonwebtoken');
const moment = require('moment');
const passport = require('passport');

const { jwtConfig } = require('../../../config');
const { userService } = require('../../services');

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    return res.status(200).json({ ...user, success: true });
  } catch (e) {
    return res.status(400).json(e);
  }
};

const login = (req, res) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({ success: false, error });
    }

    const payload = {
      email: user.email,
      iat: moment().unix(),
      expires: moment().add(jwtConfig.expireTime, 'minutes').unix(),
      user_id: user.id,
    };

    return req.login(payload, { session: false }, (err) => {
      if (err) {
        return res.status(400).send({ success: false, error: err });
      }

      const token = jwt.sign(JSON.stringify(payload), jwtConfig.secret);

      res.cookie('jwt', token, { httpOnly: true, secure: true });
      return res
        .status(200)
        .send({ success: true, email: payload.email, token });
    });
  })(req, res);
};

module.exports = {
  register,
  login,
};
