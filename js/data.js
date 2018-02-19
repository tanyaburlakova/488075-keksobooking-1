'use strict';

(function () {
  var APARTMENTS_COUNT = 8;
  var APARTMENTS_DESCRIPTION = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде',
  ];
  var APARTMENTS_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  var CHECK_TIMES = [
    '12:00',
    '13:00',
    '14:00',
  ];
  var APARTMENTS_TYPE = [
    'flat',
    'house',
    'bungalo',
  ];

  var APARTMENTS_MIN_PRICE = 1000;
  var APARTMENTS_MAX_PRICE = 1000000;
  var APARTMENTS_MIN_ROOMS = 1;
  var APARTMENTS_MAX_ROOMS = 5;
  var APARTMENTS_MIN_GUESTS = 1;
  var APARTMENTS_MAX_GUESTS = 20;
  var APARTMENTS_MIN_X_LOCATION = 300;
  var APARTMENTS_MAX_X_LOCATION = 900;
  var APARTMENTS_MIN_Y_LOCATION = 100;
  var APARTMENTS_MAX_Y_LOCATION = 500;

  var similarAds = [];

  window.data = function () {
    for (var i = 0; i < APARTMENTS_COUNT; i++) {
      var apartment = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        },

        'offer': {
          'title': window.utils.getRandomItem(APARTMENTS_DESCRIPTION),
          'price': window.utils.getRandomNumber(APARTMENTS_MIN_PRICE, APARTMENTS_MAX_PRICE),
          'type': window.utils.getRandomItem(APARTMENTS_TYPE),
          'rooms': window.utils.getRandomNumber(APARTMENTS_MIN_ROOMS, APARTMENTS_MAX_ROOMS),
          'guests': window.utils.getRandomNumber(APARTMENTS_MIN_GUESTS, APARTMENTS_MAX_GUESTS),
          'checkin': window.utils.getRandomItem(CHECK_TIMES),
          'checkout': window.utils.getRandomItem(CHECK_TIMES),
          'features': window.utils.getRandomLengthArray(APARTMENTS_FEATURES),
          'description': '',
          'photos': [],
        },

        'location': {
          'x': window.utils.getRandomNumber(APARTMENTS_MIN_X_LOCATION, APARTMENTS_MAX_X_LOCATION),
          'y': window.utils.getRandomNumber(APARTMENTS_MIN_Y_LOCATION, APARTMENTS_MAX_Y_LOCATION),
        },
      };

      apartment.offer.address = apartment.location.x + ', ' + apartment.location.y;

      similarAds.push(apartment);
    }

    return similarAds;
  };
})();
