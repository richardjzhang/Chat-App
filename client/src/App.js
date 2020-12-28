// @flow
import React from 'react';
import { isMobile } from 'react-device-detect';

const Desktop = React.lazy(() => import('src/views/Desktop'));
const TouchDevice = React.lazy(() => import('src/views/TouchDevice'));
const ChooseName = React.lazy(() => import('src/components/ChooseName'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ChooseName />
      {isMobile ? <TouchDevice /> : <Desktop />}
    </React.Suspense>
  );
}

export default App;
