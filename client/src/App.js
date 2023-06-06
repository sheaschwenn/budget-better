import "./App.css";
import React from "react";
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
import HeroPage from "./pages/HeroPage";
import OurMission from "./pages/OurMission";
import PageNotFound from "./pages/PageNotFound";

import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

// Create an Apollo Client instance with the auth link and the in-memory cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <h1>Budget Better</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cashbot" element={<Cashbot />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/features" element={<Features />} />
          <Route path="/heropage" element={<HeroPage />} />
          <Route path="/ourmission" element={<OurMission />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
