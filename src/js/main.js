/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document */

// Import dependencies
import lazySizes from 'lazysizes';

// Import style
import '../styl/site.styl';

// Import components
import Scroll from './Scroll';

class Site {
  constructor() {
    this.mobileThreshold = 601;

    $(window).resize(this.onResize.bind(this));

    $(document).ready(this.onReady.bind(this));

  }

  onResize() {

  }

  onReady() {
    lazySizes.init();
    this.bindHoneypot();
  }

  fixWidows() {
    // utility class mainly for use on headines to avoid widows [single words on a new line]
    $('.js-fix-widows').each(function(){
      var string = $(this).html();
      string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
      $(this).html(string);
    });
  }

  bindHoneypot() {
    const $honeypot = $('#honeypot');

    $honeypot.on('click', this.handleHoneypot.bind(this));
  }

  handleHoneypot() {
    let honeypotCount = 0;
    const honeypotInterval = setInterval(() => {
      // oh well hello
      const $honeypotImage = $('<img src="' + WP.themeUrl + '/dist/img/honeypot.jpg" class="honeypot" />');

      // oooh that's sweet
      $('body').append($honeypotImage);

      // ooh yeeaah
      $honeypotImage.animate({
        'opacity': 1,
        'max-width': '50vw',
        'max-height': '50vh'
      }, 250, function() {
        $(this).animate({
          'opacity': 0,
          'max-width': '100vw',
          'max-height': '100vh'
        }, 1750);
      });

      // getting sweeter...
      honeypotCount++;

      if (honeypotCount >= 10) {
        // ooooooh too sweet
        clearInterval(honeypotInterval);
      }
    }, 100)

  }
}

new Site();
new Scroll();
