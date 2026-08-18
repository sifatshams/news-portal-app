import { contactService } from '../services/contactService.js';

export const contactController = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required!',
      });
    }

    // call the service
    const result = await contactService({ name, email, subject, message });
    // success response
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};
