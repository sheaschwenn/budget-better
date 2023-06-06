import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import chrisImg from "../assets/images/chris.png";
import didrikImg from "../assets/images/didrik.jpg";
import mattImg from "../assets/images/matt.jpeg";
import sheaImg from "../assets/images/shea.jpeg";
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
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              About Us
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Leadership
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={person.imageUrl}
                      alt={person.name}
                    />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
