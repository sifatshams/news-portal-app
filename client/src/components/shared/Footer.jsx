import {
  IoArrowForwardSharp,
  IoCallOutline,
  IoLocationOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoMailOutline,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white mt-20 border-t border-white/5">
      {/* Top Section: Newsletter or CTA */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center border-b border-white/5 pb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black tracking-tight mb-2">
              Stay updated with <span className="text-sky-500">NewsPortal</span>
            </h2>
            <p className="text-gray-400 font-medium">
              Subscribe to our newsletter for daily trending stories.
            </p>
          </div>
          <div className="relative group">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-2xl outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-sky-600 hover:bg-sky-500 px-4 rounded-xl transition-all active:scale-95">
              <IoArrowForwardSharp size={20} />
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-black tracking-tighter">
              NEWS<span className="text-sky-500">PORTAL</span>
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium">
              Your trusted source for breaking news, in-depth analysis, and
              exclusive stories from around the globe.
            </p>
            <div className="flex gap-4">
              {[
                IoLogoFacebook,
                IoLogoTwitter,
                IoLogoInstagram,
                IoLogoLinkedin,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all duration-300 border border-white/10"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'News', 'Dashboard', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-sky-400 font-medium transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-sky-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories/Trending */}
          <div>
            <h3 className="text-lg font-bold mb-6">Trending</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">
                Technology
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Politics
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Sports
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Entertainment
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="mt-1 text-sky-500 bg-sky-500/10 p-2 rounded-lg group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <IoMailOutline size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Email Us
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    sifatbin.official@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="mt-1 text-sky-500 bg-sky-500/10 p-2 rounded-lg group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <IoCallOutline size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Call Anytime
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    +880 17 7862 5668
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="mt-1 text-sky-500 bg-sky-500/10 p-2 rounded-lg group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <IoLocationOutline size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Location
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    Chittagong, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bottom */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-500">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="text-white">News Portal</span>. Developed with ❤️
            by Sifat.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
