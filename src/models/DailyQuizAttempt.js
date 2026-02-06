import mongoose from 'mongoose';

const dailyQuizAttemptSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      // ISO date string (YYYY-MM-DD)
      type: String,
      required: true,
    },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    timeTaken: { type: Number, required: true }, // seconds
    attemptedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Ensure one attempt per student per date
dailyQuizAttemptSchema.index({ student: 1, date: 1 }, { unique: true });

const DailyQuizAttempt = mongoose.model('DailyQuizAttempt', dailyQuizAttemptSchema);

export default DailyQuizAttempt;
