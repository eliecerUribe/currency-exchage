const joi = require('joi');

const userSchema = {
  email: joi.string().email().required(),
  password: joi.string().required(),
};

const validatePayload = (req, res, next) => {
  let schema = {};
  if (req.url.includes('/login')) schema = userSchema;

  const { error } = ''; // joi.validate(req.body, schema);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details,
      message: 'You need to send valid data.',
    });
  }

  return next();
};

module.exports = validatePayload;
