import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setToken } from "../store/authSlice"

function Signup() {
  const [username, setUsername] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');  // default gender
  const [loading, setLoading] = useState(false);  // loading state
  const [error, setError] = useState(null);  // error state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = {
    username,
    fullname,
    email,
    password,
    gender
  };

  const handleSignup = async(e) => {
    e.preventDefault();
    console.log('Signing up with:', { username, fullname, email, password, gender });

    // Validation example: check if all fields are filled
    if (!username || !fullname || !email || !password || !gender) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);  // Set loading state to true

    try {
      const response = await fetch("http://localhost:8000/api/users/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      console.log("result", result);

      if (response.ok && result.success) {
        localStorage.setItem("token", result.token)
        dispatch(setToken(result.token));
        navigate('/'); // Navigate to home page on successful signup
      } else {
        setError(result.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className='w-screen h-screen bg-[url("./bg.webp")] bg-cover bg-center flex justify-center items-center'>
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-400 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        
        {error && <div className="text-red-500 text-center">{error}</div>}  {/* Error message */}
        
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Gender</label>
            <div className="flex items-center space-x-6">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="male" className="text-sm text-gray-600">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="female" className="text-sm text-gray-600">Female</label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}  // Disable button during loading
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
