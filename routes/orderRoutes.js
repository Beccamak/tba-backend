import express from 'express';
import { createOrder } from '../controllers/orderController';
import { authenticateUser } from '../middleware/authentication';



export const router = express.Router();

router.route('/createOrder').post(authenticateUser, createOrder);