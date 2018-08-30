/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document */

// Import dependencies


// Import style


// Import components


var _lazysizes = __webpack_require__(1);

var _lazysizes2 = _interopRequireDefault(_lazysizes);

__webpack_require__(3);

var _Scroll = __webpack_require__(4);

var _Scroll2 = _interopRequireDefault(_Scroll);

var _Dust = __webpack_require__(11);

var _Dust2 = _interopRequireDefault(_Dust);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Site = function () {
  function Site() {
    _classCallCheck(this, Site);

    this.mobileThreshold = 601;

    $(window).resize(this.onResize.bind(this));

    $(document).ready(this.onReady.bind(this));
  }

  _createClass(Site, [{
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'onReady',
    value: function onReady() {
      _lazysizes2.default.init();
      this.bindHoneypot();
    }
  }, {
    key: 'fixWidows',
    value: function fixWidows() {
      // utility class mainly for use on headines to avoid widows [single words on a new line]
      $('.js-fix-widows').each(function () {
        var string = $(this).html();
        string = string.replace(/ ([^ ]*)$/, '&nbsp;$1');
        $(this).html(string);
      });
    }
  }, {
    key: 'bindHoneypot',
    value: function bindHoneypot() {
      if ($('.honeypot').length && WP.honeypotImages !== undefined) {
        var $honeypot = $('.honeypot');
        var handleHoneypot = this.handleHoneypot;

        $honeypot.each(function (index) {
          $(this).on('click', function () {
            handleHoneypot(index);
          });
        });
      }
    }
  }, {
    key: 'handleHoneypot',
    value: function handleHoneypot(index) {
      var honeypotCount = 0; // how many images have been generated

      var honeypotInterval = setInterval(function () {
        var $honeypotImage = $('<img src="' + WP.honeypotImages[index] + '" class="honeypot-image" />'); // the image to generate

        $('body').append($honeypotImage); // append the image to body

        // animate display of image
        $honeypotImage.animate({
          'opacity': 1,
          'max-width': '50vw',
          'max-height': '50vh'
        }, 250, function () {
          $(this).animate({
            'opacity': 0,
            'max-width': '100vw',
            'max-height': '100vh'
          }, 1750, function () {
            $(this).remove(); // remove this image from DOM
          });
        });

        honeypotCount++; // iterate image count

        if (honeypotCount >= 10) {
          clearInterval(honeypotInterval); // 10 images have been displayed
        }
      }, 100); // generate 1 image every 10ms
    }
  }]);

  return Site;
}();

new Site();
new _Dust2.default();
new _Scroll2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (window, factory) {
	var lazySizes = factory(window, window.document);
	window.lazySizes = lazySizes;
	if (( false ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
		module.exports = lazySizes;
	}
})(window, function l(window, document) {
	'use strict';
	/*jshint eqnull:true */

	if (!document.getElementsByClassName) {
		return;
	}

	var lazysizes, lazySizesConfig;

	var docElem = document.documentElement;

	var Date = window.Date;

	var supportPicture = window.HTMLPictureElement;

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	var addEventListener = window[_addEventListener];

	var setTimeout = window.setTimeout;

	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	var requestIdleCallback = window.requestIdleCallback;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	var hasClass = function hasClass(ele, cls) {
		if (!regClassCache[cls]) {
			regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	var addClass = function addClass(ele, cls) {
		if (!hasClass(ele, cls)) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	var removeClass = function removeClass(ele, cls) {
		var reg;
		if (reg = hasClass(ele, cls)) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
		}
	};

	var addRemoveLoadEvents = function addRemoveLoadEvents(dom, fn, add) {
		var action = add ? _addEventListener : 'removeEventListener';
		if (add) {
			addRemoveLoadEvents(dom, fn);
		}
		loadEvents.forEach(function (evt) {
			dom[action](evt, fn);
		});
	};

	var triggerEvent = function triggerEvent(elem, name, detail, noBubbles, noCancelable) {
		var event = document.createEvent('CustomEvent');

		if (!detail) {
			detail = {};
		}

		detail.instance = lazysizes;

		event.initCustomEvent(name, !noBubbles, !noCancelable, detail);

		elem.dispatchEvent(event);
		return event;
	};

	var updatePolyfill = function updatePolyfill(el, full) {
		var polyfill;
		if (!supportPicture && (polyfill = window.picturefill || lazySizesConfig.pf)) {
			polyfill({ reevaluate: true, elements: [el] });
		} else if (full && full.src) {
			el.src = full.src;
		}
	};

	var getCSS = function getCSS(elem, style) {
		return (getComputedStyle(elem, null) || {})[style];
	};

	var getWidth = function getWidth(elem, parent, width) {
		width = width || elem.offsetWidth;

		while (width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth) {
			width = parent.offsetWidth;
			parent = parent.parentNode;
		}

		return width;
	};

	var rAF = function () {
		var running, waiting;
		var firstFns = [];
		var secondFns = [];
		var fns = firstFns;

		var run = function run() {
			var runFns = fns;

			fns = firstFns.length ? secondFns : firstFns;

			running = true;
			waiting = false;

			while (runFns.length) {
				runFns.shift()();
			}

			running = false;
		};

		var rafBatch = function rafBatch(fn, queue) {
			if (running && !queue) {
				fn.apply(this, arguments);
			} else {
				fns.push(fn);

				if (!waiting) {
					waiting = true;
					(document.hidden ? setTimeout : requestAnimationFrame)(run);
				}
			}
		};

		rafBatch._lsFlush = run;

		return rafBatch;
	}();

	var rAFIt = function rAFIt(fn, simple) {
		return simple ? function () {
			rAF(fn);
		} : function () {
			var that = this;
			var args = arguments;
			rAF(function () {
				fn.apply(that, args);
			});
		};
	};

	var throttle = function throttle(fn) {
		var running;
		var lastTime = 0;
		var gDelay = 125;
		var rICTimeout = lazySizesConfig.ricTimeout;
		var run = function run() {
			running = false;
			lastTime = Date.now();
			fn();
		};
		var idleCallback = requestIdleCallback && lazySizesConfig.ricTimeout ? function () {
			requestIdleCallback(run, { timeout: rICTimeout });

			if (rICTimeout !== lazySizesConfig.ricTimeout) {
				rICTimeout = lazySizesConfig.ricTimeout;
			}
		} : rAFIt(function () {
			setTimeout(run);
		}, true);

		return function (isPriority) {
			var delay;

			if (isPriority = isPriority === true) {
				rICTimeout = 33;
			}

			if (running) {
				return;
			}

			running = true;

			delay = gDelay - (Date.now() - lastTime);

			if (delay < 0) {
				delay = 0;
			}

			if (isPriority || delay < 9 && requestIdleCallback) {
				idleCallback();
			} else {
				setTimeout(idleCallback, delay);
			}
		};
	};

	//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
	var debounce = function debounce(func) {
		var timeout, timestamp;
		var wait = 99;
		var run = function run() {
			timeout = null;
			func();
		};
		var later = function later() {
			var last = Date.now() - timestamp;

			if (last < wait) {
				setTimeout(later, wait - last);
			} else {
				(requestIdleCallback || run)(run);
			}
		};

		return function () {
			timestamp = Date.now();

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
		};
	};

	(function () {
		var prop;

		var lazySizesDefaults = {
			lazyClass: 'lazyload',
			loadedClass: 'lazyloaded',
			loadingClass: 'lazyloading',
			preloadClass: 'lazypreload',
			errorClass: 'lazyerror',
			//strictClass: 'lazystrict',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-src',
			srcsetAttr: 'data-srcset',
			sizesAttr: 'data-sizes',
			//preloadAfterLoad: false,
			minSize: 40,
			customMedia: {},
			init: true,
			expFactor: 1.5,
			hFac: 0.8,
			loadMode: 2,
			loadHidden: true,
			ricTimeout: 300
		};

		lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

		for (prop in lazySizesDefaults) {
			if (!(prop in lazySizesConfig)) {
				lazySizesConfig[prop] = lazySizesDefaults[prop];
			}
		}

		window.lazySizesConfig = lazySizesConfig;

		setTimeout(function () {
			if (lazySizesConfig.init) {
				init();
			}
		});
	})();

	var loader = function () {
		var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom;

		var defaultExpand, preloadExpand, hFac;

		var regImg = /^img$/i;
		var regIframe = /^iframe$/i;

		var supportScroll = 'onscroll' in window && !/glebot/.test(navigator.userAgent);

		var shrinkExpand = 0;
		var currentExpand = 0;

		var isLoading = 0;
		var lowRuns = -1;

		var resetPreloading = function resetPreloading(e) {
			isLoading--;
			if (e && e.target) {
				addRemoveLoadEvents(e.target, resetPreloading);
			}

			if (!e || isLoading < 0 || !e.target) {
				isLoading = 0;
			}
		};

		var isNestedVisible = function isNestedVisible(elem, elemExpand) {
			var outerRect;
			var parent = elem;
			var visible = getCSS(document.body, 'visibility') == 'hidden' || getCSS(elem, 'visibility') != 'hidden';

			eLtop -= elemExpand;
			eLbottom += elemExpand;
			eLleft -= elemExpand;
			eLright += elemExpand;

			while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
				visible = (getCSS(parent, 'opacity') || 1) > 0;

				if (visible && getCSS(parent, 'overflow') != 'visible') {
					outerRect = parent.getBoundingClientRect();
					visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
				}
			}

			return visible;
		};

		var checkElements = function checkElements() {
			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal;

			var lazyloadElems = lazysizes.elements;

			if ((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {

				i = 0;

				lowRuns++;

				if (preloadExpand == null) {
					if (!('expand' in lazySizesConfig)) {
						lazySizesConfig.expand = docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370;
					}

					defaultExpand = lazySizesConfig.expand;
					preloadExpand = defaultExpand * lazySizesConfig.expFactor;
				}

				if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
					currentExpand = preloadExpand;
					lowRuns = 0;
				} else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
					currentExpand = defaultExpand;
				} else {
					currentExpand = shrinkExpand;
				}

				for (; i < eLlen; i++) {

					if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
						continue;
					}

					if (!supportScroll) {
						unveilElement(lazyloadElems[i]);continue;
					}

					if (!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)) {
						elemExpand = currentExpand;
					}

					if (beforeExpandVal !== elemExpand) {
						eLvW = innerWidth + elemExpand * hFac;
						elvH = innerHeight + elemExpand;
						elemNegativeExpand = elemExpand * -1;
						beforeExpandVal = elemExpand;
					}

					rect = lazyloadElems[i].getBoundingClientRect();

					if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesConfig.loadHidden || getCSS(lazyloadElems[i], 'visibility') != 'hidden') && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if (isLoading > 9) {
							break;
						}
					} else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesConfig.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto'))) {
						autoLoadElem = preloadElems[0] || lazyloadElems[i];
					}
				}

				if (autoLoadElem && !loadedSomething) {
					unveilElement(autoLoadElem);
				}
			}
		};

		var throttledCheckElements = throttle(checkElements);

		var switchLoadingClass = function switchLoadingClass(e) {
			addClass(e.target, lazySizesConfig.loadedClass);
			removeClass(e.target, lazySizesConfig.loadingClass);
			addRemoveLoadEvents(e.target, rafSwitchLoadingClass);
			triggerEvent(e.target, 'lazyloaded');
		};
		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
		var rafSwitchLoadingClass = function rafSwitchLoadingClass(e) {
			rafedSwitchLoadingClass({ target: e.target });
		};

		var changeIframeSrc = function changeIframeSrc(elem, src) {
			try {
				elem.contentWindow.location.replace(src);
			} catch (e) {
				elem.src = src;
			}
		};

		var handleSources = function handleSources(source) {
			var customMedia;

			var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

			if (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) {
				source.setAttribute('media', customMedia);
			}

			if (sourceSrcset) {
				source.setAttribute('srcset', sourceSrcset);
			}
		};

		var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg) {
			var src, srcset, parent, isPicture, event, firesLoad;

			if (!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented) {

				if (sizes) {
					if (isAuto) {
						addClass(elem, lazySizesConfig.autosizesClass);
					} else {
						elem.setAttribute('sizes', sizes);
					}
				}

				srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
				src = elem[_getAttribute](lazySizesConfig.srcAttr);

				if (isImg) {
					parent = elem.parentNode;
					isPicture = parent && regPicture.test(parent.nodeName || '');
				}

				firesLoad = detail.firesLoad || 'src' in elem && (srcset || src || isPicture);

				event = { target: elem };

				if (firesLoad) {
					addRemoveLoadEvents(elem, resetPreloading, true);
					clearTimeout(resetPreloadingTimer);
					resetPreloadingTimer = setTimeout(resetPreloading, 2500);

					addClass(elem, lazySizesConfig.loadingClass);
					addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
				}

				if (isPicture) {
					forEach.call(parent.getElementsByTagName('source'), handleSources);
				}

				if (srcset) {
					elem.setAttribute('srcset', srcset);
				} else if (src && !isPicture) {
					if (regIframe.test(elem.nodeName)) {
						changeIframeSrc(elem, src);
					} else {
						elem.src = src;
					}
				}

				if (isImg && (srcset || isPicture)) {
					updatePolyfill(elem, { src: src });
				}
			}

			if (elem._lazyRace) {
				delete elem._lazyRace;
			}
			removeClass(elem, lazySizesConfig.lazyClass);

			rAF(function () {
				if (!firesLoad || elem.complete && elem.naturalWidth > 1) {
					if (firesLoad) {
						resetPreloading(event);
					} else {
						isLoading--;
					}
					switchLoadingClass(event);
				}
			}, true);
		});

		var unveilElement = function unveilElement(elem) {
			var detail;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass) && hasClass(elem, lazySizesConfig.lazyClass)) {
				return;
			}

			detail = triggerEvent(elem, 'lazyunveilread').detail;

			if (isAuto) {
				autoSizer.updateElem(elem, true, elem.offsetWidth);
			}

			elem._lazyRace = true;
			isLoading++;

			lazyUnveil(elem, detail, isAuto, sizes, isImg);
		};

		var onload = function onload() {
			if (isCompleted) {
				return;
			}
			if (Date.now() - started < 999) {
				setTimeout(onload, 999);
				return;
			}
			var afterScroll = debounce(function () {
				lazySizesConfig.loadMode = 3;
				throttledCheckElements();
			});

			isCompleted = true;

			lazySizesConfig.loadMode = 3;

			throttledCheckElements();

			addEventListener('scroll', function () {
				if (lazySizesConfig.loadMode == 3) {
					lazySizesConfig.loadMode = 2;
				}
				afterScroll();
			}, true);
		};

		return {
			_: function _() {
				started = Date.now();

				lazysizes.elements = document.getElementsByClassName(lazySizesConfig.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);
				hFac = lazySizesConfig.hFac;

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				if (window.MutationObserver) {
					new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function (name) {
					document[_addEventListener](name, throttledCheckElements, true);
				});

				if (/d$|^c/.test(document.readyState)) {
					onload();
				} else {
					addEventListener('load', onload);
					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
					setTimeout(onload, 20000);
				}

				if (lazysizes.elements.length) {
					checkElements();
					rAF._lsFlush();
				} else {
					throttledCheckElements();
				}
			},
			checkElems: throttledCheckElements,
			unveil: unveilElement
		};
	}();

	var autoSizer = function () {
		var autosizesElems;

		var sizeElement = rAFIt(function (elem, parent, event, width) {
			var sources, i, len;
			elem._lazysizesWidth = width;
			width += 'px';

			elem.setAttribute('sizes', width);

			if (regPicture.test(parent.nodeName || '')) {
				sources = parent.getElementsByTagName('source');
				for (i = 0, len = sources.length; i < len; i++) {
					sources[i].setAttribute('sizes', width);
				}
			}

			if (!event.detail.dataAttr) {
				updatePolyfill(elem, event.detail);
			}
		});
		var getSizeElement = function getSizeElement(elem, dataAttr, width) {
			var event;
			var parent = elem.parentNode;

			if (parent) {
				width = getWidth(elem, parent, width);
				event = triggerEvent(elem, 'lazybeforesizes', { width: width, dataAttr: !!dataAttr });

				if (!event.defaultPrevented) {
					width = event.detail.width;

					if (width && width !== elem._lazysizesWidth) {
						sizeElement(elem, parent, event, width);
					}
				}
			}
		};

		var updateElementsSizes = function updateElementsSizes() {
			var i;
			var len = autosizesElems.length;
			if (len) {
				i = 0;

				for (; i < len; i++) {
					getSizeElement(autosizesElems[i]);
				}
			}
		};

		var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

		return {
			_: function _() {
				autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
				addEventListener('resize', debouncedUpdateElementsSizes);
			},
			checkElems: debouncedUpdateElementsSizes,
			updateElem: getSizeElement
		};
	}();

	var init = function init() {
		if (!init.i) {
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	lazysizes = {
		cfg: lazySizesConfig,
		autoSizer: autoSizer,
		loader: loader,
		init: init,
		uP: updatePolyfill,
		aC: addClass,
		rC: removeClass,
		hC: hasClass,
		fire: triggerEvent,
		gW: getWidth,
		rAF: rAF
	};

	return lazysizes;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _smoothscrollPolyfill = __webpack_require__(5);

var _smoothscrollPolyfill2 = _interopRequireDefault(_smoothscrollPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// kick off the polyfill just in case
_smoothscrollPolyfill2.default.polyfill();

var Scroll = function () {
  function Scroll() {
    _classCallCheck(this, Scroll);

    // value in pixels elements scrolled to will be from top of the window
    this.scrollOffset = -60;

    $(document).ready(this.onReady.bind(this));
  }

  _createClass(Scroll, [{
    key: 'onReady',
    value: function onReady() {
      // fire hash change on load
      this.onHashChange();
      // and watch for hash changes
      window.addEventListener('hashchange', this.onHashChange.bind(this), false);
    }
  }, {
    key: 'onHashChange',
    value: function onHashChange() {
      var hash = window.location.hash;

      // check if is hashbang link
      if (hash.includes('#!/')) {
        hash = hash.substring(3);

        var $target = $('#' + hash);

        window.scroll({
          top: $target.offset().top + this.scrollOffset,
          behavior: 'smooth'
        });
      }
    }
  }]);

  return Scroll;
}();

exports.default = Scroll;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* smoothscroll v0.4.0 - 2018 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  // polyfill

  function polyfill() {
    // aliases
    var w = window;
    var d = document;

    // return if scroll behavior is supported and polyfill is not forced
    if ('scrollBehavior' in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;

    /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */
    function isMicrosoftBrowser(userAgent) {
      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
    }

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (firstArg === null || (typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) !== 'object' || firstArg.behavior === undefined || firstArg.behavior === 'auto' || firstArg.behavior === 'instant') {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if ((typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError('behavior member of ScrollOptions ' + firstArg.behavior + ' is not a valid value for enumeration ScrollBehavior.');
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      var isBody;

      do {
        el = el.parentNode;

        isBody = el === d.body;
      } while (isBody === false && isScrollable(el) === false);

      isBody = null;

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : w.scrollX || w.pageXOffset,
        // use top prop, second argument if present or fallback to scrollY
        arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
    };

    // w.scrollBy
    w.scrollBy = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value could not be converted');
        }

        original.elementScroll.call(this,
        // use left prop, first number argument or fallback to scrollLeft
        arguments[0].left !== undefined ? ~~arguments[0].left : _typeof(arguments[0]) !== 'object' ? ~~arguments[0] : this.scrollLeft,
        // use top prop, second argument or fallback to scrollTop
        arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function () {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }
})();

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dust = function () {
  function Dust() {
    _classCallCheck(this, Dust);

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    $(window).resize(this.onResize.bind(this));

    this.setupProps();

    $(document).ready(this.onReady.bind(this));
  }

  _createClass(Dust, [{
    key: "onResize",
    value: function onResize() {
      clearTimeout(this.resizeTimer);

      this.resizeTimer = setTimeout(this.resizeDone.bind(this), 250);
    }
  }, {
    key: "resizeDone",
    value: function resizeDone() {
      this.setupProps();

      this.init();
    }
  }, {
    key: "onReady",
    value: function onReady() {
      this.bindEvents();
      this.init();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      /*
      * mousedown and mouseup events are disabled because
      * mouse is considered already down on desktop
      * but I'm leaving it here in case we need them later
      */

      //window.addEventListener("mousedown", this.mouse_down_handler.bind(this));
      window.addEventListener("touchstart", this.mouse_down_handler.bind(this));

      //window.addEventListener("mouseup", this.mouse_up_handler.bind(this));
      window.addEventListener("touchend", this.touch_end_handler.bind(this));

      window.addEventListener("mousemove", this.mouse_move_handler.bind(this));
      window.addEventListener("touchmove", this.touch_move_handler.bind(this));
    }
  }, {
    key: "setupProps",
    value: function setupProps() {
      this.mouse = {
        x: 0,
        y: 0,
        px: 0,
        py: 0,
        down: true
      };

      this.resolution = 15; //Width and height of each cell in the grid. Lower number for higher res. 10 is about the best without slowing down browser too much.

      this.pen_size = 40; //Radius around the mouse cursor coordinates to reach when stirring

      this.canvas_width = Math.round(window.innerWidth / this.resolution) * this.resolution; //Rounding to nearest 10. Needs to be a multiple of the resolution value below.
      this.canvas_height = Math.round(window.innerHeight / this.resolution) * this.resolution; //This too.

      this.num_cols = this.canvas_width / this.resolution; //This value is the number of columns in the grid.
      this.num_rows = this.canvas_height / this.resolution; //This is number of rows.

      this.speck_count = this.canvas_width; //This determines how many particles will be made.

      this.vec_cells = []; //The array that will contain the grid cells
      this.particles = []; //The array that will contain the particles
    }
  }, {
    key: "init",
    value: function init() {
      //These lines get the canvas DOM element and canvas context, respectively.
      this.canvas = document.getElementById("dust");
      this.ctx = this.canvas.getContext("2d");

      //These two set the width and height of the canvas to the defined values.
      if (window.devicePixelRatio > 1) {
        // Retina screen
        this.canvas.width = this.canvas_width * 2;
        this.canvas.height = this.canvas_height * 2;

        this.canvas.style.width = this.canvas_width + 'px';
        this.canvas.style.height = this.canvas_height + 'px';

        this.canvas.getContext('2d').scale(2, 2);
      } else {
        // Not Retina screen
        this.canvas.width = this.canvas_width;
        this.canvas.height = this.canvas_height;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear

      /*
      This loop begins at zero and counts up to the defined number of particles,
      less one, because array elements are numbered beginning at zero.
      */
      for (var i = 0; i < this.speck_count; i++) {
        /*
        This calls the function particle() with random X and Y values. It then
        takes the returned object and pushes it into the particles array at the
        end.
        */
        this.particles.push(new this.particle(Math.random() * this.canvas_width, Math.random() * this.canvas_height));
      }

      //This loops through the count of columns.
      for (var col = 0; col < this.num_cols; col++) {

        //This defines the array element as another array.
        this.vec_cells[col] = [];

        //This loops through the count of rows.
        for (var row = 0; row < this.num_rows; row++) {

          /*
          This line calls the cell() function, which creates an individual grid cell
          and returns it as an object. The X and Y values are multiplied by the
          resolution so that when the loops are referring to "column 2, row 2", the
          width and height of "column 1, row 1" are counted in so that the top-left
          corner of the new grid cell is at the bottom right of the other cell.
          */
          var cell_data = new this.cell(col * this.resolution, row * this.resolution, this.resolution);

          //This pushes the cell object into the grid array.
          this.vec_cells[col][row] = cell_data;

          /*
          These two lines set the object's column and row values so the object knows
          where in the grid it is positioned.
          */
          this.vec_cells[col][row].col = col;
          this.vec_cells[col][row].row = row;
        }
      }

      /*
      These loops move through the rows and columns of the grid array again and set variables
      in each cell object that will hold the directional references to neighboring cells.
      For example, let's say the loop is currently on this cell:
       OOOOO
      OOOXO
      OOOOO
       These variables will hold the references to neighboring cells so you only need to
      use "up" to refer to the cell above the one you're currently on.
      */
      for (var col = 0; col < this.num_cols; col++) {

        for (var row = 0; row < this.num_rows; row++) {

          /*
          This variable holds the reference to the current cell in the grid. When you
          refer to an element in an array, it doesn't copy that value into the new
          variable; the variable stores a "link" or reference to that spot in the array.
          If the value in the array is changed, the value of this variable would change
          also, and vice-versa.
          */
          var cell_data = this.vec_cells[col][row];

          /*
          Each of these lines has a ternary expression. A ternary expression is similar
          to an if/then clause and is represented as an expression (e.g. row - 1 >= 0)
          which is evaluated to either true or false. If it's true, the first value after
          the question mark is used, and if it's false, the second value is used instead.
           If you're on the first row and you move to the row above, this wraps the row
          around to the last row. This is done so that momentum that is pushed to the edge
          of the canvas is "wrapped" to the opposite side.
          */
          var row_up = row - 1 >= 0 ? row - 1 : this.num_rows - 1;
          var col_left = col - 1 >= 0 ? col - 1 : this.num_cols - 1;
          var col_right = col + 1 < this.num_cols ? col + 1 : 0;

          //Get the reference to the cell on the row above.
          var up = this.vec_cells[col][row_up];
          var left = this.vec_cells[col_left][row];
          var up_left = this.vec_cells[col_left][row_up];
          var up_right = this.vec_cells[col_right][row_up];

          /*
          Set the current cell's "up", "left", "up_left" and "up_right" attributes to the
          respective neighboring cells.
          */
          cell_data.up = up;
          cell_data.left = left;
          cell_data.up_left = up_left;
          cell_data.up_right = up_right;

          /*
          Set the neighboring cell's opposite attributes to point to the current cell.
          */
          up.down = this.vec_cells[col][row];
          left.right = this.vec_cells[col][row];
          up_left.down_right = this.vec_cells[col][row];
          up_right.down_left = this.vec_cells[col][row];
        }
      }

      //When the page is finished loading, run the draw() function.
      this.draw();
    }

    /*
    This function updates the position of the particles according to the velocity
    of the cells underneath, and also draws them to the canvas.
    */

  }, {
    key: "update_particle",
    value: function update_particle() {

      //Loops through all of the particles in the array
      for (var i = 0; i < this.particles.length; i++) {

        //Sets this variable to the current particle so we can refer to the particle easier.
        var p = this.particles[i];

        //If the particle's X and Y coordinates are within the bounds of the canvas...
        if (p.x >= 0 && p.x < this.canvas_width && p.y >= 0 && p.y < this.canvas_height) {

          /*
          These lines divide the X and Y values by the size of each cell. This number is
          then parsed to a whole number to determine which grid cell the particle is above.
          */
          var col = parseInt(p.x / this.resolution);
          var row = parseInt(p.y / this.resolution);

          //Same as above, store reference to cell
          var cell_data = this.vec_cells[col][row];

          /*
          These values are percentages. They represent the percentage of the distance across
          the cell (for each axis) that the particle is positioned. To give an example, if
          the particle is directly in the center of the cell, these values would both be "0.5"
           The modulus operator (%) is used to get the remainder from dividing the particle's
          coordinates by the resolution value. This number can only be smaller than the
          resolution, so we divide it by the resolution to get the percentage.
          */
          var ax = p.x % this.resolution / this.resolution;
          var ay = p.y % this.resolution / this.resolution;

          /*
          These lines subtract the decimal from 1 to reverse it (e.g. 100% - 75% = 25%), multiply
          that value by the cell's velocity, and then by 0.05 to greatly reduce the overall change in velocity
          per frame (this slows down the movement). Then they add that value to the particle's velocity
          in each axis. This is done so that the change in velocity is incrementally made as the
          particle reaches the end of it's path across the cell.
          */
          p.xv += (1 - ax) * cell_data.xv * 0.05;
          p.yv += (1 - ay) * cell_data.yv * 0.05;

          /*
          These next four lines are are pretty much the same, except the neighboring cell's
          velocities are being used to affect the particle's movement. If you were to comment
          them out, the particles would begin grouping at the boundary between cells because
          the neighboring cells wouldn't be able to pull the particle into their boundaries.
          */
          p.xv += ax * cell_data.right.xv * 0.05;
          p.yv += ax * cell_data.right.yv * 0.05;

          p.xv += ay * cell_data.down.xv * 0.05;
          p.yv += ay * cell_data.down.yv * 0.05;

          //This adds the calculated velocity to the position coordinates of the particle.
          p.x += p.xv;
          p.y += p.yv;

          //For each axis, this gets the distance between the old position of the particle and it's new position.
          var dx = p.px - p.x;
          var dy = p.py - p.y;

          //Using the Pythagorean theorum (A^2 + B^2 = C^2), this determines the distance the particle travelled.
          var dist = Math.sqrt(dx * dx + dy * dy);

          //This line generates a random value between 0 and 0.5
          var limit = Math.random() * 0.5;

          //If the distance the particle has travelled this frame is greater than the random value...
          if (dist > limit) {
            this.ctx.lineWidth = 1;
            this.ctx.lineCap = this.ctx.lineJoin = 'round';
            this.ctx.beginPath(); //Begin a new path on the canvas
            this.ctx.moveTo(p.x, p.y); //Move the drawing cursor to the starting point
            this.ctx.lineTo(p.px, p.py); //Describe a line from the particle's old coordinates to the new ones
            this.ctx.stroke(); //Draw the path to the canvas
          } else {
            //If the particle hasn't moved further than the random limit...

            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);

            /*
            Describe a line from the particle's current coordinates to those same coordinates
            plus the random value. This is what creates the shimmering effect while the particles
            aren't moving.
            */
            this.ctx.lineTo(p.x + limit, p.y + limit);

            this.ctx.stroke();
          }

          //This updates the previous X and Y coordinates of the particle to the new ones for the next loop.
          p.px = p.x;
          p.py = p.y;
        } else {
          //If the particle's X and Y coordinates are outside the bounds of the canvas...

          //Place the particle at a random location on the canvas
          p.x = p.px = Math.random() * this.canvas_width;
          p.y = p.py = Math.random() * this.canvas_height;

          //Set the particles velocity to zero.
          p.xv = 0;
          p.yv = 0;
        }

        //These lines divide the particle's velocity in half everytime it loops, slowing them over time.
        p.xv *= 0.5;
        p.yv *= 0.5;
      }
    }

    /*
    This is the main animation loop. It is run once from the init() function when the page is fully loaded and
    uses RequestAnimationFrame to run itself again and again.
    */

  }, {
    key: "draw",
    value: function draw() {
      /*
      This calculates the velocity of the mouse by getting the distance between the last coordinates and the new ones. The coordinates will be further apart depending on how fast the mouse is moving.
      */
      var mouse_xv = this.mouse.x - this.mouse.px;
      var mouse_yv = this.mouse.y - this.mouse.py;

      //Loops through all of the columns
      for (var i = 0; i < this.vec_cells.length; i++) {
        var cell_datas = this.vec_cells[i];

        //Loops through all of the rows
        for (var j = 0; j < cell_datas.length; j++) {

          //References the current cell
          var cell_data = cell_datas[j];

          //If the mouse button is down, updates the cell velocity using the mouse velocity
          if (this.mouse.down) {
            this.change_cell_velocity(cell_data, mouse_xv, mouse_yv, this.pen_size);
          }

          //This updates the pressure values for the cell.
          this.update_pressure(cell_data);
        }
      }

      /*
      This line clears the canvas. It needs to be cleared every time a new frame is drawn so the particles move. Otherwise, the particles would just look like long curvy lines.
      */
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //This sets the color to draw with.
      this.ctx.strokeStyle = "#999999";

      //This calls the function to update the particle positions.
      this.update_particle();

      /*
      This calls the function to update the cell velocity for every cell by looping through all of the rows and columns.
      */
      for (var i = 0; i < this.vec_cells.length; i++) {
        var cell_datas = this.vec_cells[i];

        for (var j = 0; j < cell_datas.length; j++) {
          var cell_data = cell_datas[j];

          this.update_velocity(cell_data);
        }
      }

      // This replaces the previous mouse coordinates values with the current ones for the next frame.
      this.mouse.px = this.mouse.x;
      this.mouse.py = this.mouse.y;

      // This requests the next animation frame which runs the draw() function again.
      requestAnimationFrame(this.draw.bind(this));
    }

    /*
    This function changes the cell velocity of an individual cell by first determining whether the cell is
    close enough to the mouse cursor to be affected, and then if it is, by calculating the effect that mouse velocity
    has on the cell's velocity.
    */

  }, {
    key: "change_cell_velocity",
    value: function change_cell_velocity(cell_data, mvelX, mvelY, pen_size) {
      //This gets the distance between the cell and the mouse cursor.
      var dx = cell_data.x - this.mouse.x;
      var dy = cell_data.y - this.mouse.y;
      var dist = Math.sqrt(dy * dy + dx * dx);

      //If the distance is less than the radius...
      if (dist < pen_size) {

        //If the distance is very small, set it to the pen_size.
        if (dist < 4) {
          dist = pen_size;
        }

        //Calculate the magnitude of the mouse's effect (closer is stronger)
        var power = pen_size / dist;

        /*
        Apply the velocity to the cell by multiplying the power by the mouse velocity and adding it to the cell velocity
        */
        cell_data.xv += mvelX * power;
        cell_data.yv += mvelY * power;
      }
    }

    /*
    This function updates the pressure value for an individual cell using the
    pressures of neighboring cells.
    */

  }, {
    key: "update_pressure",
    value: function update_pressure(cell_data) {

      //This calculates the collective pressure on the X axis by summing the surrounding velocities
      var pressure_x = cell_data.up_left.xv * 0.5 //Divided in half because it's diagonal
      + cell_data.left.xv + cell_data.down_left.xv * 0.5 //Same
      - cell_data.up_right.xv * 0.5 //Same
      - cell_data.right.xv - cell_data.down_right.xv * 0.5 //Same
      ;

      //This does the same for the Y axis.
      var pressure_y = cell_data.up_left.yv * 0.5 + cell_data.up.yv + cell_data.up_right.yv * 0.5 - cell_data.down_left.yv * 0.5 - cell_data.down.yv - cell_data.down_right.yv * 0.5;

      //This sets the cell pressure to one-fourth the sum of both axis pressure.
      cell_data.pressure = (pressure_x + pressure_y) * 0.25;
    }

    /*
    This function updates the velocity value for an individual cell using the
    velocities of neighboring cells.
    */

  }, {
    key: "update_velocity",
    value: function update_velocity(cell_data) {

      /*
      This adds one-fourth of the collective pressure from surrounding cells to the
      cell's X axis velocity.
      */
      cell_data.xv += (cell_data.up_left.pressure * 0.5 + cell_data.left.pressure + cell_data.down_left.pressure * 0.5 - cell_data.up_right.pressure * 0.5 - cell_data.right.pressure - cell_data.down_right.pressure * 0.5) * 0.25;

      //This does the same for the Y axis.
      cell_data.yv += (cell_data.up_left.pressure * 0.5 + cell_data.up.pressure + cell_data.up_right.pressure * 0.5 - cell_data.down_left.pressure * 0.5 - cell_data.down.pressure - cell_data.down_right.pressure * 0.5) * 0.25;

      /*
      This slowly decreases the cell's velocity over time so that the fluid stops
      if it's left alone.
      */
      cell_data.xv *= 0.99;
      cell_data.yv *= 0.99;
    }

    //This function is used to create a cell object.

  }, {
    key: "cell",
    value: function cell(x, y, res) {

      //This stores the position to place the cell on the canvas
      this.x = x;
      this.y = y;

      //This is the width and height of the cell
      this.r = res;

      //These are the attributes that will hold the row and column values
      this.col = 0;
      this.row = 0;

      //This stores the cell's velocity
      this.xv = 0;
      this.yv = 0;

      //This is the pressure attribute
      this.pressure = 0;
    }

    //This function is used to create a particle object.

  }, {
    key: "particle",
    value: function particle(x, y) {
      this.x = this.px = x;
      this.y = this.py = y;
      this.xv = this.yv = 0;
    }

    /*
    This function is called whenever the mouse button is pressed. The event object is passed to
    this function when it's called.
    */

  }, {
    key: "mouse_down_handler",
    value: function mouse_down_handler() {
      this.mouse.down = true; //Sets the mouse object's "down" value to true
    }

    //This function is called whenever the mouse button is released.

  }, {
    key: "mouse_up_handler",
    value: function mouse_up_handler() {
      this.mouse.down = false;
    }

    //This function is called whenever a touch point is removed from the screen.

  }, {
    key: "touch_end_handler",
    value: function touch_end_handler(e) {
      if (!e.touches) this.mouse.down = false; //If there are no more touches on the screen, sets "down" to false.
    }

    /*
    This function is called whenever the mouse coordinates have changed. The coordinates are checked by the
    browser at intervals.
    */

  }, {
    key: "mouse_move_handler",
    value: function mouse_move_handler(e) {
      //Saves the previous coordinates
      this.mouse.px = this.mouse.x;
      this.mouse.py = this.mouse.y;

      //Sets the new coordinates
      //this.mouse.x = e.offsetX || e.layerX; // absolute positioned canvas
      //this.mouse.y = e.offsetY || e.layerY; // absolute positioned canvas
      this.mouse.x = e.clientX; // fixed positioned canvas
      this.mouse.y = e.clientY; // fixed positioned canvas
    }

    /*
    This function is called whenever one of the coordinates have changed. The coordinates are checked by the
    browser at intervals.
    */

  }, {
    key: "touch_move_handler",
    value: function touch_move_handler(e) {
      // TODO
      this.mouse.px = this.mouse.x;
      this.mouse.py = this.mouse.y;

      //This line gets the coordinates for where the canvas is positioned on the screen.
      var rect = this.canvas.getBoundingClientRect();

      /*
      And this sets the mouse coordinates to where the first touch is. Since we're using pageX
      and pageY, we need to subtract the top and left offset of the canvas so the values are correct.
      */
      //this.mouse.x = e.touches[0].pageX - rect.left; // absolute positioned canvas
      //this.mouse.y = e.touches[0].pageY - rect.top; // absolute positioned canvas
      this.mouse.x = e.touches[0].clientX; // fixed positioned canvas
      this.mouse.y = e.touches[0].clientY; // fixed positioned canvas
    }
  }]);

  return Dust;
}();

exports.default = Dust;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map