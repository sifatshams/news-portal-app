import { IoGridOutline, IoLogOutOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm font-bold transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-sky-400 before:transition-all hover:before:w-full ${
      isActive ? 'text-sky-400 before:w-full' : 'text-gray-300 hover:text-white'
    }`;
  console.log('Header User Data:', user);
  return (
    <header className="sticky top-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* LOGO - Modern Branding */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-sky-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            NEWS<span className="text-sky-500">PORTAL</span>
          </span>
        </Link>

        {/* NAV LINKS - Centered Desktop Only */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/news" className={navLinkClass}>
            Global News
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* RIGHT SECTION - User Control */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-bold text-gray-300 hover:text-white px-4 py-2 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-sky-600/20 active:scale-95"
              >
                Join Now
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-white/5 p-1 rounded-2xl border border-white/10">
              {/* Desktop Dashboard Link */}
              <div className="hidden sm:flex items-center gap-1 px-2">
                <NavLink to="/dashboard" className={navLinkClass}>
                  <IoGridOutline className="inline-block mr-1" /> Dash
                </NavLink>
              </div>

              {/* User Identity */}
              <div className="flex items-center gap-3 pl-2 pr-1 py-1 bg-white/5 rounded-xl">
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">
                    Welcome
                  </p>
                  <p className="text-sm font-bold text-white leading-none">
                    {user?.name?.split(' ')[0]}
                  </p>
                </div>

                {/* Profile Image with Ring */}
                <div className="relative group cursor-pointer">
                  {user?.profileImage?.url ? (
                    <img
                      src={user.profileImage.url}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-sky-500/50 group-hover:ring-sky-500 transition-all shadow-lg"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center font-black shadow-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Modern Logout Button */}
                <button
                  onClick={logout}
                  className="bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 p-2.5 rounded-xl transition-all group active:scale-90"
                  title="Logout Account"
                >
                  <IoLogOutOutline
                    size={22}
                    className="group-hover:-translate-x-0.5 cursor-pointer transition-transform"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
