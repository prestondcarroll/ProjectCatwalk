import $ from 'jquery';
const SERVER_ENDPOINT = require('../../../client.config.js');

window.dataLayer = window.dataLayer || [];
function trackPageView(event, trackingHistory) {
  const body = {
    element: event.data.eventTarget,
    widget: event.data.module,
    time: event.data.time
  }
  // console.log("event in: " + event.data.eventTarget + " " + event.data.module + " " + event.data.time);
  $.ajax({
    method: 'POST',
    url: `${SERVER_ENDPOINT}/interactions`,
    data: JSON.stringify(body),
    contentType: 'application/json',
    success: () => {
      console.log('Status: 201 CREATED');
    },
    error: (err) => {
      console.log(err)
    }
  })
  window.dataLayer.push(event);
  return event;
}

trackPageView.eventType = 'PAGE_VIEW';

export default trackPageView;
