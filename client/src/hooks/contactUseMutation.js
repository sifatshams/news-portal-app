import { useMutation } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { sendContactMessageApi } from '../api/contactApi';

export const useSendContactMessage = () => {
  return useMutation({
    mutationFn: sendContactMessageApi,

    onSuccess: (data) => {
      toast.success(data.message || 'Message sent successfully!');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    },
  });
};
