import React, {useEffect, useState} from 'react';
import client from '../api';
import { useParams } from 'react-router-dom';

export default function JobDetail(){
  const { id } = useParams();
  const [job,setJob]=useState(null);
  useEffect(()=>{ if(id) client.get('/api/jobs/'+id).then(r=>setJob(r.data)).catch(()=>{}); },[id]);
  const apply = async ()=>{
    const token = localStorage.getItem('token');
    if(!token) return alert('Please login first');
    try{
      await client.post('/api/applications', { jobId: id, coverLetter: 'Interested' }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Applied');
    }catch(e){ console.error(e); alert('Failed'); }
  };
  if(!job) return <main className="container"><div className="card">Loading...</div></main>;
  return (
    <main className="container">
      <div className="card">
        <h2>{job.title}</h2>
        <p>{job.location} • {job.type}</p>
        <p>{job.description}</p>
        <p>Skills: {job.skills && job.skills.join(', ')}</p>
        <button className="btn" onClick={apply}>Apply</button>
      </div>
    </main>
  );
}
