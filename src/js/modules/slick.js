/**
 * Name: Slick Slider
 * Author: Graffino (http://www.graffino.com)
 */

Object.assign($graffino, {
  slick: {
    name: 'slick',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $sliderClass: $('.js-slick'),
      $slideIndexSelector: $('[data-slide-index]'),
      $currentSlideIndex: $('.js-slider-index'),
      $dotsClass: $('.js-slider-dots'),
      $currentSlideClass: '.slick-current',
      $heroBackground: $('.hero__background'),
      $heroCarousel: $('.js-hero-carousel'),
      settings: {}

    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$sliderClass)) {
        $(vars.$sliderClass).each((index, element) => {
          const $this = $(element);

          let toggleBreakpoint = $this.attr('data-slick-toggle-breakpoint'),
            currentSettings;

          // Assign the value of false if we can't retrieve the attribute value
          toggleBreakpoint = toggleBreakpoint === undefined ? false : toggleBreakpoint;

          // Settings for main Hero Slider
          vars.settings.hero = {
            appendArrows: $this.attr('data-slick-append') || '',
            arrows: _this.isTrue($this.attr('data-slick-arrows')) || false,
            autoplay: _this.isTrue($this.attr('data-slick-autoplay')) || true,
            autoplaySpeed: parseInt($this.attr('data-slick-autoplay-speed'), 10) || 5000,
            centerMode: _this.isTrue($this.attr('data-slick-center')) || false,
            centerPadding: $this.attr('data-slick-padding') || '400px',
            dots: _this.isTrue($this.attr('data-slick-dots')) || true,
            appendDots: _this.isTrue($this.attr('data-slick-dots')) || vars.$dotsClass,
            draggable: _this.isTrue($this.attr('data-slick-draggable')) || false,
            fade: _this.isTrue($this.attr('data-slick-fade')) || true,
            infinite: _this.isTrue($this.attr('data-slick-infinite')) || false,
            initialSlide: parseInt($this.attr('data-slick-initial'), 10) || 0,
            mobileFirst: _this.isTrue($this.attr('data-slick-mobile')) || false,
            touchMove: _this.isTrue($this.attr('data-slick-touch')) || false,
            verticalSwiping: _this.isTrue($this.attr('data-slick-vertical-swipe')) || false,
            rows: parseInt($this.attr('data-slick-rows'), 10) || 1,
            slidesPerRow: parseInt($this.attr('data-slick-slides-row'), 10) || 1,
            slidesToScroll: parseInt($this.attr('data-slick-scroll'), 10) || 1,
            slidesToShow: parseInt($this.attr('data-slick-show'), 10) || 1,
            speed: parseInt($this.attr('data-slick-speed'), 10) || 1000,
            vertical: _this.isTrue($this.attr('data-slick-vertical')) || false,
            focusOnSelect: _this.isTrue($this.attr('data-slick-focus')) || false
          };
          // Settings for person carousel
          vars.settings.personCarousel = {
            asNavFor: '.js-person-thumbnails',
            speed: 800,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            useTransform: true,
            lazyLoad: 'ondemand',
            fade: true,
            cssEase: vars.ease
          };
          // Settings for person thumbnails
          vars.settings.personThumbnails = {
            asNavFor: '.js-person-carousel',
            speed: 800,
            arrows: false,
            vertical: true,
            verticalSwiping: true,
            focusOnSelect: true,
            slidesToShow: 3,
            slidesToScroll: 0,
            centerMode: true,
            centerPadding: 0,
            useTransform: true,
            lazyLoad: 'ondemand',
            cssEase: vars.ease,
            autoplay: false,
            responsive: [
              {
                breakpoint: _that.vars.breakpoints.small + 1,
                settings: {
                  vertical: false,
                  verticalSwiping: false,
                  slidesToShow: 3
                }
              }
            ]
          };

          if ($this.hasClass('js-hero-carousel')) {
            currentSettings = vars.settings.hero;
          } else if ($this.hasClass('js-person-carousel')) {
            currentSettings = vars.settings.personCarousel;
          } else if ($this.hasClass('js-person-thumbnails')) {
            currentSettings = vars.settings.personThumbnails;
          }

          if (!toggleBreakpoint) {
            $this.slick(currentSettings);
          }

          _this.changeBackground(0);

          let current = vars.$heroCarousel.slick('slickCurrentSlide');

          (vars.$currentSlideIndex).text(_this.pad(current + 1, 2));
          $('[data-slide-index="' + current + '"]').addClass(_that.vars.stateClass.active);

          vars.$heroCarousel.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
            current = currentSlide;
            _this.changeBackground(nextSlide);
            (vars.$slideIndexSelector).removeClass(_that.vars.stateClass.active);
            (vars.$currentSlideIndex).text(_this.pad(nextSlide + 1, 2));
            $('[data-slide-index="' + current + '"]').addClass(_that.vars.stateClass.active);
          });

          vars.$slideIndexSelector.on('click', function () {
            const index = $(this).attr('data-slide-index');
            $this.slick('slickGoTo', index);
          });
        });
      } else {
        this.log('\t\u2514 Element(s) not found in DOM.');
      }
    },

    isTrue(boolVar) {
      return boolVar === 'true';
    },

    changeBackground(id) {
      const currentBackgroundUrl = $(`[data-slick-index="${id}"]`).find('.hero__slide').css('background-image');
      this.vars.$heroBackground.css('background-image', currentBackgroundUrl);
    },

    pad(n, width, z) {
      z = z || '0';
      n = String(n);
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
  }
});
