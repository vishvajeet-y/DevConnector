const express=require('express')
require('./db/mongoose')
const app=express()
const port=process.env.PORT||8080
const userRouter=require('./router/api/users')
const profileRouter=require('./router/api/profile')
const postRouter=require('./router/api/posts')
app.use('/api/users',userRouter)
app.use('/api/profile',profileRouter)
app.use('/api/posts',postRouter)

app.listen(port,()=>{
    console.log('port is listning on ',port)
})