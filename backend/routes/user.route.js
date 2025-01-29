import express from 'express';
import { getFreelancers, getProfile, updateProfile } from '../controllers/user.controller.js';
 
const router = express.Router();

router.get('/users/:id', getProfile);
router.put('/users/:id', updateProfile);
router.get('/freelancers', getFreelancers);

export default router;