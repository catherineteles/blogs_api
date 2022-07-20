const { Router } = require('express');

const blogPostController = require('../controllers/blogPostController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.validateToken);

router.get('/', blogPostController.list);
router.get('/:id', blogPostController.findById);
router.put('/:id', blogPostController.updatePost);
router.delete('/:id', blogPostController.deletePost);
router.post('/', blogPostController.addNew);

module.exports = router;