import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authRoutes from './routes/auth.route.js';
// import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
