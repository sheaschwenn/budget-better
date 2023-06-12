import React, { useState, useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";

const financialKeywords = [
  "stocks",
  "invest",
  "finance",
  "money",
  "economy",
  "market",
  "bank",
  "tax",
  "financial",
  "savings",
  "budgeting",
  "expenses",
  "income",
  "retirement",
  "pension",
  "401k",
  "IRA",
  "annuity",
  "insurance",
  "mortgage",
  "debt",
  "loan",
  "credit",
  "interest",
  "equity",
  "bonds",
  "mutual funds",
  "ETF",
  "dividend",
  "capital",
  "securities",
  "portfolio",
  "risk",
  "real estate",
  "asset",
  "liability",
  "bankruptcy",
  "foreclosure",
  "adjustable rate",
  "fixed rate",
  "amortization",
  "principal",
  "index fund",
  "commodity",
  "bull market",
  "bear market",
  "inflation",
  "deflation",
  "Dow Jones",
  "S&P 500",
  "NASDAQ",
  "liquidity",
  "volatility",
  "day trading",
  "short selling",
  "yield",
  "capital gain",
  "balance sheet",
  "income statement",
  "cash flow",
  "financial advisor",
  "fiscal",
  "monetary",
  "Federal Reserve",
  "cryptocurrency",
  "bitcoin",
  "ethereum",
  "ripple",
  "blockchain",
  "ledger",
  "wallet",
  "mining",
  "ICO",
  "altcoin",
  "token",
  "smart contract",
  "hashrate",
  "fiat",
  "exchange",
  "peer-to-peer",
  "decentralized",
  "scalability",
  "proof of work",
  "proof of stake",
  "staking",
  "pump and dump",
  "FOMO",
  "whale",
  "bullish",
  "bearish",
  "ROI",
  "return",
  "performance",
  "diversification",
  "robo-advisor",
  "passive income",
  "frugality",
  "emergency fund",
  "net worth",
  "credit score",
  "credit report",
  "debt to income",
  "loan to value",
  "down payment",
  "escrow",
  "prequalification",
  "preapproval",
  "closing costs",
  "private mortgage insurance",
  "compound interest",
  "tax deduction",
  "tax credit",
  "itemized deduction",
  "standard deduction",
  "tax bracket",
  "capital gains tax",
  "estate tax",
  "gift tax",
  "self-employment tax",
  "withholding",
  "tax lien",
  "audit",
  "FICO score",
  "APR",
  "revolving credit",
  "installment credit",
  "charge off",
  "delinquency",
  "default",
  "foreclosure",
  "bankruptcy",
  "secured debt",
  "unsecured debt",
  "debt consolidation",
  "credit counseling",
  "debt settlement",
  "student loans",
  "personal loans",
  "payday loans",
  "home equity loans",
  "auto loans",
  "microloans",
  "subprime loans",
  "predatory lending",
  "loan shark",
  "pawnbroker",
  "title loan",
  "peer-to-peer lending",
  "hard money loan",
  "soft money loan",
  "credit union",
  "online banking",
  "mobile banking",
  "direct deposit",
  "ATM",
  "debit card",
  "credit card",
  "savings account",
  "checking account",
  "money market account",
  "certificate of deposit",
  "overdraft protection",
  "wire transfer",
  "automatic bill payment",
  "mobile payment",
  "e-commerce",
  "crowdfunding",
  "identity theft",
  "phishing",
  "firewall",
  "encryption",
  "malware",
  "ransomware",
  "spyware",
  "adware",
  "VPN",
  "biometrics",
  "two-factor authentication",
  "password",
  "cybersecurity",
  "fraud",
  "scam",
  "Ponzi scheme",
  "pyramid scheme",
  "insider trading",
  "money laundering",
  "embezzlement",
  "white collar crime",
  "corporate crime",
  "securities fraud",
  "credit fraud",
  "bank fraud",
  "investment fraud",
  "tax evasion",
  "counterfeiting",
  "bribery",
  "kickback",
  "extortion",
  "black market",
  "under the table",
  "offshore banking",
  "shell corporation",
  "tax haven",
];

const Cashbot = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#121212",
  };

  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const handleUserInput = (e) => {
    setMessage(e.target.value);
  };

  const isFinancial = (message) => {
    return financialKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = message;

    if (!isFinancial(input)) {
      setHistory([
        ...history,
        {
          prompt: input,
          response: "Sorry, I can only answer financial questions.",
        },
      ]);
      setMessage("");
      return;
    }

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
    <div
      style={styles}
      className="pointer-event-none isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="min-h-screen container mx-auto mt-10 w-1/2">
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
            style={styles}
            id="user-input"
            className="w-full p-2 border rounded"
            onChange={handleUserInput}
          ></textarea>
        </div>
        <div className="text-center mt-4">
          <button
            id="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Submit Prompt
          </button>
          <div
            style={styles}
            id="spinner"
            className="spinner-grow text-primary visually-hidden mt-2"
            role="status"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Cashbot;
