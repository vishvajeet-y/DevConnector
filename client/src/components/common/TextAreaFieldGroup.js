import React from 'react'
import classname from 'classnames'
 const TextAreaFieldGroup=({
     name, 
     placeholder,
     value,
     error,
     info,
     onChange,
  
     
 })=>  {
    return (
       
        <div className="form-group mb-2">
          <textarea
            className={classname("form-control form-control-lg ",{
            "is-invalid":error
         }    
         )}   
          placeholder={placeholder}
          value={value} 
          name={name}
          onChange={onChange}
           
           />
           {info&&(<small className="form-text text-muted">{info} </small>)}
          {error&&(<div className="invalid-feedback">{error} </div>)}
          </div>
    )
}


export default TextAreaFieldGroup
