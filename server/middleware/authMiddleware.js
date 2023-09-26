import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req?.headers?.authorization?.split(' ')[1];
    try {
      if (token) {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedUser?.userId).select('-password');
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error('Not Authorized token expired');
    }
  } else {
    throw new Error('There is no token attached to the header');
  }
});
