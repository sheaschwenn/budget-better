import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Chatbot from "./chatbot";

function App() {
  return (
    //applying the ApolloProvider component to the App component, we can then use the useQuery() Hook in any component to make a GraphQL query.
    <ApolloProvider client={client}>
      {/* //router component to handle the navigation between pages */}
      <Router>
        <div>
          {/* <PageContainer> */}
          <NavigateTabs />
          <Routes>
            <Route exact path="/" element={<Chatbot />} />
          </Routes>
          {/* </PageContainer> */}
        </div>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
