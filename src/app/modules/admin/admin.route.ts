import express from 'express';
import { ROLE } from '../../constant/constant';
import authMiddleware from '../../middlewares/authMiddleware';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.post(
  '/users/:userId/block',
  authMiddleware(ROLE.admin),
  AdminControllers.blockUser,
);
router.delete(
  '/blogs/:id',
  authMiddleware(ROLE.admin),
  AdminControllers.deleteBlog,
);

export const AdminRoute = router;
