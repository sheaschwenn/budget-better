import React from "react";
import { useContext } from 'react';
import Chatbot from "../components/chatbot";
import { ThemeContext } from '../utils/ThemeContext';


const Cashbot = () => {

  const { isDarkMode } = useContext(ThemeContext);

const styles = {
  backgroundColor: isDarkMode ? '#000000' : '#ffffff',
  color: isDarkMode ? '#ffffff' : '#000000',
};

  return (
    <div style={styles}>
      <h2>Chatbot Page</h2>
      <Chatbot />
    </div>
  );
};

export default Cashbot;