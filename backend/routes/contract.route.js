import express from 'express';
import { clientOnly } from '../middlewares/role.middleware';
import { protectRoute } from '../middlewares/auth.middleware';
import { acceptAndCreateContract, deleteContract, getContracts, updateContract } from '../controllers/contract.controller';

const router = express.Router();

router.post('/:jobId', protectRoute, clientOnly, acceptAndCreateContract);
router.get('/:contractId', protectRoute, getContracts);
router.put('/:contractId', protectRoute, updateContract);
router.delete('/:contractId', protectRoute, deleteContract);

export default router;