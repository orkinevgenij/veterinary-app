import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  createUser,
  getUserDetails,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/allusers', protect, getAllUsers);
router.post('/', registerUser);
router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/createuser', protect, createUser);
router.get('/get-userdetails/:userId', protect, getUserDetails);
export default router;
