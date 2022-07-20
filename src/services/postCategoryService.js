const { PostCategory } = require('../database/models');

const postCategoryService = {

  create: async ({ categoryIds, postId }) => {
    const addCategories = categoryIds.map((categoryId) => ({ categoryId, postId }));
    const category = await PostCategory.bulkCreate(addCategories);
    return category;
  },

};

module.exports = postCategoryService;