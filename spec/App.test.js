/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
// import App from '../client/src/components/App.jsx';
import styled from 'styled-components';

import { Tracker, TrackerProvider } from 'react-tracker';
import trackPageView from '../client/src/tracking/listeners/app.js';
import AppWithTracking from '../client/src/components/AppContainer.jsx';

const tracker = new Tracker([trackPageView]);

const RootComponentWithTracking = (
  <TrackerProvider tracker={tracker}>
    <AppWithTracking />
  </TrackerProvider>
);

afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(RootComponentWithTracking);
  expect(asFragment(RootComponentWithTracking)).toMatchSnapshot();
});
