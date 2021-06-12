const mongoose=require('mongoose')
require('dotenv').config() 
mongoose.connect(process.env.MONGOOSE_URL||'mongodb://localhost:27017/DevConnector', 
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
(error,client)=>{
  if(error)
  return console.log('Not connected to mongoose',error)
  console.log('connected to mongoose')
});