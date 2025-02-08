import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGithub } from 'react-icons/fa'; // ✅ Import Envelope, Lock, GitHub from react-icons
import { FcGoogle } from 'react-icons/fc'; // ✅ Import Google icon

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
  };

  const handleGithubLogin = () => {
    console.log('Login with GitHub');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to continue your learning journey</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FaLock className="h-5 w-5" />
            <span>Sign In</span>
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-white text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <FcGoogle className="h-6 w-6" />
            <span>Sign in with Google</span>
          </button>

          <button
            onClick={handleGithubLogin}
            className="w-full py-3 bg-white text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <FaGithub className="h-5 w-5" />
            <span>Sign in with GitHub</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-gray-800 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
