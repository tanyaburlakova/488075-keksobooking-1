'use strict';

(function () {
  var FIELDS_LIMITS = {
    title: {
      min: 30,
      max: 100,
    },
    price: {
      min: 0,
      max: 1000000,
    }
  };

  var ERROR_MESSAGES = {
    required: 'Обязательное поле!',
    getMinLengthErrorText: function (val) {
      return 'Длина поля должна быть не менее ' + val + ' символов!';
    },
    getMaxLengthErrorText: function (val) {
      return 'Длина поля должна быть не более ' + val + ' символов!';
    },
  };

  var checkFieldLength = function (element, min, max) {
    if (element.value.length < min) {
      element.setCustomValidity(ERROR_MESSAGES.getMinLengthErrorText(min));
    } if (element.value.length > max) {
      element.setCustomValidity(ERROR_MESSAGES.getMinLengthErrorText(max));
    } else {
      element.setCustomValidity('');
    }
  };

  var checkFieldRequired = function (element) {
    if (element.validity.valueMissing) {
      element.setCustomValidity(ERROR_MESSAGES.required);
    } else {
      element.setCustomValidity('');
    }
  };

  var form = document.querySelector('.notice__form');
  var submit = form.querySelector('.form__submit');
  var price = form.querySelectorAll('input[name=price]')[0];
  var title = form.querySelectorAll('input[name=title]')[0];
  var type = form.querySelectorAll('select[name=type]')[0];

  var checkTitleHandler = function () {
    checkFieldLength(title, FIELDS_LIMITS.title.min, FIELDS_LIMITS.title.max);
    checkFieldRequired(title);
  };

  var checkPriceHandler = function () {
    checkFieldLength(price, FIELDS_LIMITS.price.min, FIELDS_LIMITS.price.max);
    checkFieldRequired(price);
  };

  var checkTypeHandler = function () {
    checkFieldRequired(type);
  };

  var checkFormValidityHandler = function () {
    checkTitleHandler();
    checkPriceHandler();
    checkTypeHandler();

    Array.from(form.elements).forEach(function (item) {
      window.utils.highlightValidity(item);
    });
  };

  title.addEventListener('input', checkTitleHandler);
  price.addEventListener('input', checkPriceHandler);
  type.addEventListener('invalid', checkTypeHandler);

  submit.addEventListener('click', checkFormValidityHandler);
})();
