window.dataLayer = window.dataLayer || [];
function trackPageView(event, trackingHistory) {

  // console.log("event in: " + event.data.eventTarget + "\n" + event.data.module + "\n" + event.data.time);s



  window.dataLayer.push(event);
  return event;
}

trackPageView.eventType = 'PAGE_VIEW';

export default trackPageView;
