/*
 *
 * Custom form validation - tooltips.
 *
 * @author: Ivan Tsarkov
 * @email: ivan.tsarkov@altium.com
 *
 */

;(function($) {
  'use strict';

  var pluginName = 'formValidate',
    config = {
    messages: [
      'Required',
      'Please supply a valid phone number',
      'Email is not correct'
    ],
    errorClass: 'field-error',
    tooltipClass: 'tooltip',
    regEmail: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/i
  };

  function FormValidate(element, options) {
    this.elem = element;
    this.options = $.extend({}, config, options);
    this.init();

    return this;
  }

  FormValidate.prototype = {

    init: function() {
      var self = this;

      this.elem.addEventListener('submit', function(e) {
        self.fieldsValidate();

        if(!self.valid) {
          e.preventDefault();
        }
      });

      this.elem.addEventListener('blur', function(e) {
        var elem = e.target;

        if($(elem).hasClass('required')) {
          self.checkValid(elem);
        }
      }, true);
    },

    fieldsValidate: function() {
      var elems = this.elem.elements;

      this.valid = true;

      for (var i = 0; i < elems.length; i++) {
        if($(elems[i]).hasClass('required')) {
          this.checkValid(elems[i]);
        }
      }
    },

    checkValid: function(elem) {
      var $elem = $(elem);
      this.resetError(elem.parentNode);

      if($elem.hasClass('form-text') && !elem.value) {
        this.showError(elem.parentNode, this.options.messages[0]);
      } else if($elem.hasClass('field-digits') && (isNaN(elem.value) || elem.value.length < 3)) {
        this.showError(elem.parentNode, this.options.messages[1]);
      } else if(elem.getAttribute('name') === 'email' && !this.options.regEmail.test(elem.value)) {
        this.showError(elem.parentNode, this.options.messages[2]);
      }

      if($elem.hasClass('form-textarea') && !elem.value) {
        this.showError(elem.parentNode, this.options.messages[0]);
      }

      if($elem.hasClass('form-select') && !elem.value) {

        if(elem.getAttribute('name') === 'state' && $elem.hasClass('active')) {
          this.showError(elem.parentNode, this.options.messages[0]);
        } else if(elem.getAttribute('name') !== 'state') {
          this.showError(elem.parentNode, this.options.messages[0]);
        }
      }

      if($elem.hasClass('form-checkbox') && !elem.checked) {
        this.showError(elem.parentNode, this.options.messages[0]);
      }
    },

    showError: function(container, errorMessage) {
      var msgElem = document.createElement('span'),
        label = container.querySelector('label');

      msgElem.className = this.options.tooltipClass;
      msgElem.innerHTML = errorMessage;

      if(label) {
        label.appendChild(msgElem);
      } else {
        container.appendChild(msgElem);
      }

      $(container).addClass(this.options.errorClass);

      this.valid = false;
    },

    resetError: function(container) {
      var label = container.querySelector('label');

      if(label && label.lastChild.className === this.options.tooltipClass) {
        label.removeChild(label.lastChild);
      } else if(container.lastChild.className === this.options.tooltipClass) {
        container.removeChild(container.lastChild);
      }

      $(container).removeClass(this.options.errorClass);
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if(!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
          new FormValidate(this, options));
      }
    });
  }

})(jQuery);