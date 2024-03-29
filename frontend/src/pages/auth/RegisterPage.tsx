import { useNavigate } from 'react-router-dom';
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';

import { useTitle } from '../../hooks/useChangeTitle';
import { toast } from 'react-toastify';

import { useUser } from '../../hooks/useUserFunctions';
import { UserContext } from '../../context/userContext';

export const RegisterPage = () => {
  useTitle('Login');
  let { register } = useUser();
  let navigate = useNavigate();
  let { user } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');

  useEffect(() => {
    if (user.isLoggedIn) return navigate('/');
  }, []);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!username) return toast.error('Username is required');
    if (!password) return toast.error('Password is required');
    if (!confirmation) return toast.error('Confirmation is required');
    if (password !== confirmation)
      return toast.error('Password does not match confirmation');

    register(username, password).then(
      () => {
        navigate('/');
        toast.success('Registered and logged in');
      },
      (err) => {
        console.log(err);
        toast.error(err.toString());
      }
    );
  };

  return (
    <div className="h-screen w-screen flex justify-center">
      <form className="pt-32 flex-col" onSubmit={submitHandler}>
        <h1 className="font-bold text-4xl mb-8">Register</h1>

        <div className="mb-6">
          <p className="">Username</p>
          <div className="flex mb-5 border-2 border-black border-opacity-25">
            <div className="h-10 w-10 opacity-25 p-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <input
              size={30}
              className="focus:outline-none"
              placeholder=""
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <p>Password</p>
          <div className="flex mb-5 border-2 border-black border-opacity-25">
            <div className="h-10 w-10 opacity-25 p-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <input
              size={30}
              className="focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              type={showPassword ? 'text' : 'password'}
            />
            <div
              className="h-10 w-10 opacity-25 p-2 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <p>Confirm Password</p>
          <div className="flex mb-5 border-2 border-black border-opacity-25">
            <div className="h-10 w-10 opacity-25 p-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <input
              size={30}
              className="focus:outline-none"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder=""
              type={showConfirmation ? 'text' : 'password'}
            />
            <div
              className="h-10 w-10 opacity-25 p-2 flex items-center"
              onClick={() => setShowConfirmation(!showConfirmation)}
            >
              {showConfirmation ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        <button className="text-white bg-black border-1 border-black w-full sm:px-16 py-3">
          Register
        </button>
      </form>
    </div>
  );
};
