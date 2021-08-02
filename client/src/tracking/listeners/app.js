window.dataLayer = window.dataLayer || [];
function trackPageView(event, trackingHistory) {
  window.dataLayer.push(event);
  return event;
}

trackPageView.eventType = 'PAGE_VIEW';

export default trackPageView;
