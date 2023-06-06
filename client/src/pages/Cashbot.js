import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Chatbot = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const styles = {
    backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
  };
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const handleUserInput = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = message;

    const response = await fetch("/chat", {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
        temp: 0.6,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    const responseMessage = responseData.result[0].message.content;

    setHistory([...history, { prompt: input, response: responseMessage }]);

    setMessage("");
  };

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
              Chat History
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden p-4">
              <ul className="divide-y divide-gray-200">
                {history.map((item, index) => (
                  <div key={index} className="py-4 text-sm">
                    <p className="font-medium text-gray-900">
                      Prompt: {item.prompt}
                    </p>
                    <p className="text-gray-500">Response: {item.response}</p>
                  </div>
                ))}
              </ul>
              <textarea
                id="user-input"
                className="form-control mt-4 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                rows="3"
                onChange={handleUserInput}
                value={message}
              ></textarea>
              <div className="text-center">
                <button
                  id="submit"
                  type="button"
                  className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSubmit}
                >
                  Submit Prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chatbot;
