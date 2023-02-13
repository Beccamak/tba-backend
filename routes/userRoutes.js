import express from 'express';
import { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } from "../controllers/userController.js";
import { authenticateUser, authorizePermissions } from '../middleware/authentication.js';


export const router = express.Router();

router.route("/getAllUsers").get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route("/showCurrentUser").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router.route("/:id").get(authenticateUser, getSingleUser);


