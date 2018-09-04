/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document */
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill just in case
smoothscroll.polyfill();

class Scroll {
  constructor() {
    this.scrollOffset = 0;

    this.isClearHash = true;
    this.clearHashTimeout = 0;

    this.$header = $('#header');

    // BINDS
    this.onReady = this.onReady.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.setScrollOffset = this.setScrollOffset.bind(this);
    this.checkAndScroll = this.checkAndScroll.bind(this);

    // EVENTS
    $(document).ready(this.onReady);
  }

  onReady() {
    // set scrollOffset
    this.setScrollOffset();

    // watch for scroll
    window.addEventListener('scroll', this.onScroll, false);

    // watch for window resize to calculate scrollOffset
    window.addEventListener('resize', this.setScrollOffset, false);

    // check for hash and scroll if so
    this.checkAndScroll();

    // watch for hash changes to check
    window.addEventListener('hashchange', this.checkAndScroll, false);

    // listen to image load events and retrigger hashchange as to catch lazyload repaints
    $('img').on('load', this.checkAndScroll);
  }

  checkAndScroll() {
    const _this = this;
    let hash = window.location.hash;

    // check if is hashbang link
    if (hash.includes('#!/')) {
      // turn off hash clearing
      this.isClearHash = false;

      // find target in hash and scroll to
      hash = hash.substring(3);

      const $target = $('#' + hash);

      window.scroll({
        top: $target.offset().top + this.scrollOffset,
        behavior: 'smooth'
      });

      // set timeout to turn back on hash clearing
      window.clearTimeout(this.clearHashTimeout);
      this.clearHashTimeout = setTimeout(function() {
        _this.isClearHash = true;
      }, 1000);
    }
  }

  onScroll() {
    let location = window.location;

    // if there is no hash or hash clearing is turned off stop here
    if (location.hash === '' || !this.isClearHash) {
      return;
    }

    // if browser supports history clear the whole hash, otherwise clear back to just #
    if ('pushState' in history) {
      history.pushState('', document.title, location.pathname + location.search);
    } else {
      location.hash = '';
    }
  }

  setScrollOffset() {
    // set scrollOffset to negative twice the margins of the header element
    this.scrollOffset = ((this.$header.outerHeight(true) - this.$header.innerHeight()) * 2) * -1;
  }
}

export default Scroll;
