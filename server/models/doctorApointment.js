import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const apointmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    number: {
      type: String,
      required: [true, 'Number is required'],
    },
    date: {
      type: String,
      required: [true, 'Date  is required'],
    },
    animal: {
      type: String,
      required: [true, 'Animal type is required'],
    },
    description: {
      type: String,
      required: [true, 'Пока нет назначений'],
    },
    prescribing: {
      type: String,
      default: 'No prescribing',
    },
    status: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
    toObject: {
      virtual: true,
    },
  },
);

apointmentSchema.plugin(mongoosePaginate);
const Apointment = mongoose.model('Apointment', apointmentSchema);

export default Apointment;
