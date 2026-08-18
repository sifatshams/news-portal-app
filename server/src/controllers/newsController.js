import newsServices from '../services/newsService.js';

const getAllNewsController = async (req, res) => {
  try {
    const news = await newsServices.getAllNewsService();
    // success response
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTopNewsController = async (req, res) => {
  try {
    const news = await newsServices.getTopNewsService();
    // success response
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getNewsByIdController = async (req, res) => {
  try {
    const news = await newsServices.getNewsByIdService(req.params.id);
    // success response
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const createNewsController = async (req, res) => {
  try {
    const news = await newsServices.createNewsService(
      req.user,
      req.body,
      req.files,
    );

    // success response
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNewsController = async (req, res) => {
  try {
    // call the service
    const news = await newsServices.updateNewsService(
      req.params.id,
      req.user,
      req.body,
      req.files,
    );

    // success response
    res.status(200).json({
      success: true,
      message: 'News updated successfully!',
      data: news,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNewsController = async (req, res) => {
  try {
    // call the service
    const results = await newsServices.deleteNewsService(
      req.params.id,
      req.user,
    );

    // success response
    res.status(200).json({ success: true, message: results.message });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const newsControllers = {
  getAllNewsController,
  getTopNewsController,
  getNewsByIdController,
  createNewsController,
  updateNewsController,
  deleteNewsController,
};

export default newsControllers;
