import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import projectRoutes from './routes/project.route.js';
import proposalRoutes from './routes/proposal.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/proposals', proposalRoutes); 

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
