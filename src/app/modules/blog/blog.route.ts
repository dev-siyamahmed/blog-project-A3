
import express from 'express';
import { BlogControllers } from './blog.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../constant/constant';


const router = express.Router();

router.post('/', authMiddleware(ROLE.user), BlogControllers.createBlog);

export const BlogRoute = router;
