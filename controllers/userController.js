import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import checkPermissions from "../utils/checkPermissions.js";
import CustomError from "../errors/index.js";
import { createTokenUser } from "../utils/createTokenUser.js";
import { attachCookiesToResponse } from "../utils/jwt.js";

export const getAllUsers = async(req, res) => {
   const users = await User.find({role: "user"}).select("-password")
   res.status(StatusCodes.OK).json({users});
}

export const getSingleUser = async(req, res) => {
   const user = await User.findOne({_id: req.params.id}).select("-password");
   // if I dont find the user
   if(!user){
      // res.send("No user with id: ${req.params.id")
      throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
   }

   // if I find the user
   // Check if the id of the user gotten is the same id of the user requesting
   checkPermissions(req.user, user._id);
   res.status(StatusCodes.OK).json({user});
}

export const showCurrentUser = async(req, res) => {
    const currentUser = req.user
    res.status(StatusCodes.OK).json({currentUser});

}
export const updateUser = async(req, res) => {
   const {firstName, lastName, email} = req.body;
   if(!email || !firstName || !lastName){
      throw new CustomError.BadRequestError("Please provide your details");
   }
   const user = await User.findOne({_id: req.user.userId});
   user.firstName = firstName;
   user.lastName = lastName;
   user.email = email;

   await user.save();

   const tokenUser = createTokenUser(user);
   attachCookiesToResponse({res, user: tokenUser});
   res.status(StatusCodes.OK).json({user: tokenUser});
}
export const updateUserPassword = async(req, res) => {
   const {oldPassword, newPassword} = req.body;

   if(!oldPassword || !newPassword){
      throw new CustomError.BadRequestError("Please provide both passwords");
   }
   const user = await User.findOne({_id: req.user.userId});
   const isPasswordCorrect = await user.comparePassword(oldPassword);
   if(!isPasswordCorrect){
      throw new CustomError.UnAuthenticatedError("Invalid credentials");
   }
   user.password = newPassword;
   await user.save();
   res.status(StatusCodes.OK).json({msg: "Password updated sucessfully"});
}