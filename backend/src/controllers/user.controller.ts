import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers =async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try {
        //get all users
        const users =await User.find().select('-password'); 
        return res.status(200).json({message:"OK",users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error",cause:error.message});
    }
};

export const userSignup =async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try {
        //user signup
        const {name, email, password} =req.body;
        
        const existingUser =await User.findOne({email});
        if(existingUser) return res.status(401).send("User already registered");
        const hashPassword =await bcrypt.hash(password,10);

        const user =new User({
            name,
            email,
            password:hashPassword
        })

        //save data in database
        await user.save();

        //create token and store cookie
        res.clearCookie(COOKIE_NAME,{
            path:"/",
            domain:"localhost",
            httpOnly:true,
            signed:true
        });

        const token =createToken(user._id.toString(),user.email,"7d");

        const expires= new Date();
        expires.setDate(expires.getDate() + 7);
        
        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true
        });

        
        return res.status(201).json({message:"OK",id:user._id.toString()});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error",cause:error.message});
    }
};
export const userLogin =async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try {
        //user login
        const {email, password} =req.body;

        const user =await User.findOne({email});
        if(!user) return res.status(401).send("User not registered");

        const isPasswordCorrect =await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
        };

        res.clearCookie(COOKIE_NAME,{
            path:"/",
            domain:"localhost",
            httpOnly:true,
            signed:true
        });

        const token =createToken(user._id.toString(),user.email,"7d");

        const expires= new Date();
        expires.setDate(expires.getDate() + 7);
        
        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true
        });

        return res.status(200).json({message:"OK",id:user._id.toString()});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error",cause:error.message});
    }
};