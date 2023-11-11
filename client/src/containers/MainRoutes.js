import Footer from '@components/Footer.js';
import Header from '@components/Header.js';
import LandingPage from '@pages/LandingPage.js';
import Login from '@pages/Login.js';
import TrackingPage from '@pages/TrackingPage.js';
import AccountRouter from '@pages/accounts/AccountRouter.js';
import PublicProfile from '@pages/profiles/PublicProfile.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddBusStop from '../pages/GQL/AddBusStop.js';
import AddBusPark from '../pages/GQL/AddBusPark.js';
import AddRoadGQL from '../pages/GQL/AddRoadGQL.js';
console.log(process.env.CLIENT_ID, 'ID')

function MainRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tracking-page" element={<TrackingPage />} />
        <Route path="/add-stop" element={<AddBusStop />} />
        <Route path="/add-park" element={<AddBusPark />} />
        <Route path="/add-road" element={<AddRoadGQL />} />
        <Route
          path="login"
          element={
            <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
              <Login />
            </GoogleOAuthProvider>
          }
        />
        <Route path="/public-profile/:id" element={<PublicProfile />} />
        <Route path="/accounts/*" element={<AccountRouter />} />
      </Routes>
      <Footer />
    </>
  );
}

export default MainRoutes;
