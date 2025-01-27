import express from 'express';
import { listRatings, submitRating } from '../controllers/rating.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/:contractId', protectRoute, submitRating);
router.get('/:userId', listRatings);

export default router;