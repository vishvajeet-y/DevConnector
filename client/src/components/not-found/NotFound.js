import React from 'react'

const NotFound=()=> {
    return (
        <div>
            <h1 className="display-4">Page Not Found</h1>
            <p>Sorry, this page does not exist</p>
            <button onClick={(e)=>{window.history.back()}} className="btn btn-light mb-3 float-left">
            Go Back
           </button>
        </div>
    )
}

export default NotFound
