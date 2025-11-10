import React, {useEffect, useState} from 'react';
import client from '../api';

export default function Jobs(){
  const [jobs,setJobs]=useState([]);
  useEffect(()=>{ fetchJobs(); },[]);
  async function fetchJobs(){ try{ const res = await client.get('/api/jobs'); setJobs(res.data);}catch(e){console.error(e);} }
  return (
    <main className="container">
      <h2>Job Listings</h2>
      {jobs.map(j=> (
        <div key={j._id} className="card job">
          <h3>{j.title}</h3>
          <p>{j.location} • {j.type}</p>
          <p>{j.skills && j.skills.join(', ')}</p>
          <a href={`/jobs/${j._id}`} className="link">View</a>
        </div>
      ))}
    </main>
  );
}
