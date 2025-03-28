import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import projectRoutes from './routes/project.route.js';
import proposalRoutes from './routes/proposal.route.js';
import cors from 'cors';
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
  app.use(cookieParser());
app.use(morgan("dev"));
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/proposals', proposalRoutes); 

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
