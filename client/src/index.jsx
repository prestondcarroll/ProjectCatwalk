import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker, TrackerProvider } from 'react-tracker';
import trackPageView  from './tracking/listeners/app.js';
import AppWithTracking from './components/AppContainer.jsx';

const tracker = new Tracker([trackPageView]);

// const RootComponentWithTracking = ( );

ReactDOM.render(
  <TrackerProvider tracker={tracker}>
    <AppWithTracking />
  </TrackerProvider>,
  document.getElementById('root'),
);
