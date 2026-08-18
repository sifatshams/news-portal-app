import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  IoArrowBackOutline,
  IoCloudUploadOutline,
  IoNewspaperOutline,
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { createNewsApi } from '../../api/newsApi';

const CreateNews = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: createNewsApi,
    onSuccess: () => {
      toast.success('News created successfully!', {
        icon: '📰',
        style: {
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['news'],
      });
      navigate('/news');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    },
  });

  const selectedImages = watch('images');

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('content', data.content);

    if (data.images) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    }
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 cursor-pointer flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold transition-colors group"
        >
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-indigo-50 transition-colors">
            <IoArrowBackOutline size={20} />
          </div>
          Back to Previous
        </button>
        {/* header */}
        <div className="flex items-center gap-4 mb-12 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="p-3 bg-black text-white rounded-xl">
            <IoNewspaperOutline size={36} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Create Latest <span className="text-indigo-600">News</span>
            </h1>
            <p className="text-slate-600 mt-1">
              Publish your latest updates and stories to the world.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  News Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a catchy headline"
                  className="w-full border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g., Politics, Tech, Sports"
                  className="w-full border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                  {...register('category', {
                    required: 'Category is required',
                  })}
                />
                {errors.category && (
                  <p className="text-red-500 text-xs">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Content Body
              </label>
              <textarea
                rows="10"
                placeholder="Write your news article here..."
                className="w-full border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition resize-none"
                {...register('content', { required: 'Content is required' })}
              />
              {errors.content && (
                <p className="text-red-500 text-xs">{errors.content.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Upload Images
              </label>
              <div className="relative group">
                <input
                  type="file"
                  multiple
                  id="images"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  {...register('images')}
                />
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center group-hover:border-indigo-400 group-hover:bg-indigo-50 transition-all flex flex-col items-center justify-center gap-3">
                  <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full group-hover:scale-110 transition-transform">
                    <IoCloudUploadOutline size={32} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800">
                    Drag & Drop or Click to Upload
                  </h4>
                  <p className="text-sm text-slate-500">
                    You can select multiple images for the news gallery.
                  </p>

                  {selectedImages?.length > 0 && (
                    <span className="mt-3 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-600 text-white shadow-md">
                      {selectedImages.length}{' '}
                      {selectedImages.length === 1 ? 'image' : 'images'}{' '}
                      selected
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex cursor-pointer items-center gap-3 bg-black text-white px-10 py-4.5 rounded-2xl text-lg font-bold shadow-lg hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <IoNewspaperOutline size={22} />
                    Publish News Article
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNews;
