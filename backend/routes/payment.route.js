import express from 'express';
import { createPayment, getPaymentDetails, listPayments } from '../controllers/payment.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/:contractId', protectRoute, createPayment);
router.get('/:contractId', protectRoute, listPayments);
router.get('/:paymentId', protectRoute, getPaymentDetails);

export default router;