import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Cashbot from './pages/Cashbot';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create an auth link to include the authentication token in the headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;