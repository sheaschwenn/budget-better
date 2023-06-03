import './App.css';
import React from 'react';
import Chatbot from './components/chatbot';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

// Create an Apollo Client instance with the auth link and the in-memory cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Chatbot />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;