/*
 *
 * Filter for resellers
 *
 * @author: Ivan Tsarkov
 * @email: ivan.tsarkov@altium.com
 *
 */

;(function($) {

  var config = {
    logoPath: 'theme/images/logos/[logo]',
    insertInto: '.b-partners',
    controlFields: '.b-location',
    popup: '.b-popup-from-inner-page',
    classForList: 'partners-list',
    statesSeparator: '; '
  };

  var Resellers = {

    init: function(resellers) {
      Resellers.wrapper = $(config.insertInto);

      if(!Resellers.wrapper.length) return false;

      Resellers.controls = $(config.controlFields);
      Resellers.controlsCountry = Resellers.controls.find('.field-countries select');
      Resellers.controlsStateWrapper = Resellers.controls.find('.field-states');
      Resellers.controlsState = Resellers.controlsStateWrapper.find('select');

      this.appendResellers(resellers, 'ALL');

      Resellers.controlsCountry.on('change', function() {
        Resellers.getCountry(resellers);
      });

      Resellers.controlsState.on('change', function() {
        Resellers.getState(resellers);
      });

      this.popupInit();
    },

    getCountry: function(resellers) {
      var $val = Resellers.controlsCountry.val();

      if($val == Resellers.activeCountry) return;

      if($val == 'UNITED STATES' && !Resellers.controlsStateWrapper.hasClass('field-active')) {
        this.showField(Resellers.controlsStateWrapper);
      } else if($val !== 'UNITED STATES' && Resellers.controlsStateWrapper.hasClass('field-active')) {
        this.hideField(Resellers.controlsStateWrapper);
      }

      this.appendResellers(resellers, $val);
    },

    getState: function(resellers) {
      var $val = Resellers.controlsState.val();

      if($val == Resellers.activeState) return;

      this.appendResellers(resellers, Resellers.controlsCountry.val(), Resellers.controlsState.val());
    },

    showField: function(field) {
      field.addClass('field-active');
    },

    hideField: function(field) {
      field.removeClass('field-active');
    },

    appendResellers: function(resellers, selectedCountry, selectedState) {
      var resellersStr = '<ul class="' + config.classForList + '">';

      if(selectedState == undefined) {
        resellersStr += this.getResellersByCountries(resellers, selectedCountry);
      } else {
        resellersStr += this.getResellersByStates(resellers, selectedCountry, selectedState);
      }

      if(resellersStr == '<ul class="' + config.classForList + '">') {
        //this.setCountryInPopup(selectedCountry, selectedState);
        this.popupShow();
      }

      resellersStr += '</ul>';
      this.appendTo(Resellers.wrapper, resellersStr);
    },

    getResellersByCountries: function(resellers, selectedCountry) {
      var resellersStr = '', added = [];

      for (var key in resellers) {
        if(selectedCountry !== 'ALL' && resellers[key].country !== selectedCountry) continue;

        if($.inArray(resellers[key].title, added) < 0) {
          added.push(resellers[key].title);
          resellersStr += this.getList(resellers[key].logo, resellers[key].title, resellers[key].phone, resellers[key].href, resellers[key].www);
        }
      }

      Resellers.activeCountry = selectedCountry;
      return resellersStr;
    },

    getResellersByStates: function(resellers, selectedCountry, selectedState) {
      var resellersStr = '',
        states;

      for (var key in resellers) {
        if(resellers[key].states == undefined) continue;

        if(selectedState == 'ALL') {
          resellersStr += this.getList(resellers[key].logo, resellers[key].title, resellers[key].phone, resellers[key].href, resellers[key].www);
        } else {
          states = resellers[key].states.split(config.statesSeparator);

          if($.inArray(selectedState, states) >= 0) {
            resellersStr += this.getList(resellers[key].logo, resellers[key].title, resellers[key].phone, resellers[key].href, resellers[key].www);
          }
        }
      }

      Resellers.activeState = selectedState;
      return resellersStr;
    },

    popupInit: function() {
      Resellers.popup = $(config.popup);
      Resellers.popupBtnClose = Resellers.popup.find('.btn-close, .popup-bg');

      Resellers.popupBtnClose.each(function() {
        $(this).on('click touch', function(e) {
          e.preventDefault();
          Resellers.popupHide();
        });
      });

      window.resellersPopupHide = Resellers.popupHide;
      window.resellersPopupShow = Resellers.popupShow;
    },

    setCountryInPopup: function(selectedCountry, selectedState) {
      var country = Resellers.popup.find('#Country');

      country.val(selectedCountry);

      if(selectedState !== undefined) {
        var state = Resellers.popup.find('#State');

        state.val(selectedState);
      }
    },

    popupShow: function() {
      Resellers.popup.addClass('active');
    },

    popupHide: function() {
      Resellers.popup.removeClass('active');
    },

    getList: function(logo, title, phone, href, www) {
      return '<li>' +
        '<div class="img"><span><img src="' + config.logoPath.replace('[logo]', logo) + '" alt="' + title + '"/></span></div>' +
        '<h6>' + title + '</h6>' +
        '<p>Phone: <strong>' + phone + '</strong></p>' +
        '<p><a href="' + href + '">' + www + '</a></p>' +
        '</li>';
    },

    appendTo: function(el, str) {
      el.find('.' + config.classForList).remove();
      el.append(str);
    }
  };

  $.resellers = function(resellers) {
    Resellers.init(resellers);
  };

})(jQuery);