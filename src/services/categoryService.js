const Joi = require('joi');
const { Category } = require('../database/models');

const categoryService = {
  
  validateBody: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
        error.code = 400;
        throw error;
    }
    return value;
  },

  create: async ({ name }) => {
    const user = await Category.create({ name });
    return user;
  },

};

module.exports = categoryService;