import { IoArrowDownOutline, IoFlashOutline } from 'react-icons/io5';
import TopNews from '../components/TopNews';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Full Width Fixed */}
      <section className="relative w-full bg-black text-white overflow-hidden">
        {/* ব্যাকগ্রাউন্ডে হালকা গ্রেডিয়েন্ট বা প্যাটার্ন যোগ করলে সুন্দর লাগে */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-32 md:py-48 text-center relative z-10">
          {/* ছোট ব্যাজ */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sky-400 text-sm font-bold mb-8 animate-fade-in">
            <IoFlashOutline /> <span>Breaking News inside</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter">
            Stay Updated <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
              With Latest News
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium">
            Explore world-class journalism and breaking stories from across the
            globe, updated every minute.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-sky-500/25 active:scale-95">
              Start Reading
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all backdrop-blur-sm">
              Featured Stories
            </button>
          </div>

          <div className="mt-16 animate-bounce text-gray-500 flex justify-center">
            <IoArrowDownOutline size={24} />
          </div>
        </div>
      </section>

      {/* TOP NEWS SECTION */}
      <div className="bg-white">
        <TopNews />
      </div>
    </div>
  );
};

export default Home;
