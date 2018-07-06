import Vue from 'vue'

Vue.directive('scroll', {
  bind: function (el) {
    el.classList.add('optiscroll');

    let optiScroll = new Optiscroll(el, {
      maxTrackSize: 50,
      minTrackSize: 20
    });
  }
});
