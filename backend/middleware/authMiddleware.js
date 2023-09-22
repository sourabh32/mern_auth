import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler'


const protect = asyncHandler(
    async (req,res,next)=>{
        let token;
        token = req.cookies.user

        if (token) {
            try {
                const decoded = jwt.verify(token,process.env.JWT_SECRET)
                
                req.user = await User.findById(decoded.userId).select("-password")
                next()
            } catch (error) {
                res.status(401)
            throw new Error("Not Authorized, Invalid Token")
            }
        } else {
            res.status(401)
            throw new Error("Not Authorized, No Token")
        }
    }
)

export {protect}