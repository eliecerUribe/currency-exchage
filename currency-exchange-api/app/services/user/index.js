const bcrypt = require('bcrypt');

const { User } = require('../../../db');

const register = async (user) => {
  const hashCost = 10;
  const {
    email,
    password,
    name,
  } = user;

  try {
    const passwordHash = await bcrypt.hash(password, hashCost);
    const userDocument = new User({
      email, passwordHash, name,
    });
    await userDocument.save();
    return userDocument;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findById = async (id) => {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  register,
  findById,
};
