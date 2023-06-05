import React from "react";
import Navbar from "../components/Navbar";
import Chatbot from "../components/chatbot";
import Footer from "../components/Footer";

const Cashbot = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Chatbot
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Chatbot Page
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            <Chatbot className="flex flex-col rounded-lg shadow-lg overflow-hidden" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cashbot;
