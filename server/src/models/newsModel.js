import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [imageSchema],
      required: true,
      validate: [
        {
          validator: function (arr) {
            return arr.length >= 1;
          },
          message: 'News must have at least 1 image.',
        },
        {
          validator: function (arr) {
            return arr.length <= 5;
          },
          message: 'News cannot have more than 5 images.',
        },
      ],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const News = mongoose.model('News', newsSchema);

export default News;
