(function ($) {

  $(function () {
    initFullPage();
    initPopupControl();
    initPopup();
    autoPlayVideo();
    initFormLocation();
    $('.formValidate').formValidate();
    initVideos();
    initMobileNav();
  });

  $(window).load(function() {
    initTabs();
  });

  function initMobileNav() {
    var $body = $('body');
    var $nav = $('.nav');
    var $btn = $nav.find('.btn-nav');

    $btn.on('click touch', function(e) {
      e.preventDefault();

      $body.toggleClass('nav-active');
    });

    $body.on('click touch', function(e) {
      if($body.hasClass('nav-active') && !$(e.target).closest($nav).length) {
        $body.removeClass('nav-active');
      }
    });
  }

  function initVideos() {
    var $els = $('.media-load-video');

    var config = {
      posterPath: 'theme/videos/',
      videoPath: 'theme/videos/',
      autoPlay: true
    };

    if(!$els.length) return;

    $els.find('.btn-play').on('click', checkItem);

    function checkItem(e) {
      e.preventDefault();

      var $el = $(this).parent();
      var namePoster = $el.data('namePoster');
      var nameVideo = $el.data('nameVideo');
      var popup = $el.data('popup');
      var videoInDom = $el.data('videoInDom');

      if(popup) {
        config.popup = true;
      }

      if(videoInDom && !popup) {
        play($el[0]);
      } else if(!videoInDom && popup) {
        appendVideo($el[0], namePoster, nameVideo);
      } else if(videoInDom && popup) {
        var $popupWithVieo = $($(this).attr('href'));

        $popupWithVieo.addClass('active');
        $popupWithVieo.find('video')[0].play();
      }

      $('.b-video').on('click touch', function(e) {
        var $target = $(e.target);

        if($target.hasClass('b-video')) {

          if(!videoInDom && popup) {
            $target.remove();
          } else if(videoInDom && popup) {
            $target.removeClass('active');
            $target.find('video')[0].pause();
          }

          config.popup = false;
        }

      });

      if(!config.popup) {
        this.style.display = 'none';
      }
    }

    function play(el) {
      var video = el.querySelector('video');

      pauseAll();

      if(video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }

    function pauseAll() {
      var videos = document.querySelectorAll('video');

      for(var i = 0; i < videos.length; i++) {
        var currentVideo = videos[i];

        if(currentVideo.paused) continue;

        currentVideo.pause();
        $(currentVideo).parent().siblings('.btn-play')[0].style.display = 'block';
      }
    }

    function appendVideo(el, namePoster, nameVideo) {
      removeAllVideo();

      var div = document.createElement('div');
      div.className = 'video-wrapper';

      var video = document.createElement('video');

      video.controls = 'controls';

      if(config.posterPath && namePoster) {
        video.poster = config.posterPath + namePoster;
      }

      if(config.autoPlay) {
        video.autoplay = 'autoplay';
      }

      //create mp4 source
      var sourceMP4 = document.createElement('source');
      sourceMP4.type = 'video/mp4';
      sourceMP4.src = config.videoPath + nameVideo + '.mp4';
      video.appendChild(sourceMP4);

      //create ogv source
      var sourceOGV = document.createElement('source');
      sourceOGV.type = 'video/webm';
      sourceOGV.src = config.videoPath + nameVideo + '.ogv';
      video.appendChild(sourceOGV);

      div.appendChild(video);

      if(config.popup) {
        var popup = document.createElement('div');
        popup.className = 'b-video video-popup active';

        var popupInner = document.createElement('div');
        popupInner.className = 'popup-inner';
        popup.appendChild(popupInner);

        popupInner.appendChild(div);

        document.body.appendChild(popup);

      } else {
        el.appendChild(div);
      }
    }

    function removeAllVideo() {
      for(var i = 0; i < $els.length; i++) {
        var $video = $els.eq(i).find('.video-wrapper');

        if(!$video.length) continue;

        $video.siblings('.btn-play')[0].style.display = 'inline-block';
        $video.remove();
      }
    }
  }

  function initFormLocation() {
    var $forms = $('.form-how-to-buy, .form-get-free-trial');

    $forms.each(function() {
      var $form = $(this);
      var $fieldCountry = $form.find('.field-countries');
      var $fieldCountrySelect = $fieldCountry.find('select');
      var $fieldState = $form.find('.field-states');

      if($fieldCountrySelect.val() == 'UNITED STATES') {
        $fieldState.addClass('active');
        $fieldState.find('select').addClass('active');
      }

      $fieldCountrySelect.on('change', function() {
        checkCountry($(this).val(), $fieldState);
      });
    });

    function checkCountry(val, $fieldState) {
      if(val == 'UNITED STATES') {
        $fieldState.addClass('active');
        $fieldState.find('select').addClass('active');
      } else {
        $fieldState.removeClass('active');
        $fieldState.find('select').removeClass('active').val('ALL').trigger('change');
      }
    }
  }

  function initTabs() {
    var $wrapper = $('.b-tabs');

    if(!$wrapper.length) return false;

    var $tabsNavWrapper = $wrapper.find('.tabs-nav'),
      tabsNavWrapperStartPosition = $tabsNavWrapper.offset().top,
      $tabsNav = $tabsNavWrapper.find('> ul > li'),
      $tabsContentWrapper = $wrapper.find('.tabs-content'),
      tabsContentWrapperHeight = $tabsContentWrapper.height(),
      tabsContentWrapperPositionBottom = $tabsContentWrapper.offset().top + tabsContentWrapperHeight - 47,
      $tabsContent = $tabsContentWrapper.find('> ul > li'),
      speed = 600;

    $tabsContent.each(function() {
      var $this = $(this);
      $(this).data('position-top', $this.offset().top);
    });

    $tabsNav.find('a').on('click touch', function(e) {
      e.preventDefault();

      var $this = $(this),
        $parent = $this.parent(),
        index = $parent.index();

      if(!$parent.hasClass('active')) {

        $('html, body').animate({
          scrollTop: $tabsContent.eq(index).offset().top - 65
        }, speed);
      }
    });

    $(window).on('resize scroll', function() {
      var position,
        windowScrollTop = $(this).scrollTop();

      $tabsContent.each(function() {
        var $this = $(this),
          index = $this.index();

        if(windowScrollTop > $this.data('position-top') - 67) {
          $tabsNav.removeClass('active');
          $tabsNav.eq(index).addClass('active');
        } else if(windowScrollTop < $tabsContent.eq(0).data('position-top') - 67) {
          $tabsNav.removeClass('active');
        }
      });

      if(windowScrollTop >= tabsNavWrapperStartPosition && windowScrollTop < tabsContentWrapperPositionBottom) {
        position = windowScrollTop - tabsNavWrapperStartPosition;

        $tabsNavWrapper.addClass('fixed');
      } else {
        $tabsNavWrapper.removeClass('fixed');
      }
    }).resize();
  }

  function initFullPage() {
    var $body = $('body'),
      $header = $('#site-header'),
      speed = 3000,
      nav,
      selector,
      timer,
      $wrapper = $('.slide-5'),
      $popup = $wrapper.find('.b-popup'),
      $btnScrollTop = $('.btn-scroll-top');

    if($body.hasClass('page-home')) {
      selector = '.page-home';
      nav = ['solidifyyourdesign', 'features&benefits', 'powerfuldesigntechnology', 'solidworkscollaboration', 'trialorbuy'];
    } else if($body.hasClass('page-features-and-benefits')) {
      selector = '.page-features-and-benefits';
      nav = ['features&benefits', 'collaborateordesign', 'trialorbuy'];
    } else {
      return false;
    }

    $('html').addClass('full-page-processed');

    $(selector).find('.content-wrapper').fullpage({
      sectionSelector: '.slide',
      slideSelector: '.slide-section',
      verticalCentered: false,
      scrollingSpeed: 1000,
      anchors: nav,
      navigation: true,
      navigationPosition: 'right',
      onLeave: function(index, nextIndex, direction) {
        if(direction == 'down' && !$header.hasClass('position-invisible')) {
          $header.addClass('position-invisible');
        }

        if(direction == 'up') {
          if($header.hasClass('position-invisible')) $header.removeClass('position-invisible');
          clearTimeout(timer);
          if(nextIndex == 1) return;

          timer = setTimeout(function() {
            $header.addClass('position-invisible');
          }, speed);
        }

        if($('body').hasClass('popup-active')) {
          $wrapper.removeClass('popup-active');
          $popup.removeClass('active');
          $('body').removeClass('popup-active');
        }
      }
    });

    $btnScrollTop.on('click touch', function(e) {
      e.preventDefault();

      $.fn.fullpage.moveTo(1);
    });

    $('.btn-next-slide').on('click touch', function(e) {
      e.preventDefault();

      $.fn.fullpage.moveSectionDown();
    });
  }

  function initPopup() {
    var $btns = $('.btn-popup'),
      $popup = $('.b-popup'),
      $btnClose = $popup.find('.btn-close'),
      $bg = $popup.find('.popup-bg'),
      $contents = $popup.find('.popup-content-wrapper');

    if($popup.length < 0 || $btns.length < 0) return false;

    $btns.on('click touch', function(e) {
      e.preventDefault();

      var $this = $(this),
        index = $this.data('popup-active');

      if(!$popup.hasClass('active')) {
        $popup.addClass('active');
        $contents.removeClass('active');
        $contents.eq(index).addClass('active');
      }
    });

    $btnClose.on('click touch', function(e) {
      e.preventDefault();

      $popup.removeClass('active');
    });

    $bg.on('click touch', function(e) {
      e.preventDefault();

      $popup.removeClass('active');
    });
  }

  function initPopupControl() {
    var $wrapper = $('.b-popup'),
      $btns = $wrapper.find('.popup-hd'),
      $contents = $wrapper.find('.popup-content-wrapper');

    $btns.on('click touch', function() {
      var $this = $(this),
        $content = $this.parent();

      if(!$this.hasClass('active')) {
        $contents.removeClass('active');
        $content.addClass('active');
      }
    });
  }

  function autoPlayVideo() {
    if(!$('body').hasClass('page-features-and-benefits')) return false;

    var vars = decodeURIComponent(location.search.substr(1)).split('&');

    for (var i = 0; i < vars.length; i++) {
      if(vars[i].indexOf('play=true') >= 0) {
        $('.btn-play').trigger('click');
        return false;
      }
    }
  }

})(jQuery);