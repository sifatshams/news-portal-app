import {
  sendAdminContactMail,
  sendUserAutoReplyMail,
} from '../utils/sendMail.js';

export const contactService = async (contactData) => {
  const { name, email, subject, message } = contactData;

  await Promise.all([
    sendAdminContactMail({ name, email, subject, message }),
    sendUserAutoReplyMail({ name, email }),
  ]);

  return {
    success: true,
    message: 'Your message has been sent successfully!',
  };
};
