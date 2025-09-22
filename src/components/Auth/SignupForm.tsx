import React, { useState } from 'react';
import { PulseWireLogo } from './PulseWireLogo';
import { AuthBackground } from './AuthBackground';

interface SignupFormProps {
  onToggle: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8086/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email.trim(),
          password: password.trim()
        })
      });

      if (!response.ok) {
        // Backend may not return JSON, fallback to text
        const errorText = await response.text();
        throw new Error(errorText || 'Signup failed');
      }

      const data = await response.json(); // Should return the created user
      console.log('Signup Response:', data);
      setSuccess('Signup successful! You can now login.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="fixed inset-0">
      <AuthBackground />
      <main className="h-screen w-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
          <PulseWireLogo />
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Join PulseWire</h2>

          {error && <div className="bg-red-500/20 border border-red-500 text-white px-4 py-2 rounded mb-4">{error}</div>}
          {success && <div className="bg-green-500/20 border border-green-500 text-white px-4 py-2 rounded mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div>
              <label htmlFor="confirmPassword" className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-white text-center">
            Already have an account?{' '}
            <button onClick={onToggle} className="text-blue-400 hover:text-blue-300">Login</button>
          </p>
        </div>
      </main>
    </div>
  );
};
