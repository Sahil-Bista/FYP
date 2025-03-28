import {Router} from 'express';
import { getAllUsers, getSpecificUser, login, logout, signup, forgotPassword, resetPassword } from "../controllers/usercontroller.js";
import authentication from '../middlewares/authentication.js';

export const userRouter = Router();

userRouter.post('/login', login)
userRouter.post('/register',signup)
userRouter.get('/all-users',authentication, getAllUsers)
userRouter.get('/:userId',authentication, getSpecificUser)
userRouter.post('/logout', logout )
userRouter.post('/forgetPassword', forgotPassword)
userRouter.post("/reset-password/:token", resetPassword)

