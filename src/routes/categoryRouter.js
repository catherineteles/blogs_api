const { Router } = require('express');

const categoriesController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.validateToken);

router.post('/', categoriesController.create);

module.exports = router;