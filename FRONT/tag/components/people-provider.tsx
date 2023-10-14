"use client"
import React, { createContext, useState } from 'react';

// Create a new context
export const PeopleContext = createContext();
const AppProvider = ({ children }) => {
    const [peopleArray, setPeopleArray] = useState([]);
  return (
    <PeopleContext.Provider value={{ peopleArray, setPeopleArray }}>
      {children}
    </PeopleContext.Provider>
  );
};

export default AppProvider;