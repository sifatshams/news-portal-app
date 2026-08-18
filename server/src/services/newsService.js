import cloudinary from '../config/cloudinaryConfig.js';
import News from '../models/newsModel.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';

const getAllNewsService = async () => {
  return await News.find().sort({ createdAt: -1 });
};

const getTopNewsService = async () => {
  return await News.find().sort({ createdAt: -1 }).limit(6);
};

const getNewsByIdService = async (id) => {
  const news = await News.findById(id);

  if (!news) {
    throw new Error('News not found!');
  }

  return news;
};

const createNewsService = async (user, body, files) => {
  if (!files || files.length === 0) {
    throw new Error('At least 1 image required!');
  }

  const uploadPromises = files.map((file) =>
    uploadToCloudinary(file.buffer, 'news'),
  );

  const results = await Promise.all(uploadPromises);

  const images = results.map((img) => ({
    url: img.secure_url,
    publicId: img.public_id,
  }));

  // news create
  const news = await News.create({
    title: body.title,
    category: body.category,
    content: body.content,
    images,
    author: user.id,
    authorName: user.name,
  });
  return news;
};

const updateNewsService = async (newsId, user, body, files) => {
  // find news id
  const news = await News.findById(newsId);
  // validation
  if (!news) {
    throw new Error('News not found!');
  }

  // owner check
  if (news.author.toString() !== user.id.toString()) {
    throw new Error('Not authorized to update this news!');
  }

  // update text fields
  news.title = body.title ?? news.title;
  news.category = body.category ?? news.category;
  news.content = body.content ?? news.content;

  // if user add new img
  if (files && files.length > 0) {
    // old img delete from cloudinary
    const deletePromises = news.images.map((img) =>
      cloudinary.uploader.destroy(img.publicId),
    );
    await Promise.all(deletePromises);

    // upload new img
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.buffer, 'news'),
    );

    const results = await Promise.all(uploadPromises);

    news.images = results.map((img) => ({
      url: img.secure_url,
      publicId: img.public_id,
    }));
  }
  await news.save();
  return news;
};

const deleteNewsService = async (newsId, user) => {
  // find news id
  const news = await News.findById(newsId);
  // validation
  if (!news) {
    throw new Error('News not found!');
  }

  // owner check
  if (news.author.toString() !== user.id.toString()) {
    throw new Error('Not authorized to delete this news');
  }

  // delete all images from cloudinary
  const deletePromises = news.images.map((img) =>
    cloudinary.uploader.destroy(img.publicId),
  );
  await Promise.all(deletePromises);

  // delete from db also
  await news.deleteOne();
  return { message: 'News deleted successfully!' };
};

const newsServices = {
  getAllNewsService,
  getNewsByIdService,
  getTopNewsService,
  createNewsService,
  updateNewsService,
  deleteNewsService,
};

export default newsServices;
