import express from 'express';
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/project.controller.js';

const router = express.Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;