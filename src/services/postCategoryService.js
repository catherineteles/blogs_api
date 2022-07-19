const { postCategory } = require('../database/models');

const postCategoryService = {

  create: async ({ categoryId, postId }) => {
    const category = await postCategory.create({ categoryId, postId });
    return category;
  },

};

module.exports = postCategoryService;