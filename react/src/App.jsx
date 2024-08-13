import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, Text } from '@chakra-ui/react';

function App() {

  return (
    <ChakraProvider>
      <HashRouter>
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
                <w3m-button />
              </>} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
};

export default App;