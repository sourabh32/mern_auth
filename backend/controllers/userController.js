import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

const authUser = asyncHandler(async (req,res) =>{
      const {email,password} = req.body
      const user = await User.findOne({email})
      if(user && (await user.matchPasswords(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            email:user.email,
            name:user.name
        })
       }
       else{
        res.status(401)
        throw new Error('Invalid email or password')
       }
    
    
})

const regiterUser = asyncHandler(async (req,res) =>{

    const {name,email,password} = req.body
    
   const userExists = await User.findOne({email})

   if(userExists){
    res.status(400)
    throw new Error('User Already Exists')
   }

   const user = await User.create({
    name,
    email,
    password
   })
  
   if(user){
    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        email:user.email,
        name:user.name
    })
   }
   else{
    res.status(400)
    throw new Error('Invalid data')
   }
    

    
    
})

const logOutUser = asyncHandler(async (req,res) =>{

    res.cookie('user','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message: " user loged out "})
})
const getUser = asyncHandler(async (req,res) =>{
console.log(req.user)
const user = {
    _id:req.user._id,
    email:req.user.email,
    name:req.user.name
}
    
    res.status(200).json(user)
})
const updateUser = asyncHandler(async (req,res) =>{
 const user = await User.findById(req.user._id)

 if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if(req.body.password){
        user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
        _id:updatedUser._id,
        email:updatedUser.email,
        name:updatedUser.name

    })

 } else {
    res.status(404)
    throw new Error("user not found")
 }
    
    res.status(200).json({message: "Update user"})
})

export {authUser,getUser,updateUser,logOutUser,regiterUser}