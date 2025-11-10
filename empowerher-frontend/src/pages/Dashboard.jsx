import React, {useState} from 'react';
import client from '../api';

export default function Dashboard(){
  const [recs, setRecs] = useState([]);
  const token = localStorage.getItem('token');
  const getRecs = async ()=>{
    if(!token) return alert('Login first');
    try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      const res = await client.get('/api/recommendations/for-user/'+userId);
      setRecs(res.data);
    }catch(e){ alert('Failed to fetch recommendations'); }
  };
  return (
    <main className="container">
      <h2>Dashboard</h2>
      <div className="card">
        <button className="btn" onClick={getRecs}>Get Job Recommendations</button>
        {recs.map(r=> (
          <div key={r.job._id} className="card">
            <h3>{r.job.title}</h3>
            <p>Score: {r.score.toFixed(2)}</p>
            <a href={'/jobs/'+r.job._id}>View</a>
          </div>
        ))}
      </div>
    </main>
  );
}
