const Joi = require('joi');
const { User } = require('../database/models');

const usersService = {
  checkIfUserExist: async ({ email }) => {
    const user = await User.findOne({ 
        where: { email }, 
    });
    if (user) {
        const e = new Error('User already registered');
        e.name = 'ValidationError';
        e.code = 409;
        throw e;
    }
    return true;
  },
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      displayName: Joi.string().min(8),
      image: Joi.string(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
        error.code = 400;
        throw error;
    }
    return value;
  },
  create: async ({ email, password, displayName, image }) => {
    const user = await User.create({ email, password, displayName, image });
    return user;
  },

};

module.exports = usersService; 