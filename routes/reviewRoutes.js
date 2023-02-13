import express from 'express';
import { createReview, deleteReview, getAllReviews, getSingleReview, updateReview } from '../controllers/reviewController.js';
import { authenticateUser } from '../middleware/authentication.js';


export const router = express.Router();

router.route('/createReview').post(authenticateUser, createReview);
router.route('/getAllReviews').get(getAllReviews);
router.route('/getSingleReview').get(getSingleReview);
router.route('/updateReview').patch( authenticateUser, updateReview);
router.route('/deleteReview').delete(authenticateUser, deleteReview);

