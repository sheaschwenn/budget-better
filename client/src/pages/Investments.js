import { ThemeContext } from "../utils/ThemeContext";
import React, { useContext } from "react";

export default function Investments() {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#192734",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div
      style={styles}
      className="pointer-event-none isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Investments Feature - Coming Soon
          </h2>
          <p className="mt-6 text-lg leading-8">
            We're working hard to bring you a new feature to help you manage
            your investments. With the upcoming "Investments" feature, you'll be
            able to:
            <ul className="list-disc list-inside mt-4">
              <li>
                Track the performance of your stocks, bonds, mutual funds, and
                other investments in real time.
              </li>
              <li>
                Get personalized recommendations for optimizing your investment
                portfolio based on your financial goals and risk tolerance.
              </li>
              <li>
                Receive alerts when market conditions change that might impact
                your investments.
              </li>
            </ul>
            Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
}
