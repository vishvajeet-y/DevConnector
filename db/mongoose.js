const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/DevConnector', 
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},
(error,client)=>{
  if(error)
  return console.log('Not connected to mongoose',error)
  console.log('connected to mongoose')
});