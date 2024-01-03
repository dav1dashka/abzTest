import React from "react";
import { useState, createContext } from 'react';
import Header from '../Header/Header.jsx';
import Hero from '../Hero/Hero.jsx';
import GetBlock from '../Get/GetBlock.jsx';
import PostBlock from '../Post/PostBlock.jsx';
import './App.scss';

export const FormContext = createContext();

const App = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <>
      <FormContext.Provider value={{ formSubmitted, handleFormSubmit }}>
        <Header />
        <main className="main">
          <Hero />
          <GetBlock />
          <PostBlock />
        </main>
      </FormContext.Provider >
    </>
  )
};

export default App;
