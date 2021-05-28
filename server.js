require('./db/mongoose')
const express=require('express')
const bodyParser=require('body-parser')
const passport=require('passport')
const app=express()
const port=process.env.PORT||8080
const userRouter=require('./router/api/users')
const profileRouter=require('./router/api/profile')
const postRouter=require('./router/api/posts')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//Passport middleware
app.use(passport.initialize())
const Passport=require('./config/passport')
Passport(passport)

app.use('/api/users',userRouter)
app.use('/api/profile',profileRouter)
app.use('/api/posts',postRouter)

app.listen(port,()=>{
    console.log('port is listning on ',port)
})