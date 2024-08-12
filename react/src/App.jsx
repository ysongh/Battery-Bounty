import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
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
  );
};

export default App;