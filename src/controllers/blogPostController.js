const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const blogPostService = require('../services/blogPostService');
const authService = require('../services/authService');
const postCategoryService = require('../services/postCategoryService');

const blogPosController = {
    addNew: async (req, res) => {
        try {
          const { title, content, categoryIds } = req.body;
          const { authorization } = req.headers;

          const dataToken = authService.validateToken(authorization);
          const userId = dataToken.id;
      
          await sequelize.transaction(async (t) => {
            const post = await blogPostService.create({
                title, content, userId,
            }, { transaction: t });
      
            await Promise.all(categoryIds.map((categoryId) => (
                postCategoryService.create({
              categoryId, postId: post.id,
            }, { transaction: t }))));
      
            return res.status(201).json(post);
          });
        } catch (e) {
          res.status(e.code).json(e.message);
        }
      },
};

module.exports = blogPosController;