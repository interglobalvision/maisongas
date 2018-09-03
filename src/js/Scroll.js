import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill just in case
smoothscroll.polyfill();

class Scroll {
  constructor() {
    this.scrollOffset = 0;

    this.isClearHash = true;
    this.clearHashTimeout = 0;

    this.$header = $('#header');

    $(document).ready(this.onReady.bind(this));
  }

  onReady() {
    // set scrollOffset
    this.setScrollOffset();

    // watch for scroll
    window.addEventListener('scroll', this.onScroll.bind(this), false);

    // watch for window resize to calculate scrollOffset
    window.addEventListener('resize', this.setScrollOffset.bind(this), false);

    // check for hash and scroll if so
    this.checkAndScroll();

    // watch for hash changes to check
    window.addEventListener('hashchange', this.checkAndScroll.bind(this), false);

    // listen to image load events and retrigger hashchange as to catch lazyload repaints
    $('img').on('load', this.checkAndScroll.bind(this));
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