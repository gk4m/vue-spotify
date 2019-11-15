export const loadMore = {
  methods: {
    loadMore: async function(event, next, fetchAction, fetchOnPosition = 70) {
      if (next && event.detail.scrollbarV.percent > fetchOnPosition) {
        fetchAction();
      }
    }
  }
};
