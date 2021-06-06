import React from 'react'
import classname from 'classnames'
 const InputGroup=({
     name, 
     placeholder,
     value,
     error,
     icon,
     type,
     onChange,
    
     
 })=>  {
    return (
       
        <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text">
        <i style={{fontSize:'2rem'}} className={icon}/>
        </span>
        </div>
          <input type={type}
          className={classname("form-control form-control-lg ",{
            "is-invalid":error
         }    
         )}   
          placeholder={placeholder}
          value={value} 
          name={name}
          onChange={onChange}
          
           />
          {error&&(<div className="invalid-feedback">{error} </div>)}
          
          </div>
    )
}
InputGroup.defaultProps={
    type:'text'
}

export default InputGroup
