import React, { useContext } from "react";
import { ThemeContext } from '../utils/ThemeContext';



function Demo() {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#121212",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={styles} className="flex flex-col min-h-screen bg-gray-50">

      <main className="flex-grow px-4 py-5 sm:p-6">
        <h1 className="text-3xl font-bold mb-4">How to use Budget Better</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Signup and enter basic info
          </h2>
          <p className="text-base ">
            Description and usage of this feature
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Use Budget Better tools to your Advantage
          </h2>
          <p className="text-base">
            Description and usage of this feature
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Video Demo</h2>
          <div className="flex justify-center">
            <video
              className="rounded shadow-lg"
              width="320"
              height="240"
              controls
            >
              <source src="add src here" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Demo;