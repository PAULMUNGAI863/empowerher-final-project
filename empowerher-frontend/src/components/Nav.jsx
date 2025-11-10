import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(){
  return (
    <header className="nav">
      <div className="container">
        <div className="brand"><Link to="/">EmpowerHer</Link></div>
        <nav className="links">
          <Link to="/jobs">Jobs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
