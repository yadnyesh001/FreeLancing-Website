import express from 'express';
import { acceptOrRejectProposal, getProposalsByProjectId, submitProposal } from '../controllers/proposal.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/', authenticate, submitProposal);
router.get('/:id', getProposalsByProjectId);
router.put('/:id', acceptOrRejectProposal);

export default router;