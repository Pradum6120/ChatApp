import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { otherUsers } from '../store/UserSlice';
import { FaSearch } from 'react-icons/fa';
import OtherUsers from './OtherUsers';


function Lhome() {
  const { otherUsers: otherUsersList, loading, error } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(otherUsers());  // Dispatch action to fetch other users
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-[27%] h-[100%] rounded-tl-3xl rounded-bl-3xl border border-white">
      {/* Search Bar */}
      <div className="w-[100%] h-[14%] bg-blue-700 flex justify-center items-center rounded-tl-3xl relative">
        <input
          className="w-[73%] h-11 rounded-3xl bg-white p-5 outline-none"
          type="search"
          placeholder="Search user"
        />
        <FaSearch className="absolute left-72 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>

      {/* User List */}
      <div className="flex flex-col w-[100%] h-[85%] overflow-y-auto rounded-bl-3xl">
        {otherUsersList.length > 0 ? (
          <ul>
            {otherUsersList.map((userItem) => (
               <OtherUsers key={userItem.id} user={userItem} />
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Lhome;
