window.dataLayer = window.dataLayer || [];
function trackPageView(event, trackingHistory) {

  console.log("event in: " + event.data.eventTarget + " " + event.data.module + " " + event.data.time);



  window.dataLayer.push(event);
  return event;
}

trackPageView.eventType = 'PAGE_VIEW';

export default trackPageView;
