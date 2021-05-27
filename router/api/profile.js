const express=require('express')
const router=express.Router()
//@ GET api/profile/test
//@desc Test profile route
//@ Public

router.get('/test',(req,res)=>res.json({'message':'profile work'}))

module.exports=router