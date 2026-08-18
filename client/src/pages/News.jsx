import { useQuery } from '@tanstack/react-query';

import { getAllNewsApi } from '../api/newsApi';

import NewsCard from '../components/NewsCard';

const News = () => {
  const { data: news, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: getAllNewsApi,
  });

  if (isLoading) {
    return <h1 className="text-center mt-20 text-3xl">Loading...</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl mb-10 font-black text-gray-900 tracking-tight">
        Latest <span className="text-sky-600">News</span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news?.data?.map((item) => (
          <NewsCard key={item._id} news={item} />
        ))}
      </div>
    </div>
  );
};

export default News;
