import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import profileRoutes from './routes/profile.route.js';

import connectDB from './lib/db.js';

const app = express();

app.use(express.json());
app.use(cookieParser());  

dotenv.config();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});