import express from 'express';
import { getClients, getFreelancers, getProfile, updateProfile, deleteUser } from '../controllers/user.controller.js';
import authenticate from '../middleware/authenticate.js';
 
const router = express.Router();

router.get('/users/:id', getProfile);
router.patch('/users/:id', authenticate, updateProfile);
router.get('/freelancers', getFreelancers);
router.get('/clients', getClients);
router.delete('/users/:id', deleteUser);

export default router;