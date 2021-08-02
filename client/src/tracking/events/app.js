function getPageViewEvent(pageId, userId) {
  return {
    type: 'PAGE_VIEW',
    data: {
      pageId,
      userId,
    },
  };
};

export default getPageViewEvent;
