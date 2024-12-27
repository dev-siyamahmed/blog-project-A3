import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { BlogRoute } from '../modules/blog/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/blogs',
    route: BlogRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
