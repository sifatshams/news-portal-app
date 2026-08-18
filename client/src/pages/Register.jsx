import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  IoArrowForward,
  IoCameraOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../api/authApi';

const Register = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  // image preview
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);

    if (data.profileImage && data.profileImage[0]) {
      formData.append('profileImage', data.profileImage[0]);
    }

    mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>

      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 border border-gray-100 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Create <span className="text-sky-600">Account</span>
          </h1>
          <p className="text-gray-400 mt-2 font-medium">
            Join our global network of news contributors.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* PROFILE IMAGE UPLOAD */}
          <div className="flex flex-col items-center mb-4">
            <label className="relative cursor-pointer group">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                {...register('profileImage', {
                  onChange: (e) => handleImagePreview(e),
                })}
              />
              <div className="w-28 h-28 rounded-[2rem] overflow-hidden ring-4 ring-gray-50 group-hover:ring-sky-500 transition-all shadow-xl bg-gray-100 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <IoPersonOutline size={40} className="text-gray-300" />
                )}
              </div>
              {/* Camera Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <IoCameraOutline size={24} className="text-white" />
              </div>
            </label>
            <p className="text-xs font-bold text-gray-400 mt-3 uppercase tracking-widest">
              Upload Profile Photo
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* NAME */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-600 transition-colors">
                  <IoPersonOutline size={20} />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full bg-gray-50 border-none ring-1 ${errors.name ? 'ring-red-400' : 'ring-gray-200'} p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all`}
                  {...register('name', { required: 'Name is required!' })}
                />
              </div>
              {errors?.name && (
                <p className="text-red-500 text-xs font-bold ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-600 transition-colors">
                  <IoMailOutline size={20} />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full bg-gray-50 border-none ring-1 ${errors.email ? 'ring-red-400' : 'ring-gray-200'} p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all`}
                  {...register('email', { required: 'Email is required!' })}
                />
              </div>
              {errors?.email && (
                <p className="text-red-500 text-xs font-bold ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-600 transition-colors">
                  <IoLockClosedOutline size={20} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full bg-gray-50 border-none ring-1 ${errors.password ? 'ring-red-400' : 'ring-gray-200'} p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all`}
                  {...register('password', {
                    required: 'Password is required!',
                    minLength: { value: 6, message: 'At least 6 characters' },
                  })}
                />
              </div>
              {errors?.password && (
                <p className="text-red-500 text-xs font-bold ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* REGISTER BUTTON */}
          <button
            disabled={isPending}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold transition-all cursor-pointer shadow-xl active:scale-[0.98] disabled:opacity-70 group"
          >
            {isPending ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Create Account</span>
                <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-500 font-medium">
            Already have an account?
            <Link
              to="/login"
              className="text-sky-600 font-black ml-2 hover:underline tracking-tight"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
