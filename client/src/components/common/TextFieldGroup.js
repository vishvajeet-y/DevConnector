import React from 'react'
import classname from 'classnames'
 const TextFieldGroup=({
     name, 
     placeholder,
     value,
     error,
     info,
     type,
     onChange,
     disabled
     
 })=>  {
    return (
       
        <div className="form-group mb-2">
          <input type={type} 
          className={classname("form-control form-control-lg",{
            "is-invalid":error
         }    
         )}   
          placeholder={placeholder}
          value={value} 
          name={name}
          onChange={onChange}
          disabled={disabled} 
           />
         
          {error&&(<div className="invalid-feedback">{error} </div>)}
          {info&&(<small className="form-text text-muted">{info} </small>)}
          </div>
    )
}

TextFieldGroup.defaultProps={
    type:'text'
}
export default TextFieldGroup
