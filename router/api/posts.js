const express=require('express')
const router=express.Router()

//@ GET api/posts/test
//@desc Test posts route
//@ Public

router.get('/test',(req,res)=>res.json({'message':'post work'}))

module.exports=router