import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import companyLogo from '../assets/images/BudgetBetterLogo.png';
import { ThemeContext } from '../utils/ThemeContext';




import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#121212",
    
    display: "flex",
    flexDirection: "column",
  };

  return (
    <main style={styles} className="flex items-center justify-center h-screen">
      <div style={styles} className="bg-white shadow-lg rounded-lg p-8 max-w-sm">
        <div className="flex justify-center">
          <img src={companyLogo} alt="Company Logo" className="h-16 w-auto" />
        </div>
        <form className="mt-6" onSubmit={handleFormSubmit}>
          <div>
            <div className="flex">
              <span className="text-gray-400">
                <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
              </span>
              <input
                type="text"
                className="ml-2.5 border-b-2 border-gray-400 focus:border-indigo-600 outline-none"
                id="email"
                name="email"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex">
              <span className="text-gray-400">
                <FontAwesomeIcon icon={faLock} className="h-5 w-5" />
              </span>
              <input
                type="password"
                className="ml-2.5 border-b-2 border-gray-400 focus:border-indigo-600 outline-none"
                id="password"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-md py-2.5 px-4 text-center font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <div className="my-4 p-3 bg-red-500 text-white rounded-md">
            {error.message}
          </div>
        )}
  
        {data && (
          <div className="my-4 p-3 bg-green-500 text-white rounded-md">
            Success! You may now{' '}
            <Link
              to="/dashboard"
              className="underline font-semibold hover:text-white"
            >
              go to the dashboard
            </Link>
            .
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
