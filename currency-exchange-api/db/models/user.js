const mongoose = require('mongoose');
const { isEmail } = require('validator');

const { Schema } = mongoose;

mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    dropDups: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: { validator: isEmail, message: 'Invalid email' }
  },
  passwordHash: { // salted and hashed using bcrypt
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
