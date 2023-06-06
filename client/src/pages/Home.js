import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ThemeContext } from "../utils/ThemeContext";
import { useContext } from "react";

import { GET_ME } from "../utils/queries";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Home = () => {
  const { loading, data } = useQuery(GET_ME);
  const me = data?.me || {};
  const { isDarkMode } = useContext(ThemeContext);

  const styles = {
    backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
  };

  return (
    <main>
      <div style={styles} className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2 className="text-center">Welcome to BudgetBetter</h2>
              <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3"></div>
              </div>
              <div className="flex-row justify-center mt-3">
                <Link to="/login" className="btn btn-primary mr-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Signup
                </Link>
                <Link to="/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
                <Link to="/cashbot" className="btn btn-primary">
                  Cashbot
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
