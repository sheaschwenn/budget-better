import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import companyLogo from "../assets/images/BudgetBetterLogo.png";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
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
      email: "",
      password: "",
    });
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-12">
          <div className="card login-form">
            <div className="logo-container">
              <img src={companyLogo} alt="Company Logo" className="logo" />
            </div>
            <form onSubmit={handleFormSubmit}>
              {/* Username input */}
              <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password input */}
              <div className="form-group">
                <div className="input-group">
                  <FontAwesomeIcon icon={faLock} className="input-icon" />
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
            </form>

            {/* Sign Up link */}
            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>

            {/* Display error message */}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}

            {/* Display success message */}
            {data && (
              <div className="my-3 p-3 bg-success text-white">
                Success! You may now head{" "}
                <Link to="/dashboard">back to the homepage.</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
