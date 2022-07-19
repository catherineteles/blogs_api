const Joi = require('joi');
const { blogPost } = require('../database/models');
const { runSchema } = require('./errorHandling');

const blogPostService = {

  validateBody: runSchema(Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required().min(6),
        categoryIds: Joi.array().required(),
    })),

  create: async ({ title, content, userId }) => {
    const category = await blogPost.create({ title, content, userId });
    return category;
  },

};

module.exports = blogPostService;