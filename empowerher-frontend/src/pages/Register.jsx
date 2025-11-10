import React, {useState} from 'react';
import client from '../api';

export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  async function submit(e){ e.preventDefault();
    try{ await client.post('/api/auth/register',{ name, email, password }); alert('Registered - login now'); }
    catch(e){ alert('Failed to register'); }
  }
  return (
    <main className="container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="btn" type="submit">Register</button>
        </form>
      </div>
    </main>
  );
}
