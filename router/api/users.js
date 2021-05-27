const express=require('express')
const router=express.Router()

//@ GET api/users/test
//@desc Test users route
//@ Public

router.get('/test',(req,res)=>res.json({'message':'user work'}))

module.exports=router