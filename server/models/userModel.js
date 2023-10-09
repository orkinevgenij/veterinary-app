import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: { virtuals: true },
    timestamps: true,
  },
);

userSchema.virtual('apointment', {
  ref: 'Apointment',
  foreignField: 'user',
  localField: '_id',
});

//Income

// Match user entered password to hashed password in database
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', userSchema);

export default User;
