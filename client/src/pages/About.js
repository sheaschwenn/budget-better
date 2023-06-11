import { FaGithub, FaLinkedin } from "react-icons/fa";
import chrisImg from "../assets/images/chris.png";
import didrikImg from "../assets/images/didrik.jpg";
import mattImg from "../assets/images/matt.jpeg";
import sheaImg from "../assets/images/shea.jpeg";
import { ThemeContext } from "../utils/ThemeContext";
import React, { useContext } from "react";

const people = [
  {
    name: "Shea Schwennicke",
    role: "Co-Founder / CEO",
    imageUrl: sheaImg,
    githubUrl: "https://github.com/sheaschwenn",
    linkedin: "https://www.linkedin.com/in/shea-schwennicke/",
  },
  {
    name: "Christopher Daniels",
    role: "Co-Founder / CFO",
    imageUrl: chrisImg,
    githubUrl: "https://github.com/danielschris96",
    linkedin: "https://www.linkedin.com/in/christopher-daniels-01317726b/",
  },
  {
    name: "Didrik Lindberg",
    role: "Co-Founder / CTO",
    imageUrl: didrikImg,
    githubUrl: "https://github.com/DidrikLindberg",
    linkedin: "https://www.linkedin.com/in/didrik-lindberg-3b2955148/",
  },
  {
    name: "Matt Gibson",
    role: "Co-Founder / COO",
    imageUrl: mattImg,
    githubUrl: "https://github.com/ohSweetWampum",
    linkedin: "https://www.linkedin.com/in/matthew-gibson-6b9b12237/",
  },
];

export default function About() {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#192734",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={styles}className="pointer-event-none isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Us
          </h2>
          <p className="mt-6 text-lg leading-8">Meet our leadership</p>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt={person.name}
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {person.role}
                  </p>
                  {person.githubUrl && (
                    <a
                      href={person.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={24} />
                    </a>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
