/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { Tracker, TrackerProvider } from 'react-tracker';
import { jest } from '@jest/globals';
import trackPageView from '../client/src/tracking/listeners/app.js';
import AppWithTracking from '../client/src/components/AppContainer.jsx';
import Overview from '../client/src/components/Overview.jsx'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import exProductInfo from './exampleData/exProductInfo.js';
import exStylesInfo from './exampleData/exStylesInfo.js';
import exCurrentStyle from './exampleData/exCurrentStyle';

Enzyme.configure({adapter: new Adapter() });





const tracker = new Tracker([trackPageView]);
const RootComponentWithTracking = (
  <TrackerProvider tracker={tracker}>
    <AppWithTracking />
  </TrackerProvider>
);

// remove warnings from console logging
const originalWarn = console.error.bind(console.error);
beforeAll(() => {
  console.error = (msg) => !msg.toString().includes('Each child');
});
afterAll(() => {
  console.error = originalWarn;
});


afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(RootComponentWithTracking);
  expect(asFragment(RootComponentWithTracking)).toMatchSnapshot();
});

describe('Overview', () => {
  it('should have down arrow', () => {
    const initReviewCount = 26;
    const initAvg = 27;
    const initProductInfo = exProductInfo;
    const initStylesInfo = exStylesInfo;
    const initCurrentStyle = exCurrentStyle;
    const initDisplayType = 'visible';
    const initCurrentImageIndex = 0;

    React.useState = jest.fn()
      .mockReturnValueOnce([initReviewCount, {}])
      .mockReturnValueOnce([initAvg, {}])
      .mockReturnValueOnce([initProductInfo, {}])
      .mockReturnValueOnce([initStylesInfo, {}])
      .mockReturnValueOnce([initCurrentStyle, {}])
      .mockReturnValueOnce([initDisplayType, {}])
      .mockReturnValueOnce([initCurrentImageIndex, {}])


    const wrapper = mount(<Overview />);
    const right = wrapper.find('#fruit');

    // act(() => {
    //   ReactTestUtils.Simulate.click(right);
    // });
    right.simulate('click');

    const left = wrapper.find('#fruit');
    console.log("LEFT IS: " + left);

    expect.anything(right);
    expect.anything(left);
    // expect(text.text()).toBe('Text goes here');

  })
})



