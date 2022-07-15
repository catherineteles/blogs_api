const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');
const { runSchema } = require('./errorHandling');

const authService = {
  validateBody: runSchema(Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  })),

  login: async (email, passwordGiven) => {
    const user = await db.User.findOne({ 
      where: { email }, 
    });

    if (!user || user.password !== passwordGiven) {
      const e = new Error('Invalid fields');
      e.name = 'ValidationError';
      e.code = 400;
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