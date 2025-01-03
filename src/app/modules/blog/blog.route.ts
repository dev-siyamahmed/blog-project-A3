import express from 'express';
import { BlogControllers } from './blog.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../constant/constant';
import validateRequest from '../../middlewares/validateRequest';
import { BlogsValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogsValidation.createBlogValidationSchema),
  authMiddleware(ROLE.user),
  BlogControllers.createBlog,
);

router.patch(
  '/:id',
  validateRequest(BlogsValidation.updateBlogValidationSchema),
  authMiddleware(ROLE.user),
  BlogControllers.updateBlog,
);
router.delete('/:id', authMiddleware(ROLE.user), BlogControllers.deleteBlog);
router.get('/', BlogControllers.getAllBlog);

export const BlogRoute = router;
