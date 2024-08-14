import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Navbar from './components/Navbar';

function App() {

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route
            path="/test"
            element={
              <h1>Test</h1>} />
          <Route
            path="/"
            element={
              <>
                <h1>Battery Bounty</h1>
              </>} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
};

export default App;