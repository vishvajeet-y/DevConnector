import React ,{useState,useEffect,useRef}  from 'react'



const ProfileGithub=(props) =>{
  require('dotenv').config()
    const {username}=props
      const myRef=useRef(null)
      const clientId=process.env.REACT_APP_GITHUB_ID
      const clientSecret=process.env.REACT_APP_GITHUB_KEY
      const count=5
      const sort='created: asc'
      const [repos,setrepos]=useState([])
      
  
        
      useEffect(()=>{
        
          fetch(`https://api.github.com/users/${username}/repos?per_page=${count}
          &sort=${sort}&client_id=${clientId}&
        client_secret=${clientSecret} `)
        .then(res=>res.json())//Promise Chaining
        .then(data=>{
            //console.log(myRef.current)
              if(myRef.current)
              setrepos(data)
        }).catch(err=>{
            console.log(err)
        })
      

      },[])

      const repoItems=repos.map(repo=>(
          <div key={repo.id} className="card card-body mb-2">
            <div className="row">
             <div className="col-md-6">
             <h4>
              <a href={repo.html_url} className="text-info" target="_blank" rel="noreferrer">
              {repo.name}
              </a>
             </h4>
             <p>{repo.description}</p>
             </div>
             <div className="col-md-6">
            
              <span className="badge bg-info me-1">
              Stars: {repo.stargazers_count}
               </span>
               <span className="badge bg-secondary me-1">
               Watchers: {repo.watchers_count}
                </span>
                <span className="badge bg-success ">
                Forks: {repo.forks_count}
                 </span>
             </div>
            </div>
          </div>
      ))

    return (
        <div ref={myRef}>
            <hr/>
            <h3 className="mb-4">Latest Github Repos</h3>
            {repoItems}
        </div>
    )
}
export default  ProfileGithub