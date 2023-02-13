import { isTokenValid } from "../utils/jwt.js";
// import CustomError from '../errors.js';

export const authenticateUser = async (req, res, next)=> {
    const token = req.signedCookies.token;
    if(!token){
        res.send("Authenctication invalid");
        // throw new CustomError.UnAuthenticatedError("Autyhentication invalid");
    }
    try{
        const {name, userId, role} = isTokenValid({token})
        req.user = {name, userId, role};
        next()
    }catch(error){
    res.send("Please log in")
        // throw new CustomError.UnAuthenticatedError('Au thentication Invalid');
    }
}

export const authorizePermissions = (...roles) => {
    return(req,res, next)=>{
        if(!roles.includes(req.user.role)){
            
      console.log("Authentication invalid");
            // throw new CustomError.UnauthorizedError("Unauthorized acess to this route")
        }
        next()
    }
}