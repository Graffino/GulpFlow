/**
 * Name: Video Handler
 * Author: Graffino (http://www.graffino.com)
 */


Object.assign($graffino, {
  videoHandler: {
    name: 'videoHandler',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: false,
      debug: true
    },

    // Scoped variables
    vars: {
      $video: $('.js-video'),
      $videoWrapper: $('.js-video-wrapper'),
      $playButton: $('.js-play')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;
      let isPlaying = false;

      _this.log('Initialized.');

      const playVideo = () => {
        vars.$video.get(0).play();
        isPlaying = true;
        vars.$playButton.addClass('is-playing');
      };

      const pauseVideo = () => {
        vars.$video.get(0).pause();
        isPlaying = false;
        vars.$playButton.removeClass('is-playing');
      };

      // Check if element is in DOM
      if (_that.isOnPage(vars.$video)) {
        vars.$videoWrapper.on('click', () => {
          if (isPlaying) {
            pauseVideo();
          } else {
            playVideo();
          }
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
