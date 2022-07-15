const categoryService = require('../services/categoryService');

const categoriesController = {
   create: async (req, res) => {
    const { name } = categoryService.validateBody(req.body);
    
    const newCategory = await categoryService.create({ name });

    res.status(201).json(newCategory);
  },

  list: async (req, res) => {
    const categories = await categoryService.list();
    res.status(200).json(categories);
  },

};

module.exports = categoriesController;