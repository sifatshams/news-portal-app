import express from 'express';

import authControllers from '../controllers/authController.js';

import { protect } from '../middlewares/authMiddlware.js';

import { upload } from '../middlewares/multerMiddleware.js';

const authRouter = express.Router();

// register
authRouter.post(
  '/register',
  upload.single('profileImage'),
  authControllers.registerUserController,
);

// login
authRouter.post('/login', authControllers.loginUserController);

// logout
authRouter.post('/logout', protect, authControllers.logoutUserController);

// upload profile image
authRouter.post(
  '/profile-image',
  protect,
  upload.single('image'),
  authControllers.uploadProfileImageController,
);

export default authRouter;
