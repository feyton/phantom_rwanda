import Footer from '@components/Footer.js';
import Header from '@components/Header.js';
import AccountRouter from '@pages/accounts/AccountRouter.js';
import Login from '@pages/Login.js';
import PublicProfile from '@pages/profiles/PublicProfile.js';
import TrackingPage from '@pages/TrackingPage.js';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '@pages/LandingPage.js';

function MainRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tracking-page" element={<TrackingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="/public-profile/:id" element={<PublicProfile />} />
        <Route path="/accounts/*" element={<AccountRouter />} />
      </Routes>
      <Footer />
    </>
  );
}

export default MainRoutes;
