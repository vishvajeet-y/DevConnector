const express=require('express')
const passport = require('passport')
//Load User Model
const User=require('../../models/Users')
//Load Profile Model
const Profile=require('../../models/Profile')
//Load Validation
const validateProfileInput=require('../../validation/profile')
const validateExperienceInput=require('../../validation/experience')
const validateEducationInput=require('../../validation/education')
const router=express.Router()
//@ GET api/profile/test
//@desc Test profile route
//@ Public

router.get('/test',(req,res)=>res.json({'message':'profile work'}))

//@ GET api/profile/
//@desc get current user Profile
//@ Private

router.get('/',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const errors={}
   
    
      Profile.findOne({user:req.user.id}) 
      .populate('user',['name','avatar']).then((profile)=>{
        if(!profile){
            errors.noprofile='There is no profile for this user'
            return res.status(404).json(errors)
        }
      //  console.log(profile)
           res.json(profile)
      }).catch((e)=>{
         res.status(404).json(e)
     })
})


//@ GET api/profile/all
//@desc Get all Profiles
//@ Public

router.get('/all',async(req,res)=>{
    const errors={}
    Profile.find()
    .populate('user',['name','avatar']).then((profiles)=>{
        if(!profiles)
        {
            errors.noprofile='There are no profiles '
            return res.status(404).json(errors)
        }
      res.json(profiles)
    }).catch((e)=>{
        res.status(404).json({profile:'There are no profiles'})
    })
})

//@ GET api/profile/handle/:handle
//@desc Get Profile by handle
//@ Public

router.get('/handle/:handle',async(req,res)=>{
    const errors={}
    Profile.findOne({handle:req.params.handle})
    .populate('user',['name','avatar']).then((profile)=>{
        if(!profile)
        {
            errors.noprofile='There is no profile for this user'
            return res.status(404).json(errors)
        }
      res.json(profile)
    }).catch((e)=>{
        res.status(404).json(e)
    })

})

//@ GET api/profile/user/:user_id
//@desc Get Profile by User Id
//@ Public

router.get('/user/:user_id',async(req,res)=>{
    const errors={}
    Profile.findOne({user:req.params.user_id})
    .populate('user',['name','avatar']).then((profile)=>{
        if(!profile)
        {
            errors.noprofile='There is no profile for this user'
            return res.status(404).json(errors)
        }
      res.json(profile)
    }).catch((e)=>{
        res.status(404).json({profile:'There is no profile for this user'})
    })

})


//@ POST api/profile/
//@desc create/edit user Profile
//@ Private

router.post('/',passport.authenticate('jwt',{session:false}),async(req,res)=>{

    //Check Validation
    const {errors,isValid}=validateProfileInput(req.body)
     if(!isValid){
         return res.status(400).send(errors)
     }

  
   //Get Fields
   const profileFields={}
   profileFields.user=req.user.id
   if(req.body.handle) profileFields.handle=req.body.handle
   if(req.body.company) profileFields.company=req.body.company
   if(req.body.website) profileFields.website=req.body.website
   if(req.body.location) profileFields.location=req.body.location
   if(req.body.status) profileFields.status=req.body.status
   if(req.body.githubusername) profileFields.githubusername=req.body.githubusername
 
   //Skills -split into array
    if(typeof req.body.skills!==undefined){
        profileFields.skills=req.body.skills.split(',') 
    }
    //Social
    profileFields.social={}


   
    if(req.body.youtube) profileFields.social.youtube=req.body.youtube
    if(req.body.facebook) profileFields.social.facebook=req.body.facebook
    if(req.body.linkedin) profileFields.social.linkedin=req.body.linkedin
    if(req.body.twitter) profileFields.social.twitter=req.body.twitter
    if(req.body.instagram) profileFields.social.instagram=req.body.instagram

   const profile=await Profile.findOne({user:req.user.id})
   if(profile){
       //Update
           const profile= await Profile.findOneAndUpdate(
               {user:req.user.id},
               {$set:profileFields},
               {new:true}
               )

               if(profile)
               return res.json(profile)
               else{
                   errors.update='Some error occur during update'
                   res.status(400).json(errors)
               }
   }
   else{
       //create
       //Check if handle exists
      const profile=await Profile.findOne({handle:profileFields.handle})
      if(profile){
          errors.handle='That handle already exist'
          return res.status(400).json(errors)
      }

      //save Profile

      const newProfile=new Profile(profileFields)

      await newProfile.save()
     res.json(newProfile)
      
    }
   
})

//@ POST api/profile/experience
//@desc Add Experience to  Profile
//@ Private

router.post('/experience',passport.authenticate('jwt',{session:false}),async(req,res)=>{
     //Check Validation
     const {errors,isValid}=validateExperienceInput(req.body)
     if(!isValid){
         return res.status(400).send(errors)
     }
    const profile=await Profile.findOne({user:req.user.id})
    const newExp={
        title:req.body.title,
        company:req.body.company,
        location:req.body.location,
        from:req.body.from,
        to:req.body.to,
        current:req.body.current,
        description:req.body.description

    }
  //Add to exprerienc array
 profile.experience.unshift(newExp)
 try{
    await profile.save()

    res.json(profile)
 }
catch(e){
    res.status(404).json(e)
}


})

//@ POST api/profile/education
//@desc Add Education to  Profile
//@ Private

router.post('/education',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    //Check Validation
    const {errors,isValid}=validateEducationInput(req.body)
    if(!isValid){
        return res.status(400).send(errors)
    }
   const profile=await Profile.findOne({user:req.user.id})
   const newEdu={
       school:req.body.school,
       degree:req.body.degree,
       fieldofstudy:req.body.fieldofstudy,
       from:req.body.from,
       to:req.body.to,
       current:req.body.current,
       description:req.body.description

   }
 //Add to exprerienc array
profile.education.unshift(newEdu)
try{
   await profile.save()

   res.json(profile)
}
catch(e){
   res.status(404).json(e)
}


})

//@ DELETE api/profile/experience/:exp_id
//@desc Delete Experience from   Profile
//@ Private

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
   
   const profile=await Profile.findOne({user:req.user.id})
     //get index of experience we want to remove 
   const removeindex=profile.experience.map(item=>item.id)
                     .indexOf(req.params.exp_id)
  //splice out of array
  profile.experience.splice(removeindex,1)
try{
    await profile.save()
    res.json(profile)
}catch(e){
    res.json(404).json(e)
}

})

//@ DELETE api/profile/education/:edu_id
//@desc Delete Education from   Profile
//@ Private

router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
   
    const profile=await Profile.findOne({user:req.user.id})
      //get index of experience we want to remove 
    const removeindex=profile.education.map(item=>item.id)
                      .indexOf(req.params.exp_id)
   //splice out of array
   profile.education.splice(removeindex,1)
 try{
     await profile.save()
     res.json(profile)
 }catch(e){
     res.json(404).json(e)
 }
 
 })

 //@ DELETE api/profile/
//@desc Delete user and profile
//@ Private

router.delete('/',passport.authenticate('jwt',{session:false}),async(req,res)=>{
   
      await  Profile.findOneAndDelete({user:req.user.id}) 
      await User.findOneAndDelete({_id:req.user.id})
     res.json({success:true})
 
 
 })


module.exports=router