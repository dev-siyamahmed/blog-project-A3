import express from 'express';
import { UserControllers } from './user.controller';


const router = express.Router();

router.post('/auth/register', UserControllers.createUser);


export const UserRoute = router;
