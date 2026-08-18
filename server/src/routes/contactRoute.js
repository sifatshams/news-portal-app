import express from 'express';
import { contactController } from '../controllers/contactController.js';
import validateContactForm from '../middlewares/validateMiddleware.js';

const contactRoute = express.Router();

// route
contactRoute.post('/send-message', validateContactForm, contactController);

export default contactRoute;
