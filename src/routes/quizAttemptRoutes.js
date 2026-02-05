import express from 'express';
import { createAttempt, getMyAttempts } from '../controllers/quizAttemptController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createAttempt).get(protect, getMyAttempts);

export default router;
