import axios_instance from '../lib/axios';

export const sendContactMessageApi = async (formData) => {
  const res = await axios_instance.post('/contact/send-message', formData);
  return res.data;
};
