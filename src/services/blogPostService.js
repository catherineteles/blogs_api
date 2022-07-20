const Joi = require('joi');
const { BlogPost } = require('../database/models');
const postCategoryService = require('./postCategoryService');

const blogPostService = {
  create: async ({ title, content, userId, categoryIds }) => {
  const post = await BlogPost.create({ title, content, userId });
      
  await postCategoryService.create({
              categoryIds, postId: post.id,
            });
      
  return post;
  },

  validateBody: (data) => {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'Some required fields are missing',
      }),
      content: Joi.string().required().messages({
        'string.empty': 'Some required fields are missing',
      }),
      categoryIds: Joi.array().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
        error.code = 400;
        throw error;
    }
    return value;
  },

};

module.exports = blogPostService;