import React from 'react';
import { useSelector } from 'react-redux';

function Navbar() {
  // Get user from Redux store
  const loginUser = useSelector((state) => state.User.User);

  // Handle the case when the user is not logged in or user data is not available
  if (!loginUser) {
    return (
      <div className="min-w-screen w-screen bg-blue-700 h-[60px] p-8 flex justify-between gap-6 items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-xl text-orange-500 font-mono">Hii, Guest</h1>
        </div>
        <div className="w-12 h-12 bg-red-700 rounded-full mr-12">
          {/* Display a placeholder image or a default icon */}
          <img className="w-[100%] h-[100%] rounded-full" src="path/to/default-avatar.png" alt="default avatar" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-screen w-screen bg-blue-700 h-[60px] p-8 flex justify-between gap-6 items-center">
      <div className="flex flex-col justify-center">
        <h1 className="text-xl text-orange-500 font-mono">Hii, {loginUser.name}</h1>
      </div>
      <div className="w-12 h-12 bg-red-700 rounded-full mr-12">
        <img className="w-[100%] h-[100%] rounded-full" src={loginUser.profilepicture} alt={`${loginUser.name}'s profile`} />
      </div>
    </div>
  );
}

export default Navbar;
