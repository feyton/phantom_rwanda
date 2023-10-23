import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import LandPageSkeleton from './components/SkeletonUIs/LandPageSkelUI.js';
import SkeletonScreen from './components/SkeletonUIs/SkeletonScreen.js';
import './i18n.js';

const App = React.lazy(() => import('./App.js'));

const FinalComponent = () => {
  return (
    <Suspense
      fallback={
        <>
          <SkeletonScreen />
          <LandPageSkeleton />
        </>
      }
    >
      <App />
    </Suspense>
  );
};

ReactDOM.render(<FinalComponent />, document.getElementById('root'));
