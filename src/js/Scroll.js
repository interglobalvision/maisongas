import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill just in case
smoothscroll.polyfill();

class Scroll {
  constructor() {
    // value in pixels elements scrolled to will be from top of the window
    this.scrollOffset = 60;

    $(document).ready(this.onReady.bind(this));

  }

  onReady() {
    // fire hash change on load
    this.onHashChange();
    // and watch for hash changes
    window.addEventListener('hashchange', this.onHashChange.bind(this), false);
  }

  onHashChange() {
    let hash = window.location.hash;

    // check if is hashbang link
    if (hash.includes('#!/')) {
      hash = hash.substring(3);

      const $target = $('#' + hash);

      window.scroll({
        top: $target.offset().top + this.scrollOffset,
        behavior: 'smooth'
      });

    }
  }
}

export default Scroll;
