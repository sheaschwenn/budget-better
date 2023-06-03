import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Chatbot.css"; // Need to improve this CSS file as we move foward

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const handleUserInput = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = message;

    // We need to replace "/chat" with our actual API endpoint, or make sure we create one that matches this path
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

    // Adds a new object to the history array
    setHistory([...history, { prompt: input, response: responseMessage }]);

    // Clears the input field
    setMessage("");
  };

  return (
    <div className="container mt-5 w-50">
      <h1 className="text-center">My Chatbot</h1>
      <div className="card">
        <div className="card-header">Chat History</div>
        <ul id="chat-history" className="list-group list-group-flush">
          {history.map((item, index) => (
            <div key={index}>
              <li className="list-group-item">Prompt: {item.prompt}</li>
              <li className="list-group-item">Response: {item.response}</li>
            </div>
          ))}
        </ul>
      </div>
      <div className="input-group">
        <span className="input-group-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
          &nbsp;You
        </span>

        <textarea
          id="user-input"
          className="form-control"
          aria-label="With textarea"
          onChange={handleUserInput}
        ></textarea>
      </div>
      <div className="text-center">
        <button
          id="submit"
          type="button"
          className="btn btn-primary mt-2"
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

export default Chatbot;
