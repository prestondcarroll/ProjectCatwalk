import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker, TrackerProvider } from 'react-tracker';
import trackPageView from './tracking/listeners/app.js';
import AppWithTracking from './components/AppContainer.jsx';

const tracker = new Tracker([trackPageView]);

const RootComponentWithTracking = (
  <TrackerProvider tracker={tracker}>
    <AppWithTracking />
  </TrackerProvider>
);

ReactDOM.render(RootComponentWithTracking,
  document.getElementById('root'));
