const Sequelize = require('sequelize');

const { Op } = Sequelize;

const Joi = require('joi');
const { BlogPost, User, Category } = require('../database/models');
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

  validateUpdate: (data) => {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'Some required fields are missing',
      }),
      content: Joi.string().required().messages({
        'string.empty': 'Some required fields are missing',
      }),
    });

    const { error, value } = schema.validate(data);

    if (error) {
        error.code = 400;
        throw error;
    }
    return value;
  },

  list: async () => {
    const blogPosts = await BlogPost.findAll({ include: [{ 
      model: User,
      as: 'user', 
      attributes: { exclude: ['password'] },
    },
    { model: Category,
      as: 'categories',
   }],
  });
    return blogPosts;
  },

  findById: async (id) => {
    const blogPost = await BlogPost.findByPk(id, { include: [{ 
      model: User,
      as: 'user', 
      attributes: { exclude: ['password'] },
    },
    { model: Category,
      as: 'categories',
   }],
  });
    return blogPost;
  },

  verifyUser: async (id, user) => {
    const blogPost = await BlogPost.findByPk(id);
    if (blogPost.userId !== user) {
      const e = new Error('Unauthorized user');
      e.name = 'UnauthorizedError';
      throw e;
    }
  },

  checkIfExists: async (id) => {
  const blogPost = await BlogPost.findByPk(id);
  if (!blogPost) {
    const e = new Error('Post does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
    return id;
  }, 

  updatePost: async ({ id, title, content }) => {
    const [updated] = await BlogPost.update(
      {
        title, content, updated: new Date(),
      },
      {
        where: { id },
      },
  );
   return updated;
  },

  deletePost: async (id) => {
     await BlogPost.destroy({
      where: { id },
    });
  },

  searchTerm: async (query) => {
    const blogPosts = await BlogPost.findAll({
      include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' }],
      where: { 
        [Op.or]: [
            { title: { [Op.like]: `${query}%` } }, 
            { content: { [Op.like]: `${query}%` } }, 
        ],
      },
    });
    return blogPosts;
  },
  
};

module.exports = blogPostService;