import express from 'express';

import { signup, login, logout, getMe } from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);
router.get('/logout', logout);
router.get('/me', getMe);

export default router;