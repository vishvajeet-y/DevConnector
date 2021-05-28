const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const UserSchema=mongoose.Schema({

    name:{
       type:String,
       reqired:true
    },
    email:{
        type:String,
        reqired:true
     },
     password:{
        type:String,
        reqired:true
     },
     avatar:{
        type:String,
     },
     Date:{
        type:Date,
        default:Date.now
     },
})


  //Hash the plain text password before saving
UserSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password'))
    {
       user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

const User=mongoose.model('users',UserSchema)

module.exports=User
