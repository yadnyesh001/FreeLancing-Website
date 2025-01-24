import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { placeBid, getBids, bidDetails, deleteBid } from '../controllers/bid.controller.js';

import { freelancerOnly } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/jobs/:jobId/bid', freelancerOnly, protectRoute, placeBid);
router.get('/jobs/:jobId/bids', getBids);
router.get('/bids/:bidId', protectRoute, bidDetails);
router.delete('/bids/:bidId', freelancerOnly, protectRoute, deleteBid);

export default router;