import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Demo() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow px-4 py-5 sm:p-6">
        <h1 className="text-3xl font-bold mb-4">How to use Budget Better</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Signup and enter basic info
          </h2>
          <p className="text-base text-gray-500">
            Description and usage of this feature
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Use Budget Better tools to your Advantage
          </h2>
          <p className="text-base text-gray-500">
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
      <Footer />
    </div>
  );
}

export default Demo;
