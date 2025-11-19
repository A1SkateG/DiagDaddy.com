import React, { useState } from 'react';
import '../styles/Auth.css';

/**
 * Sign-in page placeholder. Collects user credentials but does not implement authentication.
 */
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send credentials to the backend here.
    alert('Sign in functionality is not implemented in this demo.');
  };
  return (
    <section className="auth container">
      <h1 className="auth__title">Sign In</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn">Sign In</button>
      </form>
    </section>
  );
}