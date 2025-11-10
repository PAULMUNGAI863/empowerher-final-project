import React from 'react';
export default function Contact(){
  const send = (e)=>{ e.preventDefault(); alert('This form opens your email client'); window.location.href = 'mailto:paulmungai288@gmail.com'; };
  return (
    <main className="container">
      <div className="card">
        <h2>Contact</h2>
        <form onSubmit={send}>
          <input placeholder="Your name" required />
          <input placeholder="Your email" type="email" required />
          <textarea placeholder="Message" rows="5" required></textarea>
          <button className="btn" type="submit">Send</button>
        </form>
        <p>Email: paulmungai288@gmail.com • Phone: 0745264778</p>
      </div>
    </main>
  );
}
