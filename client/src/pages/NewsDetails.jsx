import { useQuery } from '@tanstack/react-query';
import {
  IoArrowBackOutline,
  IoCalendarOutline,
  IoPersonOutline,
  IoShareSocialOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleNewsApi } from '../api/newsApi';

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: news, isLoading } = useQuery({
    queryKey: ['single-news', id],
    queryFn: () => getSingleNewsApi(id),
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-8">
          <div className="bg-gray-200 h-[500px] w-full rounded-[2.5rem]"></div>
          <div className="h-10 bg-gray-200 w-3/4 rounded-lg"></div>
          <div className="h-6 bg-gray-200 w-1/4 rounded-lg"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 w-full rounded"></div>
            <div className="h-4 bg-gray-200 w-full rounded"></div>
            <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Featured Image Section */}
      <div className="max-w-6xl mx-auto px-4 pt-10">
        {/* back btn */}
        <button
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 text-gray-500 hover:text-sky-600 font-bold mb-6 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-sky-50 transition-all">
            <IoArrowBackOutline size={20} />
          </div>
          <span>Back to Feed</span>
        </button>
        <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
          <img
            src={news?.images?.[0]?.url}
            alt={news?.title}
            className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-10 left-10">
            <span className="bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-widest">
              {news?.category}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* News Header */}
        <div className="border-b border-gray-100 pb-10 mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
            {news?.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-gray-500 font-medium text-sm">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl">
              <IoPersonOutline className="text-sky-500" size={18} />
              <span className="text-gray-900 font-bold">
                {news?.authorName || 'Editorial Staff'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IoCalendarOutline size={18} />
              <span>
                {new Date(news?.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IoTimeOutline size={18} />
              <span>6 min read</span>
            </div>
            <button className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors">
              <IoShareSocialOutline
                size={22}
                className="text-gray-400 hover:text-sky-500"
              />
            </button>
          </div>
        </div>

        {/* Main Text Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl md:text-2xl leading-relaxed text-gray-800 first-letter:text-7xl first-letter:font-black first-letter:text-sky-600 first-letter:mr-3 first-letter:float-left">
            {news?.content}
          </p>
        </div>

        {/* Tags or Footer of Article */}
        <div className="mt-16 p-8 bg-gray-50 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-sky-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
              {news?.authorName?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Written By
              </p>
              <p className="text-lg font-black text-gray-900">
                {news?.authorName}
              </p>
            </div>
          </div>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-sky-600 transition-all active:scale-95 shadow-xl shadow-gray-200">
            Follow Author
          </button>
        </div>
      </article>
    </main>
  );
};

export default NewsDetails;
