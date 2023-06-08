

import React, { useState } from "react";

const Cashbot = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = message;

  const handleUserInput = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = message;

    const response = await fetch("/cashbot", {
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
    <div className="container mx-auto mt-10 w-1/2">
      <h1 className="text-center text-3xl mb-6">My Chatbot</h1>
      <div className="border rounded shadow p-4">
        <div className="font-bold mb-2">Chat History</div>
        <ul id="chat-history">
          {history.map((item, index) => (
            <div key={index}>
              <li className="p-2 border-b">Prompt: {item.prompt}</li>
              <li className="p-2 border-b">Response: {item.response}</li>
            </div>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <div className="font-bold mb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-circle mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
          You
        </div>
        <textarea
          id="user-input"
          className="w-full p-2 border rounded"
          onChange={handleUserInput}
        ></textarea>
      </div>
      <div className="text-center mt-4">
        <button
          id="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleSubmit}
        >
          Submit Prompt
        </button>
        <div
          id="spinner"
          className="spinner-grow text-primary visually-hidden mt-2"
          role="status"
        ></div>
      </div>

    </div>
  );
};

export default Cashbot;
