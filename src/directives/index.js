import Vue from 'vue'

Vue.directive('scroll', {
  bind: function (el, d) {
    console.log(el)
    console.log(d)
    el.classList.add('optiscroll');

    let optiScroll = new Optiscroll(el, {
      maxTrackSize: 50,
      minTrackSize: 20
    });
  }
});
