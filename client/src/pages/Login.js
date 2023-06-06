import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import companyLogo from "../assets/images/BudgetBetterLogo.png";

import Auth from "../utils/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

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

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={companyLogo}
            alt="Budget Better Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>

          {/* Display error message */}
          {error && (
            <div className="my-3 p-3 bg-red-500 text-white">
              {error.message}
            </div>
          )}

          {/* Display success message */}
          {data && (
            <div className="my-3 p-3 bg-green-500 text-white">
              Success! You may now head{" "}
              <Link
                className="underline text-indigo-600 hover:text-indigo-500"
                to="/"
              >
                back to the homepage.
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../utils/mutations";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
// import companyLogo from "../assets/images/BudgetBetterLogo.png";

// import Auth from "../utils/auth";

// const Login = (props) => {
//   const [formState, setFormState] = useState({ email: "", password: "" });
//   const [login, { error, data }] = useMutation(LOGIN_USER);

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formState);

//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });

//       Auth.login(data.login.token);
//     } catch (e) {
//       console.error(e);
//     }

//     // clear form values
//     setFormState({
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <main className="flex-row justify-center mb-4">
//       <div className="col-12 col-lg-12">
//         <div className="card login-form">
//           <div className="logo-container">
//             <img src={companyLogo} alt="Company Logo" className="logo" />
//           </div>
//           <form onSubmit={handleFormSubmit}>
//             {/* Username input */}
//             <div className="input-group">
//               <FontAwesomeIcon icon={faUser} className="input-icon" />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="email"
//                 name="email"
//                 placeholder="Username"
//                 value={formState.email}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Password input */}
//             <div className="form-group">
//               <div className="input-group">
//                 <FontAwesomeIcon icon={faLock} className="input-icon" />
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formState.password}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Submit button */}
//             <div className="form-group">
//               <button type="submit" className="btn btn-primary">
//                 Sign In
//               </button>
//             </div>
//           </form>

//           {/* Sign Up link */}
//           <p className="signup-link">
//             Don't have an account? <Link to="/signup">Sign Up</Link>
//           </p>

//           {/* Display error message */}
//           {error && (
//             <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
//           )}

//           {/* Display success message */}
//           {data && (
//             <div className="my-3 p-3 bg-success text-white">
//               Success! You may now head{" "}
//               <Link to="/">back to the homepage.</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Login;
