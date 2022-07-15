const categoryService = require('../services/categoryService');

const categoriesController = {
   create: async (req, res) => {
    const { name } = categoryService.validateBody(req.body);
    
    const newCategory = await categoryService.create({ name });

    res.status(201).json(newCategory);
  },

};

module.exports = categoriesController;