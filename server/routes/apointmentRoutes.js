import express from 'express';
import {
  getAllApointments,
  createApointment,
  removeApointment,
  updateApointment,
  getUserApointment,
} from '../controllers/apointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllApointments);
router.get('/myapointments', protect, getUserApointment);
router.route('/apointment').post(protect, createApointment).delete(removeApointment);
router.put('/update', protect, updateApointment);
router.delete('/remove', protect, removeApointment);

export default router;
