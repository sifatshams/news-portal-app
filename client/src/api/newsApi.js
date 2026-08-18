import axios_instance from '../lib/axios';

export const getAllNewsApi = async () => {
  const { data } = await axios_instance.get('/news');
  return data;
};

export const getSingleNewsApi = async (id) => {
  const response = await axios_instance.get(`/news/${id}`);

  return response.data.data;
};

// TOP NEWS API
export const getTopNewsApi = async () => {
  const { data } = await axios_instance.get('/news/top');
  return data;
};

export const createNewsApi = async (userData) => {
  const { data } = await axios_instance.post('/news', userData);
  return data;
};

export const updateNewsApi = async ({ id, formData }) => {
  const { data } = await axios_instance.put(`/news/${id}`, formData);
  return data;
};

export const deleteNewsApi = async (id) => {
  const { data } = await axios_instance.delete(`/news/${id}`);
  return data;
};
