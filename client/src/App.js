import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import SkeletonScreen from './components/SkeletonUIs/SkeletonScreen.js';
import SocketState from './components/socketState.js';
import MainRoutes from './containers/MainRoutes.js';
import { store } from './redux/store.js';
import PrivateRoute from './utils/PrivateRoute.js';

const DashRoutes = React.lazy(() => import('./containers/DashboardRouter.js'));

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<SkeletonScreen />}>
            <Routes>
              <Route
                exact={false}
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <DashRoutes />
                  </PrivateRoute>
                }
              />

              <Route exact={false} path="/*" element={<MainRoutes />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <SocketState />
        <ToastContainer theme="colored" />
      </Provider>
    </div>
  );
}

export default App;
