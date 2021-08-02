import React from 'react';
import { withTracking } from 'react-tracker';
import getPageViewEvent from '../tracking/events/app.js';
import App from './App.jsx';

const mapTrackingToProps = trackEvent => {
  return {
    trackPageView: (pageId, userId) => {
      trackEvent(getPageViewEvent(pageId, userId))
    }
  }
}

const AppWithTracking = withTracking(mapTrackingToProps)(App);

export default AppWithTracking;