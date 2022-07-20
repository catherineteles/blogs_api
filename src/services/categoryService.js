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
    const category = await Category.create({ name });
    return category;
  },

  list: async () => {
    const categories = await Category.findAll();
    return categories;
  },

  exists: async (id) => {
    const category = await Category.findByPk(id);

    if (!category) {
      const e = new Error('"categoryIds" not found');
      e.name = 'ValidationError';
      e.code = 400;
      throw e;
    }
    return true;
  },

};

module.exports = categoryService;