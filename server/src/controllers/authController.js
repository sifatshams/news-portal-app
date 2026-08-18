import authServices from '../services/authService.js';
import { generateToken } from '../utils/jwtUtil.js';

const registerUserController = async (req, res) => {
  try {
    const user = await authServices.registerUserService(req.body, req.file);

    // jwt token
    const token = generateToken(user._id);

    // success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUserController = async (req, res) => {
  try {
    const user = await authServices.loginUserService(req.body);

    // jwt token
    const token = generateToken(user._id);
    // success response
    res.status(200).json({
      success: true,
      message: 'User logged in successfully!',
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logoutUserController = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, message: 'User successfully logged out!' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error!',
    });
  }
};

const uploadProfileImageController = async (req, res) => {
  try {
    const user = await authServices.uploadProfileImageService(
      req.user.id,
      req.file,
    );

    // success response
    res.json({
      message: 'Profile image updated!',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const authControllers = {
  registerUserController,
  loginUserController,
  logoutUserController,
  uploadProfileImageController,
};

export default authControllers;
