
import React, { useContext } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Cashbot from "./pages/Cashbot";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";
import Testimonials from "./pages/Testamonials";
import Features from "./pages/Features";
// import HeroPage from "./pages/HeroPage";

import OurMission from "./pages/OurMission";
import PageNotFound from "./pages/PageNotFound";

import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


import ProtectedRoute from './components/ProtectedRoute';
import { ThemeContext } from './utils/ThemeContext';




// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Create an auth link to include the authentication token in the headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'User': return `User:${object._id}`;
      case 'Expense': return `Expense:${object._id}`;
      case 'Income': return `Income:${object._id}`;
      case 'Setting': return `Setting:${object._id}`;
      case 'Goal': return `Goal:${object._id}`;
      default: return object._id || object.id || null;
    }
  },
});

// Create an Apollo Client instance with the auth link and the in-memory cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache, 
});

function App() {
  const { isDarkMode } = useContext(ThemeContext); // Retrieve the isDarkMode value from the ThemeContext

  const styles = {
    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#121212",
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div style={styles}>

        <h1>Budget Better</h1>
        <Navbar />
        <Routes>

    <Route path="/" element={Auth.loggedIn() ? <Home /> : <Navigate to="/login" />} />
    <Route path="/dashboard" element={Auth.loggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
    <Route path="/account" element={Auth.loggedIn() ? <Account /> : <Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/settings" element={Auth.loggedIn() ? <Settings /> : <Navigate to="/login" />} />
    <Route path="/cashbot" element={Auth.loggedIn() ? <Cashbot /> : <Navigate to="/login" />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/demo" element={<Demo />} />
    <Route path="/testimonials" element={<Testimonials />} />
    <Route path="/features" element={<Features />} />
    <Route path="/ourmission" element={Auth.loggedIn() ? <OurMission /> : <Navigate to="/login" />} />
    <Route path="*" element={<PageNotFound />} />
</Routes>

        <Footer />

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
