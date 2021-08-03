function getPageViewEvent(eventTarget, module) {
  return {
    type: 'PAGE_VIEW',
    data: {
      eventTarget,
      module,
      time: new Date(),
    },
  };
};

export default getPageViewEvent;
