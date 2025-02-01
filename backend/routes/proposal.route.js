import express from 'express';
import { acceptOrRejectProposal, getProposalsByProjectId, submitProposal } from '../controllers/proposal.controller.js';

const router = express.Router();

router.post('/', submitProposal);
router.get('/:id', getProposalsByProjectId);
router.put('/:id', acceptOrRejectProposal);

export default router;