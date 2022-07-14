const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  },

  login: async (email, passwordGiven) => {
    const user = await db.User.findOne({ 
      where: { email }, 
    });

    if (!user || user.password !== passwordGiven) {
      const e = new Error('Invalid fields');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const { password, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },

  validateToken: (token) => {
    const data = jwtService.validateToken(token);

    return data;
  },
};

module.exports = authService;