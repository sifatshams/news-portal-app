import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  IoArrowForward,
  IoLockClosedOutline,
  IoMailOutline,
} from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

import { loginApi } from '../api/authApi';
import useAuthStore from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.data, data.token);
      toast.success('Welcome back, Chief!');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 border border-gray-100 relative z-10">
        {/* Branding/Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-200 rotate-3 group hover:rotate-0 transition-transform">
            <IoLockClosedOutline size={30} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Welcome <span className="text-sky-600">Back</span>
          </h1>
          <p className="text-gray-400 mt-2 font-medium">
            Enter your credentials to access your news room.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* EMAIL INPUT */}
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
                className={`w-full bg-gray-50 border-none ring-1 ${errors.email ? 'ring-red-400' : 'ring-gray-200'} p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all placeholder:text-gray-300`}
                {...register('email', { required: 'Email is required!' })}
              />
            </div>
            {errors?.email && (
              <p className="text-red-500 text-xs font-bold ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                size={18}
                className="text-xs font-bold text-sky-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-600 transition-colors">
                <IoLockClosedOutline size={20} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full bg-gray-50 border-none ring-1 ${errors.password ? 'ring-red-400' : 'ring-gray-200'} p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all placeholder:text-gray-300`}
                {...register('password', { required: 'Password is required!' })}
              />
            </div>
            {errors?.password && (
              <p className="text-red-500 text-xs font-bold ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            disabled={isPending}
            className="w-full flex cursor-pointer items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isPending ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-500 font-medium">
            New on our platform?
            <Link
              to="/register"
              className="text-sky-600 font-black ml-2 hover:underline tracking-tight"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
