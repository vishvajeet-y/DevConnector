const express=require('express')
const bcrypt=require('bcryptjs')
const gravatar=require('gravatar')
const jwt=require('jsonwebtoken')
const passport=require('passport') 

//Load Input Validation
const validateRegisterInput=require('../../validation/register')
const validateLoginInput=require('../../validation/login')

const router=express.Router()
const User=require('../../models/Users') //Load User model
require('dotenv').config() //Read env file
//@ GET api/users/test
//@desc Test users route
//@ Public

router.get('/test',(req,res)=>res.json({'message':'user work'}))

//@ POST api/users/register
//@desc Register User
//@ Public

router.post('/register',async(req,res)=>{
 //  console.log(req.body)
 //Check Validation
 const{errors,isValid}=validateRegisterInput(req.body)
 if(!isValid){
     return res.status(400).json(errors)
 }


  const user=await  User.findOne({email:req.body.email})

  if(user)
  {
      errors.email='Email already exist'
    return res.status(400).json(errors)
  }

  
  const avatar=gravatar.url(req.body.email,{
      s:'200',//size
      r:'pg',//Rating
      d:'mm' //Default
  } )

     const newUser=new User({
         ...req.body,
         avatar
     })

     try{
         await newUser.save()
         return res.status(200).json(newUser)
     }
     catch(e){
         return res.status(500)
     }
})

//@ POST api/users/login
//@desc Login User /Return JsonWeb Token
//@ Public

router.post('/login',async(req,res)=>{
   
    const{errors,isValid}=validateLoginInput(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }

    const email=req.body.email
    const password=req.body.password
   //find user
 
    const user=await User.findOne({email})
      if(!user)
     { 
        errors.Email='User not found' 
        return res.status(400).json(errors)
    }

      //Hash password
     const isMatch= await bcrypt.compare(password,user.password)
        if(isMatch){
            //user matched
            const payload={
              id:user.id,
              name:user.name,
              avatar:user.avatar
            }
            //sign token
           
          const token=await  jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:86400})

            return res.status(200).json({
                success:true,
                token:'Bearer '+token
            })
        }
        errors.Password='Password incorrect'
        return res.status(400).json(errors)
     
})

//@ POST api/users/current
//@desc Return Current User
//@ Private

router.post('/current',passport.authenticate('jwt',{session:false}),async(req,res)=>{
     res.status(200).json(req.user)
})

module.exports=router