import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';

import connectDB from './lib/db.js';

const app = express();

app.use(express.json());

dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});