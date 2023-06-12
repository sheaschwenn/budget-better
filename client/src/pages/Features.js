import React, { useContext } from "react";
import AppPic from "./App.png";
import {
  ChatBubbleBottomCenterIcon,
  ChartPieIcon,
  AcademicCapIcon,
} from "@heroicons/react/20/solid";
import { ThemeContext } from "../utils/ThemeContext";

const features = [
  {
    name: "AI Chatbot",
    description:
      "AI chatbot provides personalized financial guidance and support 24/7, helping users make informed decisions and achieve their financial goals with ease.",
    icon: ChatBubbleBottomCenterIcon,
  },
  {
    name: "Visualizations.",
    description:
      "Our charts and graphs feature offers visual representations of your financial data, allowing you to gain valuable insights and track your progress effortlessly. Easily analyze trends, identify patterns, and make informed financial decisions to reach your goals.",
    icon: ChartPieIcon,
  },
  {
    name: "Goal Tracking",
    description:
      "Our Goal Tracking feature allows users to set, track, and reach their savings goals more efficiently. It provides a holistic view of your financial health by monitoring your expenses and income, enabling smarter decisions to help you achieve your financial objectives.",
    icon: AcademicCapIcon,
  },
];

export default function Example() {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#121212",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div
      style={styles}
      className="  pointer-event-none overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                YOUR Finances
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Taking Back Your Financial Freedom
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our app offers a range of powerful features to help you take
                control of your finances. With our intuitive interface, you can
                easily track your income, expenses, and investments, gaining a
                clear understanding of your financial health. Set financial
                goals and monitor your progress with our goal tracking feature.
                Our interactive charts and visualizations provide valuable
                insights into your spending patterns and help you make informed
                financial decisions. Our AI chatbot is available 24/7 to provide
                personalized assistance, answering your financial queries and
                guiding you towards better financial choices. With Budget
                Better, financial management becomes effortless, empowering you
                to achieve your financial goals with confidence. Our
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="pl-9">
                    <dt className="flex items-center font-semibold text-gray-900">
                      <feature.icon
                        className="h-5 w-5 text-indigo-600 mr-2"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <dd>{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src={AppPic}
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
