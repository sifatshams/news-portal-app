import { useQuery } from '@tanstack/react-query';
import { IoArrowForwardOutline, IoTimeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { getTopNewsApi } from '../api/newsApi';

const TopNews = () => {
  const { data: news, isLoading } = useQuery({
    queryKey: ['top-news'],
    queryFn: getTopNewsApi,
  });

  // Skeleton Loading State 
  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-12"></div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 bg-gray-100 animate-pulse rounded-3xl"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-12">
        <div className="space-y-2">
          <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">
            Editor's Choice
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Top <span className="text-sky-600">Stories</span>
          </h1>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {news?.data?.map((item) => (
          <Link
            key={item._id}
            to={`/news/${item._id}`}
            className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={item?.images?.[0]?.url}
                alt={item?.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-5 left-5">
                <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wider">
                  {item?.category}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex flex-col flex-grow">
              {/* Date/Time (Optional) */}
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                <IoTimeOutline size={14} />
                <span>Recently Updated</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2 h-18">
                {item?.title}
              </h2>

              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  Read Article{' '}
                  <IoArrowForwardOutline className="text-sky-600" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopNews;
