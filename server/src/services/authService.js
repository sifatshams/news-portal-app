import cloudinary from '../config/cloudinaryConfig.js';
import User from '../models/userModel.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';

const registerUserService = async (data, file) => {
  const { name, email, password } = data;

  // if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists!');
  }

  // set default value
  let profileImage = {
    url: '',
    publicId: null,
  };

  // if img file exists
  if (file) {
    const result = await uploadToCloudinary(file.buffer, 'profiles');

    profileImage = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  const user = await User.create({
    name,
    email,
    password,
    profileImage,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
  };
};

const uploadProfileImageService = async (userId, file) => {
  const user = await User.findById(userId);

  // validation
  if (!user) {
    throw new Error('User not found');
  }

  // delete old image
  if (user.profileImage?.publicId) {
    await cloudinary.uploader.destroy(user.profileImage.publicId);
  }

  if (!file) {
    throw new Error('Image file is required!');
  }

  const result = await uploadToCloudinary(file.buffer, 'profiles');

  user.profileImage = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  await user.save();
  return user;
};

const loginUserService = async (data) => {
  const { email, password } = data;

  // find user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password!', 401);
  }

  // match the password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password!', 401);
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
  };
};

const authServices = {
  registerUserService,
  loginUserService,
  uploadProfileImageService,
};

export default authServices;
