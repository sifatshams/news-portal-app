const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const errors = [];

  if (!name?.trim()) errors.push('Name is required');
  if (!email?.trim()) errors.push('Email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push('Invalid email format');
  if (!subject?.trim()) errors.push('Subject is required');
  if (!message?.trim()) errors.push('Message is required');
  else if (message.trim().length < 10)
    errors.push('Message must be at least 10 characters');

  if (errors.length > 0) {
    return res.status(422).json({ success: false, errors });
  }

  next();
};

export default validateContactForm;
