'use strict';

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

var map = document.querySelector('.map');
var pins = map.querySelector('.map__pins');
var cardTemplate = document.querySelector('#map-elements-template').content.querySelector('.map__card');
var fragment = document.createDocumentFragment();

var similarAds = [];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (min + 1 - max) + max);
};

var getRandomItem = function (collection) {
  return collection[Math.floor(Math.random() * collection.length)];
};

var getRandomLengthArray = function (collection) {
  var newArray = [];
  var arrayLength = getRandomNumber(1, collection.length);

  while (newArray.length < arrayLength) {
    var element = getRandomItem(collection);

    if (newArray.indexOf(element) === -1) {
      newArray.push(element);
    }
  }

  return newArray;
};

var generateData = function () {
  for (var i = 0; i < APARTMENTS_COUNT; i++) {
    var apartment = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },

      'offer': {
        'title': getRandomItem(APARTMENTS_DESCRIPTION),
        'price': getRandomNumber(APARTMENTS_MIN_PRICE, APARTMENTS_MAX_PRICE),
        'type': getRandomItem(APARTMENTS_TYPE),
        'rooms': getRandomNumber(APARTMENTS_MIN_ROOMS, APARTMENTS_MAX_ROOMS),
        'guests': getRandomNumber(APARTMENTS_MIN_GUESTS, APARTMENTS_MAX_GUESTS),
        'checkin': getRandomItem(CHECK_TIMES),
        'checkout': getRandomItem(CHECK_TIMES),
        'features': getRandomLengthArray(APARTMENTS_FEATURES),
        'description': '',
        'photos': [],
      },

      'location': {
        'x': getRandomNumber(APARTMENTS_MIN_X_LOCATION, APARTMENTS_MAX_X_LOCATION),
        'y': getRandomNumber(APARTMENTS_MIN_Y_LOCATION, APARTMENTS_MAX_Y_LOCATION),
      },
    };

    apartment.offer.address = apartment.location.x + ', ' + apartment.location.y;

    similarAds.push(apartment);
  }
};

var generatePins = function (pin) {
  var newPin = document.createElement('button');
  var pinSize = 40;

  newPin.style.left = pin.location.x - pinSize / 2 + 'px';
  newPin.style.top = pin.location.y - pinSize / 2 + 'px';
  newPin.classList = 'map__pin';

  newPin.innerHTML = '<img src="' + pin.author.avatar + '" width="' + pinSize + '" height="' + pinSize + '" draggable="false">';

  return newPin;
};

var generateCards = function (card) {
  var newCard = cardTemplate.cloneNode(true);
  var futuriesList = newCard.querySelector('.popup__features');

  futuriesList.innerHTML = '';
  newCard.querySelector('.popup__avatar').src = card.author.avatar;
  newCard.getElementsByTagName('h3')[0].textContent = card.offer.title;
  newCard.querySelector('.popup__price').innerHTML = card.offer.price + '&#x20bd;/ночь';
  newCard.getElementsByTagName('h4')[0].textContent = card.offer.type;
  newCard.getElementsByTagName('p')[0].textContent = card.offer.rooms + ' для ' + card.offer.guests + ' гостей';
  newCard.getElementsByTagName('p')[2].textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  newCard.getElementsByTagName('p')[3].textContent = card.offer.description;

  for (var i = 0; i < card.offer.features.length; i++) {
    var listElem = document.createElement('li');

    listElem.classList = 'feature feature--' + card.offer.features[i];

    futuriesList.appendChild(listElem);
  }

  futuriesList.replaceWith(futuriesList);

  return newCard;
};

var renderPins = function () {
  generateData();

  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(generatePins(similarAds[i]));
  }

  pins.appendChild(fragment);
};

var renderCards = function () {
  generateData();

  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(generateCards(similarAds[i]));
  }

  map.insertBefore(fragment, document.querySelector('.map__filters-container'));
};

renderPins();
renderCards();
