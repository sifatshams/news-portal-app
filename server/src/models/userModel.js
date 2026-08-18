import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const imgaeSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: '',
    },
    publicId: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profileImage: {
      type: imgaeSchema,
      default: () => ({ url: '', publicId: null }),
    },
  },
  { timestamps: true, versionKey: false },
);

// hash the password
userSchema.pre('save', async function () {
  // check if pass is not modified then return...
  if (!this.isModified('password')) return;
  try {
    // generate the salt
    const salt = await bcrypt.genSalt(12);
    // now hash the password
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// compare the password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
