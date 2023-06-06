import { CloudArrowUpIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Features() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 flex-grow">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
              className="overflow-visible fill-gray-50"
            />
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  YOUR Finances
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Taking Back Your Financial Freedom
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Budget Better: Empowering financial control through intuitive
                  features, AI assistance, and comprehensive insights.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src="screenshot of our app with charts and graph present goes here"
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  Our app offers a range of powerful features to help you take
                  control of your finances. With our intuitive interface, you
                  can easily track your income, expenses, and investments,
                  gaining a clear understanding of your financial health. Set
                  financial goals and monitor your progress with our goal
                  tracking feature. Our interactive charts and visualizations
                  provide valuable insights into your spending patterns and help
                  you make informed financial decisions. Our AI chatbot is
                  available 24/7 to provide personalized assistance, answering
                  your financial queries and guiding you towards better
                  financial choices. With Budget Better, financial management
                  becomes effortless, empowering you to achieve your financial
                  goals with confidence.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CloudArrowUpIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        AI Chatbot
                      </strong>{" "}
                      Our AI chatbot provides personalized financial guidance
                      and support 24/7, helping users make informed decisions
                      and achieve their financial goals with ease.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Visualizations
                      </strong>{" "}
                      Our charts and graphs feature offers visual
                      representations of your financial data, allowing you to
                      gain valuable insights and track your progress
                      effortlessly. Easily analyze trends, identify patterns,
                      and make informed financial decisions to reach your goals.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">Add more info here</p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                  Add another thing this app solves
                </h2>
                <p className="mt-6">Add info here</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
