import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    products: [
      {
        price: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
          trim: true,
        },
        count: {
          type: Number,
        },
        image: {
          type: Object,
          required: true,
        },
        slug: {
          type: String,
          required: true,
          lowercase: true,
        },
      },
    ],
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', orderSchema);
