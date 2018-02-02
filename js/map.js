'use strict';

var WIZARDS_COUNT = 8;
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
var similarAds = [];

var mapPoints = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var mapCardTemplate = document.querySelector('#map-elements-template').content.querySelector('.map__card');
var mapCards = document.querySelector('.map');

var randomNumber = function (max, min) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var randomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var randomLengthArray = function (array) {
  var ramdomArray = [];
  var arrayLength = randomNumber(array.length - 1, 1);

  while (ramdomArray.length < arrayLength) {
    var newElem = randomItem(array);
    if (ramdomArray.indexOf(newElem) === -1) {
      ramdomArray.push(newElem);
    }
  }

  return ramdomArray;
};

for (var i = 0; i < WIZARDS_COUNT; i++) {
  var apartment = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },

    'offer': {
      'title': randomItem(APARTMENTS_DESCRIPTION),
      'price': randomNumber(1000000, 1000),
      'type': randomItem(APARTMENTS_TYPE),
      'rooms': randomNumber(5, 1),
      'guests': randomNumber(20, 1),
      'checkin': randomItem(CHECK_TIMES),
      'checkout': randomItem(CHECK_TIMES),
      'features': randomLengthArray(APARTMENTS_FEATURES),
      'description': '',
      'photos': [],
    },

    'location': {
      'x': randomNumber(900, 300),
      'y': randomNumber(500, 100),
    },
  };

  apartment.offer.address = apartment.location.x + ', ' + apartment.location.y;

  similarAds.push(apartment);
}

for (var pin = 0; pin < similarAds.length; pin++) {
  var button = document.createElement('button');
  var buttonSize = 40;

  button.style.left = similarAds[pin].location.x - buttonSize / 2 + 'px';
  button.style.top = similarAds[pin].location.y - buttonSize / 2 + 'px';
  button.classList = 'map__pin';

  button.innerHTML = '<img src="' + similarAds[pin].author.avatar + '" width="' + buttonSize + '" height="' + buttonSize + '" draggable="false">';

  fragment.appendChild(button);
}

mapPoints.appendChild(fragment);

var renderMapCards = function (card) {
  var mapElement = mapCardTemplate.cloneNode(true);
  var apartmentFuturiesList = mapElement.querySelector('.popup__features');
  apartmentFuturiesList.innerHTML = '';

  mapElement.querySelector('.popup__avatar').src = card.author.avatar;
  mapElement.getElementsByTagName('h3')[0].textContent = card.offer.title;
  mapElement.querySelector('.popup__price').innerHTML = card.offer.price + '&#x20bd;/ночь';
  mapElement.getElementsByTagName('h4')[0].textContent = card.offer.type;
  mapElement.getElementsByTagName('p')[0].textContent = card.offer.rooms + ' для ' + card.offer.guests + ' гостей';
  mapElement.getElementsByTagName('p')[2].textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  mapElement.getElementsByTagName('p')[3].textContent = card.offer.description;

  for (var feature = 0; feature < card.offer.features.length; feature++) {
    var listElem = document.createElement('li');

    listElem.classList = 'feature feature--' + card.offer.features[feature];

    apartmentFuturiesList.appendChild(listElem);
  }

  apartmentFuturiesList.replaceWith(apartmentFuturiesList);

  return mapElement;
};

for (var card = 0; card < similarAds.length; card++) {
  fragment.appendChild(renderMapCards(similarAds[card]));
}

mapCards.insertBefore(fragment, document.querySelector('.map__filters-container'));


