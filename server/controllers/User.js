import e from "express";
import UserModel from "../models/User.js"

export const Register=async (req,res)=>
{
    try
    {
        let user=await UserModel.findOne({email:req.body.email});
        if(user)
        {
            res.status(404).send({message:"User Already existed"});
            return;
        }
        let userInfo=await UserModel.create({
            ...req.body,
            profilePic:req?.file?.filename
        });
        if(userInfo)
        res.status(200).send({message:"UserCreated"});
    else res.status(404).send({message:"Unable to create user"});
    }
    catch(e)
    {
        res.status(404).send({error:e?.message});
    }
}

export const Login=async (req,res)=>{
    try
    {
        let user=await  UserModel.findOne({
            email:req.body.email,
            password:req.body.password,
        });
        if(user)res.status(200).send({id:user._id,role:user.role});
        else res.status(404).send({message:"Wrong Username or Password"});
    }
    catch(e)
    {
        res.status(404).send({error:e?.message});
    }
}