const validator=require('validator')
const isEmpty = require('./isEmpty')

const validatePostInput=(data)=>{
    let errors={}
    data.text=!isEmpty(data.text)?data.text:''
    
    if(!validator.isLength(data.text,{min:10,max:500})){
        errors.text='Post should be between 10 and 500 character '
    }

    if(validator.isEmpty(data.text))
    {
        errors.text='Text field is required'
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports=validatePostInput