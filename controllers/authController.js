import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import {createTokenUser} from "../utils/createTokenUser.js";
import { attachCookiesToResponse } from "../utils/jwt.js";
import CustomError from "../errors/index.js";

export const register = async(req, res) => {    
    const {firstName, lastName, email, password} = req.body;
    console.log("PAssword", password);
    const emailAlreadyExist = await User.findOne({email});
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError("Email already exist");
    }
   
    const user = await User.create({firstName, lastName, email, password});
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.CREATED).send({
        message: 'Registration Sucessful',
        data: tokenUser,
        user:tokenUser
    })


}
export const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.send("PLease provide email and password")
    };
    const user = await User.findOne({email})
    if(!user){
        res.send("Invalid credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        res.send("Please input the correct password");
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res, user: tokenUser});
    res.status(StatusCodes.OK).json({user: tokenUser})

}
export const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg: "User logged out"})
    
}

