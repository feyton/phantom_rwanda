import Sidebar from '@components/SideBar.js';
import MainPage from '@pages/dashboard/Mainpage.js';
import RegisterDriver from '@pages/forms/RegisterDrivers.js';
import RegisterOperator from '@pages/forms/RegisterOperator.js';
import RouteEdit from '@pages/routes/RouteEdit.js';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UpdateDriver from '../forms/UpdateDriver.js';
import UpdateOperator from '../forms/UpdateOperator.js';
import ComingSoon from '../pages/ComingSoon.js';
import Management from '../pages/dashboard/Management.js';
import Roles from '../pages/dashboard/RolesPage.js';
import OperatorProfile from '../pages/profiles/OperatorProfile.js';
import RegisterBus from '../pages/RegisterBus.js';
import RegisterRoute from '../pages/routes/RegisterRoute.js';
import UpdateBus from '../pages/UpdateBus.js';
import ModalRoutes from './ModalRoutes.js';

function DashRoutes() {
  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0 z-0 min-h-screen font-sans antialiased bg-grey-lightest w-full overflow-hidden">
      <Sidebar />
      <div className="float-right min-h-screen h-full  m-0 relative  w-full overflow-y-scroll overflow-x-hidden">
        <div className="min-h-full px-2 py-2">
          <Routes>
            <Route path="modal/*" exact={false} element={<ModalRoutes />} />
            <Route path="main" element={<MainPage title="dashboard" />} />
            <Route path="/" element={<MainPage title="dashboard" />} />
            <Route path="roles" element={<Roles />} />
            <Route path="settings" element={<ComingSoon title="settings" />} />
            <Route path="profile" element={<OperatorProfile />} />
            <Route path="management">
              <Route
                path="driver/register"
                base="management"
                element={<RegisterDriver />}
              />
              <Route path="driver/update" element={<UpdateDriver />} />
              <Route path="bus/register" element={<RegisterBus />} />
              <Route path="bus/update/:id" element={<UpdateBus />} />
              <Route
                path="operator/register"
                base="management"
                element={<RegisterOperator />}
              />
              <Route path="route/edit/:id" element={<RouteEdit />} />
              <Route path="route/register" element={<RegisterRoute />} />
              <Route path="operator/update" element={<UpdateOperator />} />
              <Route path="" element={<Management />} />
            </Route>

            <Route
              path="*"
              element={
                <main className="font-bold flex h-full w-full items-center justify-center">
                  <h1 className="text-3xl pb-4 font-bold mb-4">
                    Nothing to see here.
                  </h1>
                  <Link
                    to="/dashboard/main"
                    className="text-white rounded-md bg-primary py-1 px-4 m-3"
                  >
                    Main Page
                  </Link>
                </main>
              }
            />
          </Routes>
        </div>
        <div className="mt-auto pt-4 ">
          <ul className="w-full flex flex-row justify-around items-center py-1 px-4  font-raleway bg-green-200 bg-opacity-40">
            <li>&copy; Codebandits {new Date().getFullYear()}</li>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="#support">Support</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashRoutes;
