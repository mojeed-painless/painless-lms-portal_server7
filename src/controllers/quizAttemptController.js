import asyncHandler from 'express-async-handler';
import QuizAttempt from '../models/QuizAttempt.js';

// @desc  Create a quiz attempt record
// @route POST /api/quiz-attempts
// @access Private
const createAttempt = asyncHandler(async (req, res) => {
  const { topic, score, total, timeTaken } = req.body;
  if (!topic || typeof score === 'undefined' || typeof total === 'undefined' || typeof timeTaken === 'undefined') {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const attempt = await QuizAttempt.create({
    student: req.user._id,
    topic,
    score,
    total,
    timeTaken,
  });

  res.status(201).json(attempt);
});

// @desc  Get current user's quiz attempts
// @route GET /api/quiz-attempts
// @access Private
const getMyAttempts = asyncHandler(async (req, res) => {
  const attempts = await QuizAttempt.find({ student: req.user._id }).sort({ attemptedAt: -1 });
  res.json(attempts);
});

export { createAttempt, getMyAttempts };
