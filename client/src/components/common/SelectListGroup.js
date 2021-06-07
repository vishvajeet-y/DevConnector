import React from 'react'
import classname from 'classnames'
 const SelectListGroup=({
     name, 
     value,
     error,
     info,
     onChange,
     options
     
 })=>  {
     const selectOption=options.map(option=>(
         <option key={option.label} value={option.value}>
         {option.label}
         </option>
     ))
    return (
       
        <div className="form-group mb-2">
        <select
          className={classname("form-control form-control-lg ",{
            "is-invalid":error
         }    
         )}   
        
          value={value} 
          name={name}
          onChange={onChange}
           
           >
           {selectOption}
           </select>
           
          {error&&(<div className="invalid-feedback">{error} </div>)}
          {info&&(<small className="form-text text-muted">{info} </small>)}
          </div>
    )
}

export default SelectListGroup
