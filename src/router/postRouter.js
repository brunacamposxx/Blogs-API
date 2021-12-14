const router = require('express').Router();
const postController = require('../controllers/postController');
const tokenValidation = require('../middlewares/tokenValidation');
const { 
  postValidationError, 
  categoryExistsValidation,
  requiredFields,
} = require('../middlewares/blogPostsValidationError');

router.put('/:id', tokenValidation, requiredFields, postController.updatePost);

router.post('/', 
tokenValidation, 
postValidationError, 
categoryExistsValidation,
postController.createPost);
router.get('/', tokenValidation, postController.getPosts);
router.get('/:id', tokenValidation, postController.getPostById);

module.exports = router;
