import express from 'express';
import newsControllers from '../controllers/newsController.js';
import { protect } from '../middlewares/authMiddlware.js';
import { upload } from '../middlewares/multerMiddleware.js';

const newsRoute = express.Router();

// PUBLIC ROUTES
// get all news
newsRoute.get('/', newsControllers.getAllNewsController);
// get top news
newsRoute.get('/top', newsControllers.getTopNewsController);
// get single news by id
newsRoute.get('/:id', newsControllers.getNewsByIdController);

// PROTECTED ROUTES
// create news
newsRoute.post(
  '/',
  protect,
  upload.array('images', 5),
  newsControllers.createNewsController,
);
// update news
newsRoute.put(
  '/:id',
  protect,
  upload.array('images', 5),
  newsControllers.updateNewsController,
);
// delete news
newsRoute.delete('/:id', protect, newsControllers.deleteNewsController);

export default newsRoute;
