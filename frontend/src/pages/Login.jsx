import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from "../store/authSlice"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = {
      email, 
      password
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    try {
        const response = await fetch("http://localhost:8000/api/users/login",{
              method: "POST",
              headers: {
                 'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
        })
         console.log(response)
        const result = await response.json()
        console.log(result)
        if (response.ok && result.success) {
            localStorage.setItem("token", result.token)
            dispatch(setToken(result.token));
            navigate('/'); // Navigate to home page on successful signup
          }
        }
        catch(error){
            console.log(error)
        }
  };

  return (
    <div className='w-screen h-screen bg-[url("./bg.webp")] bg-cover bg-center flex justify-center items-center'>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to ="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
