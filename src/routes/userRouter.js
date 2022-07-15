const { Router } = require('express');

const usersController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = Router();

router.post('/', usersController.create);

router.use(authController.validateToken);

router.get('/', usersController.list);

module.exports = router;