import { ThemeContext } from "../utils/ThemeContext";
import React, { useContext } from "react";
export default function FAQ() {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#192734",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };
  const faqs = [
    {
      question:
        "Should I consider the responses from CashBot as financial advice?",
      answer:
        "No, responses from CashBot should be taken as directions to help guide your decisions, not as absolute financial advice.",
    },
    {
      question: "Where can I enter my financial info?",
      answer:
        "Once you are signed up or logged in, you can enter your financial information in the account page and view the data on your dashboard.",
    },
    {
      question: "Do you sell my personal information?",
      answer:
        "No, we do not sell or share your personal information with third parties.",
    },
    {
      question: "Can I track my investments with Budget Better?",
      answer:
        "Currently, we do not have a feature to track investments. However, we are planning to introduce this feature soon.",
    },
    {
      question: "Is Budget Better the only tool I need for financial planning?",
      answer:
        'While "Budget Better" provides helpful tools for financial planning, it should not be the sole resource for making major financial decisions. We recommend seeking advice from professionals or trusted individuals in your network in conjustion with using Budget Better.',
    },
    {
      question: "How can I get in contact if I have an issue?",
      answer:
        "If you have an issue or query, please navigate to the 'Contact Us' section of our app and send us a message. We'll get back to you as soon as possible.",
    },
    {
      question: "How do I use Budget Better?",
      answer:
        "Budget Better is easy to use. Once you've created an account, you can enter your financial data, set your budget, and track your expenses. Check out the 'Demo' section for more detailed walkthrough.",
    },
    {
      question: "Can I trust Budget Better?",
      answer:
        "Yes, Budget Better is committed to ensuring the privacy and security of your personal and financial data.",
    },
    {
      question: "How much does Budget Better cost?",
      answer:
        "The reason behind the creation of Budget Better is so that everyone can have access to financial planning tools. Therefore, Budget Better is completely free to use.",
    },
  ];
  return (
    <div
      style={styles}
      className="pointer-event-none isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            FAQs
          </h2>
          <p className="mt-6 text-lg leading-8">
            Common Questions about Our Financial Tracker App
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {faqs.map((faq, index) => (
            <li key={index}>
              <div className="flex items-start gap-x-6">
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight">
                    {faq.question}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
