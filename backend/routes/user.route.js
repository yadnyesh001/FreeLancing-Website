import express from 'express';
import { getClients, getFreelancers, getProfile, updateProfile, deleteUser } from '../controllers/user.controller.js';
 
const router = express.Router();

router.get('/users/:id', getProfile);
router.put('/users/:id', updateProfile);
router.get('/freelancers', getFreelancers);
router.get('/clients', getClients);
router.delete('/users/:id', deleteUser);

export default router;