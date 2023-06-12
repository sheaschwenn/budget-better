import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" z-50 py-10 px-5  bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* My Account Column */}
        <div className="mb-4">
          <h4 className="font-semibold mb-4">My Account</h4>
          <ul>
            <li className="mb-2">
              <Link to="/account" className="text-white hover:text-indigo-500">
                Account
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/dashboard"
                className="text-white hover:text-indigo-500"
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/cashbot" className="text-white hover:text-indigo-500">
                Cashbot
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="mb-4">
          <h4 className="font-semibold mb-4">Support</h4>
          <ul>
            <li className="mb-2">
              <Link to="/faq" className="text-white hover:text-indigo-500">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="text-white hover:text-indigo-500">
                About
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="text-white hover:text-indigo-500">
                Contact
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/demo" className="text-white hover:text-indigo-500">
                Demo
              </Link>
            </li>
          </ul>
        </div>

        {/* Budget Better Column */}
        <div className="mb-4">
          <h4 className="font-semibold mb-4">Budget Better</h4>
          <ul>
            <li className="mb-2">
              <Link
                to="/testimonials"
                className="text-white hover:text-indigo-500"
              >
                Testimonials
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/features" className="text-white hover:text-indigo-500">
                Features
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/ourmission"
                className="text-white hover:text-indigo-500"
              >
                Our Mission
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-4 mt-10">
        <small>
          © {new Date().getFullYear()} Budget Better. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
