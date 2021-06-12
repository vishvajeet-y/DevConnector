import React from 'react'

const UserNotFound=()=> {
    return (
        <div>
            <h1 className="display-4">User Not Found</h1>
            <p>Sorry, this page does not exist</p>
            <button onClick={(e)=>{window.history.go(-2)}} className="btn btn-light mb-3 float-left">
            Go Back
           </button>
        </div>
    )
}

export default UserNotFound
