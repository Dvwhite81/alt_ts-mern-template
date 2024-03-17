import { Link } from 'react-router-dom';
import React from 'react';
import { useTitle } from '../hooks/useChangeTitle';
import { UserContext } from '../context/userContext';
export const HomePage = () => {
  const { setUser, user } = React.useContext(UserContext);

  useTitle('New Title');
  return (
    <div className="h-screen w-screen flex justify-center pt-32">
      <div>
        <h1 className="font-bold text-3xl pb-6">Advanced MERN auth Template</h1>
        <p className="pb-6">Home</p>
        <div>
          <p className="font-mono p-2 bg-gray-100 rounded text-center">
            IsLoggedIn: {user.isLoggedIn ? 'True' : 'False'}
          </p>
        </div>
        {user.isLoggedIn ? (
          <div className="flex justify-center gap-4 mt-10">
            <Link
              to="/profile"
              className="text-white bg-black border-2 w-full border-black text-center py-3"
            >
              Profile
            </Link>
            <Link
              to="/logout"
              className="text-black bg-white border-2 w-full border-black text-center py-3"
            >
              LogOut
            </Link>
          </div>
        ) : (
          <div className="flex justify-center gap-4 mt-10">
            <Link
              to="/login"
              className="text-white bg-black border-2 w-full border-black text-center py-3"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-black bg-white border-2 w-full border-black text-center py-3"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
