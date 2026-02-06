import express from 'express';
import { createAttempt, getMyAttempts, submitBatchAttempt, getDailyLeaderboard } from '../controllers/quizAttemptController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createAttempt).get(protect, getMyAttempts);
router.route('/submit').post(protect, submitBatchAttempt);
router.route('/leaderboard/daily').get(getDailyLeaderboard);

export default router;
