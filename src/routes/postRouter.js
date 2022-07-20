const { Router } = require('express');

const blogPostController = require('../controllers/blogPostController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.validateToken);

router.post('/', blogPostController.addNew);

module.exports = router;