import express from 'express';
import { createAttempt, getMyAttempts, submitBatchAttempt, getDailyLeaderboard, getMyDailyAttempt } from '../controllers/quizAttemptController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createAttempt).get(protect, getMyAttempts);
router.route('/submit').post(protect, submitBatchAttempt);
router.route('/leaderboard/daily').get(getDailyLeaderboard);
router.route('/daily').get(protect, getMyDailyAttempt);

export default router;
