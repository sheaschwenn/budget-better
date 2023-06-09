import React, { Fragment, useState, useContext } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { ThemeContext } from "../utils/ThemeContext";
import { useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import logo from "./BudgetBetterLogo.png";
import {
  Bars3Icon,
  XMarkIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Settings",
    href: "/settings",
    icon: CogIcon,
  },

  {
    name: "FAQ",
    href: "/faq",
    icon: QuestionMarkCircleIcon,
  },
  {
    name: "About",
    href: "/about",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Testamonials",
    href: "/testamonials",
    icon: HandThumbUpIcon,
  },
  {
    name: "Our Mission",
    href: "/ourmission",

    icon: HandThumbUpIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "/demo", icon: PlayCircleIcon },
  {
    name: "Contact Us",
    href: "/contact",
    icon: ChatBubbleBottomCenterTextIcon,
  },
];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function Navbar() {
  // const isLoggedIn = AuthService.loggedIn();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#192734",
  };
  const exploreDropdownStyles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#192734",
    borderColor: isDarkMode ? "#4B5563" : "#D1D5DB",
  };

  if (isDarkMode) {
    exploreDropdownStyles.color = "#ffffff";
  } else {
    exploreDropdownStyles.color = "#192734";
  }
  const sideMenuStyles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#192734",
  };

  if (location.pathname === "/") {
    return null;
  }
  return (
    <header style={styles} className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <button onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Budget Better</span>
            <img className="h-16 w-auto" src={logo} alt="Budget Better Logo" />
          </Link>
        </div>
        <div className="flex relative  lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button
              style={exploreDropdownStyles}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Explore
              <ChevronDownIcon
                className="h-5 w-5 flex-none"
                aria-hidden="true"
                style={exploreDropdownStyles}
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link to={item.href} className="block font-semibold">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            to="/dashboard"
            className="text-sm font-semibold leading-6"
            style={sideMenuStyles}
          >
            Dashboard
          </Link>
          <Link
            to="/account"
            className="text-sm font-semibold leading-6 "
            style={sideMenuStyles}
          >
            Account
          </Link>
          <Link
            to="/cashbot"
            className="text-sm font-semibold leading-6 "
            style={sideMenuStyles}
          >
            Cashbot
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/login"
            className="text-sm font-semibold leading-6 "
            style={sideMenuStyles}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Budget Better</span>
              <img
                className="h-16 w-auto"
                src={logo}
                alt="Budget Better Logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6">
            <nav className="grid gap-y-8">
              {callsToAction.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                >
                  <item.icon
                    className="flex-shrink-0 h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-base font-medium text-gray-900">
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
              Dashboard
            </h2>
            <ul className="mt-2">
              <li className="flow-root">
                <Link
                  to="/dashboard"
                  className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="flow-root">
                <Link
                  to="/account"
                  className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  <span>Account</span>
                </Link>
              </li>
              <li className="flow-root">
                <Link
                  to="/cashbot"
                  className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  <span>Cashbot</span>
                </Link>
              </li>
            </ul>
            <div className="py-6">
              <Link
                to="/login"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Log in
              </Link>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
