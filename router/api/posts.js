const express=require('express')
const passport =require('passport')
//Load Model
const User=require('../../models/Users')
const Post=require('../../models/Post')
//Load Validation
const validatePostInput=require('../../validation/post')


const router=express.Router()

//@ GET api/posts/test
//@desc Test posts route
//@ Public

router.get('/test',(req,res)=>res.json({'message':'post work'}))

//@ POST api/posts/
//@desc Create Post
//@ Private

router.post('/',passport.authenticate('jwt',{session:false}),async(req,res)=>{
   
    const {errors,isValid}=validatePostInput(req.body)
    if(!isValid){
       return res.status(404).json(errors)
    }
 

    const Postfields={
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    }
    
   const newpost= new Post(Postfields)
   
    try{
        await newpost.save()
         res.json(newpost)      
    }
    catch(e){
      
             res.status(404).json(e)
       }
    
})


//@ GET api/posts/
//@desc Get Post
//@ Public

router.get('/',async(req,res)=>{

   try{
    const posts=await Post.find().sort({date:-1})
    
    if(posts.length==0)
    return res.status(404).json({Nopostsfound:'No Posts found'})
    res.json(posts)
   }
   catch(e){
       res.status(404).json({Nopostsfound:'No Posts found'})
   }
})



//@ GET api/posts/:post_id
//@desc Get Post by post_id
//@ Public

router.get('/:post_id',async(req,res)=>{

   try{
    const post=await Post.findById(req.params.post_id)
   // console.log(posts)
    res.json(post)
   }
   catch(e){
       res.status(404).json({Nopostfound:'No Post Found by that id'})
   }
})

//@ DELETE api/posts/:post_id
//@desc delete Post by post_id
//@ Private

router.delete('/:post_id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
       try{
            const post=await Post.findById(req.params.post_id)
           // console.log('post' ,post)
           //Check for Post owner
            if(post.user.toString()!==req.user.id){
                return res.status(404).json({notauthorized:'User  not authorized'})
            }
            await post.remove()
             res.json({success:true})
       }
       catch(e){
           res.status(404).json(e)
       }
    
})

//@ POST api/posts/like/:post_id
//@desc like Post by post_id
//@ Private

router.post('/like/:post_id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    try{
         const post=await Post.findById(req.params.post_id)
        // console.log('post' ,post)
        //Check if user has already liked
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0)
        {
            return res.status(400).json({alreadyliked:'User already liked this post'})
        }

        //Add User id to likes array
         post.likes.unshift({user:req.user.id})
 
        await  post.save()

        res.json(post)

    }
    catch(e){
        res.status(404).json(e)
    }
 
})

//@ POST api/posts/unlike/:post_id
//@desc Unlike Post by post_id
//@ Private

router.post('/unlike/:post_id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    try{
         const post=await Post.findById(req.params.post_id)
        // console.log('post' ,post)
        //Check if user has  liked post
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0)
        {
            return res.status(400).json({notliked:'You have not liked this post'})
        }

        //remove user from likes array
         const removeindex=post.likes.map(item=>item.user.toString()).indexOf(req.user.id)
        //splice out of array
          post.likes.splice(removeindex,1)

        await  post.save()

        res.json(post)

    }
    catch(e){
        res.status(404).json(e)
    }
 
})

//@ POST api/posts/comment/:post_id
//@desc Add Comment to Post
//@ Private

router.post('/comment/:post_id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
 
    try{
  
        const {errors,isValid}=validatePostInput(req.body)
        if(!isValid)
        {
            errors.text='Comment should be between 10 to 500 character'
            return res.status(404).json(errors)
        }

        const post=await Post.findById(req.params.post_id)

    const newcomment={
        user:req.user.id,
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar
    }
   

    post.comments.unshift(newcomment)
   
    await post.save()
    res.json(post)
    }
    catch(e){
        res.status(404).json(e)
    }
   

})

//@ DELETE api/posts/comment/:post_id/:comment_id
//@desc Delete Comment from Post
//@ Private

router.delete('/comment/:post_id/:comment_id',
passport.authenticate('jwt',{session:false}),async(req,res)=>{

    try{
         const post=await Post.findById(req.params.post_id)

        //Check if comment exist

        if(post.comments.filter(comment=>comment.id.toString()===req.params.comment_id).length===0)
        {
            return res.status(404).json({commentnotExist:'Comment does not exist'})
        }

        //Get remove index of comment which we want to delete
         const removeIndex=post.comments.map(comment=>comment.id.toString())
                                                  .indexOf(req.params.comment_id)

            //Check if user who have written comment want to delete it                                      
            if(post.comments[removeIndex].user.toString()!==req.user.id){
                return res.status(402).json({unauthorized:'User  not authorized to delete it'})
            }

           //splice out of  comment array       
           
           post.comments.splice(removeIndex,1)

           await post.save()
           res.json(post)
    }
    catch(e){
      //  console.log(e)
           res.status(404).json(e)
    }

})

module.exports=router