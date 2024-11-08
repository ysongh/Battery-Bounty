import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import BatteryBounty from './page/BatteryBounty';
import AuthorizedRecyclers from './page/AuthorizedRecyclers';
import Landing from './page/Landing';
import RecyclingVerification from './page/RecyclingVerification';

function App() {

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route
            path="/recycling-verification"
            element={<RecyclingVerification />} />
          <Route
            path="/admin"
            element={<AuthorizedRecyclers />} />
          <Route
            path="/battery-bounty"
            element={<BatteryBounty />} />
          <Route
            path="/"
            element={<Landing />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
};

export default App;