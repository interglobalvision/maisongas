/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document */

// Import dependencies
import lazySizes from 'lazysizes';

// Import style
import '../styl/site.styl';

// Import components
import Scroll from './Scroll';
import Dust from './Dust';

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
    if ($('.honeypot').length && WP.honeypotImages !== undefined) {
      const $honeypot = $('.honeypot');
      let handleHoneypot = this.handleHoneypot;

      $honeypot.each(function(index) {
        $(this).on('click', function() {
          handleHoneypot(index);
        });
      });
    }

  }

  handleHoneypot(index) {
    let honeypotCount = 0; // how many images have been generated

    const honeypotInterval = setInterval(() => {
      const $honeypotImage = $('<img src="' + WP.honeypotImages[index] + '" class="honeypot-image" />'); // the image to generate

      $('body').append($honeypotImage); // append the image to body

      // animate display of image
      $honeypotImage.animate({
        'opacity': 1,
        'max-width': '50vw',
        'max-height': '50vh'
      }, 250, function() {
        $(this).animate({
          'opacity': 0,
          'max-width': '100vw',
          'max-height': '100vh'
        }, 1750, function() {
          $(this).remove(); // remove this image from DOM
        });
      });

      honeypotCount++; // iterate image count

      if (honeypotCount >= 10) {
        clearInterval(honeypotInterval); // 10 images have been displayed
      }
    }, 100) // generate 1 image every 10ms

  }
}

new Site();
new Dust();
new Scroll();
