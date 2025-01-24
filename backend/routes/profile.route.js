import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getProfile, updateProfile, getProfileById } from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/', protectRoute, getProfile);
router.put('/', protectRoute, updateProfile);
router.get('/:userId', getProfileById);

export default router;