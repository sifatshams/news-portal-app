import {
  IoArrowForward,
  IoPersonCircleOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
  return (
    <div className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Image Section with Overlay Badge */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={news?.images?.[0]?.url}
          alt={news?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-sky-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-sm">
          {news?.category}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-gray-400 text-xs mb-3 font-medium">
          <div className="flex items-center gap-1">
            <IoTimeOutline size={14} />
            <span>5 min read</span>
          </div>
          <span>•</span>
          <span>
            {new Date(news?.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>

        <h2 className="text-xl font-black text-gray-900 leading-snug group-hover:text-sky-600 transition-colors duration-300 line-clamp-2 mb-3">
          <Link to={`/news/${news._id}`}>{news?.title}</Link>
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
          {news?.content}
        </p>

        {/* Footer Section */}
        <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
              <IoPersonCircleOutline size={24} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-0.5">
                Author
              </p>
              <p className="text-xs font-black text-gray-800 tracking-tight">
                {news?.authorName}
              </p>
            </div>
          </div>

          <Link
            to={`/news/${news._id}`}
            className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-sky-600 transition-all duration-300 group/btn"
          >
            <IoArrowForward className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
