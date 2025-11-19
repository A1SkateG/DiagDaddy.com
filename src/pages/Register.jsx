import React, { useState } from 'react';
import '../styles/Auth.css';

/**
 * Registration page placeholder. Collects user details but does not create accounts.
 */
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration functionality is not implemented in this demo.');
  };
  return (
    <section className="auth container">
      <h1 className="auth__title">Register</h1>
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn">Register</button>
      </form>
    </section>
  );
}