import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import assignmentRoutes from './src/routes/assignmentRoutes.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

dotenv.config();

import connectDB from './src/config/db.js';

const app = express();





// --- MIDDLEWARE ---

const allowedOrigins = [
  'http://localhost:5173', 
  'https://painless-lms-portal.vercel.app'
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false); 
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());



// --- ROUTES ---

app.get('/', (req, res) => {
  res.send('LMS API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/assignments', assignmentRoutes);





// --- ERROR MIDDLEWARE ---
// Must be placed AFTER routes
app.use(notFound);
app.use(errorHandler);





// --- SERVER LISTEN ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  connectDB();
  
});