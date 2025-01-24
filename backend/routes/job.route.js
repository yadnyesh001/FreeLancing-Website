import express from 'express';
import { createJob, getJobs, jobDetail, updateJob, deleteJob } from '../controllers/job.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { clientOnly } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/',protectRoute, createJob);
router.get('/', getJobs);
router.get('/:jobId', jobDetail);
router.put('/:jobId', clientOnly, protectRoute, updateJob);
router.delete('/:jobId', clientOnly, protectRoute, deleteJob);

export default router;