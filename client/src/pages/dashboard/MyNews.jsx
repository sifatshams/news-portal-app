import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit3, Newspaper, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast'; // টোস্ট দেখানোর জন্য
import { Link } from 'react-router-dom';
import { deleteNewsApi, getAllNewsApi } from '../../api/newsApi'; // deleteNewsApi ইমপোর্ট করো
import useAuthStore from '../../store/authStore';

const MyNews = () => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: news, isLoading } = useQuery({
    queryKey: ['all-news'],
    queryFn: getAllNewsApi,
  });

  const { mutate: deleteNews } = useMutation({
    mutationFn: deleteNewsApi,
    onSuccess: () => {
      toast.success('Article deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['all-news'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to delete');
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteNews(id);
    }
  };

  const myNews = news?.data?.filter((item) => item.author === user._id);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              My News <span className="text-sky-600">Articles</span>
            </h1>
            <p className="mt-2 text-gray-500 text-lg">
              Manage and organize your published news and insights.
            </p>
          </div>

          <Link
            to="/create-news"
            className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-sky-200 active:scale-95"
          >
            <Plus size={20} />
            Create News
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 bg-gray-200 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        )}

        {/* News Grid */}
        {!isLoading && myNews?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myNews.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={item?.images?.[0]?.url}
                    alt={item?.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-sky-600 transition-colors">
                    {item?.title}
                  </h2>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-auto pt-6">
                    <Link
                      to={`/update-news/${item._id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
                    >
                      <Edit3 size={18} />
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex cursor-pointer items-center justify-center p-2.5 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Newspaper className="text-gray-400" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">No news found</h3>
              <p className="text-gray-500 mt-2">
                You haven't published any news yet.
              </p>
              <Link
                to="/create-news"
                className="text-sky-600 font-medium mt-4 inline-block hover:underline"
              >
                Create your first post now &rarr;
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyNews;
