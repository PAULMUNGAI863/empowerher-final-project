import React, {useState} from 'react';
import client from '../api';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  async function submit(e){
    e.preventDefault();
    try{
      const res = await client.post('/api/auth/login',{ email, password });
      localStorage.setItem('token', res.data.token);
      alert('Logged in');
    }catch(e){ alert(e.response?.data?.msg || 'Login failed'); }
  }
  return (
    <main className="container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="btn" type="submit">Login</button>
        </form>
        <p>Use seeded accounts (candidate@empowerher.com / candidate123)</p>
      </div>
    </main>
  );
}
