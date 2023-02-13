import { register, login, logout } from "../controllers/authController.js";
import express from 'express';

export const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

