import axios_instance from '../lib/axios';

export const registerApi = async (formData) => {
  const { data } = await axios_instance.post('/auth/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const loginApi = async (userData) => {
  const { data } = await axios_instance.post('/auth/login', userData);
  return data;
};
