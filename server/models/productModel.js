import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  // {
  //   toObject: {
  //     virtuals: true,
  //   },
  //   toJSON: { virtuals: true },
  //   timestamps: true,
  // },
);

// userSchema.virtual('apointment', {
//   ref: 'Apointment',
//   foreignField: 'user',
//   localField: '_id',
// });

const Product = mongoose.model('Product', productSchema);

export default Product;
