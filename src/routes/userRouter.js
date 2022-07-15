const { Router } = require('express');

const usersController = require('../controllers/userController');

const router = Router();

router.post('/', usersController.create);

module.exports = router;