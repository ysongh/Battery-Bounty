import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import BatteryBounty from './page/BatteryBounty';
import AuthorizedRecyclers from './page/AuthorizedRecyclers';

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
            path="/admin"
            element={<AuthorizedRecyclers />} />
          <Route
            path="/"
            element={<BatteryBounty />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
};

export default App;