import React from 'react';
import { withTracking } from 'react-tracker';
import getPageViewEvent from '../../tracking/events/app.js';
import App from '../App.jsx';

const mapTrackingToProps = trackEvent => {
  return {
    trackPageView: (eventTarget, module) => {
      trackEvent(getPageViewEvent(eventTarget, module))
    }
  }
}

const AppWithTracking = withTracking(mapTrackingToProps)(App);

export default AppWithTracking;