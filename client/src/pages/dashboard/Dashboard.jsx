import {
  IoAddCircleOutline,
  IoFlashOutline,
  IoMailOutline,
  IoNewspaperOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-10">
          <div className="h-32 bg-gradient-to-r from-sky-500 to-indigo-600 w-full"></div>

          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row items-end md:items-center gap-6 -mt-12">
              <div className="relative">
                {user?.profileImage?.url ? (
                  <img
                    src={user?.profileImage?.url}
                    alt={user?.name}
                    className="w-32 h-32 rounded-[2rem] object-cover border-4 border-white shadow-xl bg-white"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center text-5xl font-bold border-4 border-white shadow-xl uppercase">
                    {user?.name?.charAt(0)}
                  </div>
                )}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
                      {user?.name}
                      <span className="text-xs bg-sky-100 text-sky-600 px-3 py-1 rounded-full uppercase tracking-widest">
                        Author
                      </span>
                    </h1>
                    <div className="flex items-center gap-4 mt-2 text-gray-500">
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <IoMailOutline className="text-sky-500" /> {user?.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to="/create-news"
                      className="flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200 active:scale-95 text-sm"
                    >
                      <IoAddCircleOutline size={20} />
                      Create News
                    </Link>

                    <Link
                      to="/my-news"
                      className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-95 text-sm"
                    >
                      <IoNewspaperOutline size={18} />
                      My Articles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm group hover:border-sky-500 transition-all">
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 mb-4 group-hover:bg-sky-600 group-hover:text-white transition-all">
              <IoNewspaperOutline size={24} />
            </div>
            <p className="text-gray-500 font-medium">Total Articles</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">12</h3>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm group hover:border-indigo-500 transition-all">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <IoPersonOutline size={24} />
            </div>
            <p className="text-gray-500 font-medium">Profile Views</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">1.2k</h3>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <IoFlashOutline size={24} />
            </div>
            <p className="text-gray-500 font-medium">Reputation</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">Gold</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
