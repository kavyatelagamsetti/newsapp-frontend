import React, { useState } from 'react';
import { PulseWireLogo } from './PulseWireLogo';
import { AuthBackground } from './AuthBackground';
import NewsAggregator from './../NewsAggregator';

interface LoginFormProps {
  onToggle: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // track login state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8086/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.trim(), password: password.trim() })
      });

      const data = await response.text();

      if (response.ok && data === 'Login Successful') {
        setSuccess('Login successful!');
        setTimeout(() => {
          setLoggedIn(true); // switch to NewsAggregator
        }, 500); // optional delay to show success message
      } else {
        throw new Error(data || 'Login failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // If logged in, render NewsAggregator instead of login form
  if (loggedIn) {
    return <NewsAggregator />;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center">
      <AuthBackground />
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="w-full p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 flex flex-col items-center justify-center">
          <PulseWireLogo />
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>

          {error && <div className="bg-red-500/20 border border-red-500 text-white px-4 py-2 rounded mb-4">{error}</div>}
          {success && <div className="bg-green-500/20 border border-green-500 text-white px-4 py-2 rounded mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-white text-center">
            Don't have an account?{' '}
            <button onClick={onToggle} className="text-blue-400 hover:text-blue-300">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
};
