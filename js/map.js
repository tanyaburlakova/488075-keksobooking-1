'use strict';

(function () {
  var map = document.querySelector('.map');
  var pins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinRect = mainPin.getBoundingClientRect();

  var form = document.querySelector('.notice__form');
  var formFieldsets = form.querySelectorAll('.form__element');
  var address = form.querySelectorAll('input[name=address]')[0];

  var similarAds = window.data();

  var pageActivateHandler = function () {
    var mainPinX = mainPinRect.x + window.constants.MAIN_PIN_SIZE / 2;
    var mainPinY = mainPinRect.y + window.constants.MAIN_PIN_SIZE + window.constants.MAIN_PIN_CORNER_SIZE;

    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    window.pin.render(similarAds);

    formFieldsets.forEach(function (item) {
      item.disabled = false;
    });
  };

  var removePinsActiveState = function () {
    var similarPins = map.querySelectorAll('.map__pin--similar');

    window.utils.removeClass(similarPins, window.constants.PIN_ACTIVE_CLASS);
  };

  var popupRemoveHandler = function (popup) {
    popup.remove();
    removePinsActiveState();
  };

  var popupAddHandlers = function () {
    var popup = map.querySelector('.popup');
    var closer = popup.querySelector('.popup__close');

    closer.addEventListener('click', function () {
      popupRemoveHandler(popup);
    });

    closer.addEventListener('keydown', function (event) {
      if (event.keyCode === window.constants.ENTER_KEYCODE) {
        popupRemoveHandler(popup);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.keyCode === window.constants.ESC_KEYCODE) {
        popupRemoveHandler(popup);
      }
    });
  };

  var addPinActiveStateHandler = function (current, index) {
    var popup = map.querySelector('.popup');

    if (popup) {
      popupRemoveHandler(popup);
    }

    removePinsActiveState();
    current.classList.add(window.constants.PIN_ACTIVE_CLASS);
    window.popup.render(similarAds, index);
    popupAddHandlers();
  };

  mainPin.addEventListener('mouseup', pageActivateHandler);

  pins.addEventListener('click', function (event) {
    var target = event.target.parentNode;

    if (target.classList.contains('map__pin--similar')) {
      var index = target.getAttribute('data-index');

      addPinActiveStateHandler(target, index);
    }
  });

  pins.addEventListener('keydown', function (event) {
    var target = event.target;

    if (target.classList.contains('map__pin--similar') && event.keyCode === window.constants.ENTER_KEYCODE) {
      var index = target.getAttribute('data-index');

      addPinActiveStateHandler(target, index);
    }
  });

  var initForm = function () {
    var mainPinX = mainPinRect.x + window.constants.MAIN_PIN_SIZE / 2;
    var mainPinY = mainPinRect.y + window.constants.MAIN_PIN_SIZE / 2;

    address.value = 'x: ' + mainPinX + ' y: ' + mainPinY;
  };

  initForm();
})();
