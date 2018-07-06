import Vue from 'vue'

Vue.directive('scroll', {
  bind: function (el, binding, vnode) {
    el.classList.add('optiscroll');

    let optiScroll = new Optiscroll(el, {});

    el.addEventListener('scrollreachbottom', function (ev) {
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit('scrollReachBottom', ev);
      } else {
        vnode.elm.dispatchEvent(new CustomEvent('scrollReachBottom', ev));
      }
    });
  }
});
