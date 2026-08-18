import cors from 'cors';
import express from 'express';
import authRouter from './routes/authRoute.js';
import contactRoute from './routes/contactRoute.js';
import newsRoute from './routes/newsRoute.js';

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));

// api endpoints
// user route
app.use('/api/auth', authRouter);

// news routes
app.use('/api/news', newsRoute);

// contacts
app.use('/api/contact', contactRoute);

export default app;
