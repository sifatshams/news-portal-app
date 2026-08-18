import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  IoArrowBackOutline,
  IoCloudUploadOutline,
  IoSaveOutline,
} from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleNewsApi, updateNewsApi } from '../../api/newsApi';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: news, isLoading } = useQuery({
    queryKey: ['single-news', id],
    queryFn: () => getSingleNewsApi(id),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    values: {
      title: news?.title,
      category: news?.category,
      content: news?.content,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateNewsApi,
    onSuccess: () => {
      toast.success('News updated successfully!', {
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
      });
      navigate('/my-news');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Update failed');
    },
  });

  const selectedImages = watch('images');

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('content', data.content);

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    }

    mutate({ id, formData });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <IoArrowBackOutline size={20} /> Back
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Edit <span className="text-indigo-600">News</span>
          </h1>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 sm:p-12 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Headline
                </label>
                <input
                  type="text"
                  placeholder="News title"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none"
                  {...register('category', {
                    required: 'Category is required',
                  })}
                />
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                News Content
              </label>
              <textarea
                rows="10"
                placeholder="Write your content here..."
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none resize-none"
                {...register('content', { required: 'Content is required' })}
              />
              {errors.content && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/*file upload design*/}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Update Images (Optional)
              </label>
              <div className="relative group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  {...register('images')}
                />
                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center group-hover:border-indigo-500 group-hover:bg-indigo-50/50 transition-all flex flex-col items-center justify-center">
                  <div className="bg-indigo-100 text-indigo-600 p-4 rounded-2xl mb-4 group-hover:scale-110 transition">
                    <IoCloudUploadOutline size={30} />
                  </div>
                  <p className="font-semibold text-gray-800">Change Images</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to keep current images
                  </p>

                  {selectedImages?.length > 0 && (
                    <div className="mt-4 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full animate-bounce">
                      {selectedImages.length} images selected
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/*btn */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-4 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                className="flex-[2] cursor-pointer bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-lg disabled:opacity-50"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating...
                  </span>
                ) : (
                  <>
                    <IoSaveOutline size={20} />
                    Save Changes
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

export default EditNews;
