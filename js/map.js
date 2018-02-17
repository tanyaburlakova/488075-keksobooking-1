'use strict';

var KEYCODES = {
  enter: 13,
  esc: 27,
};
var MAIN_PIN = {
  size: 62,
  cornerSize: 22,
};
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

var CLASSES = {
  pinActive: 'active',
  error: 'error',
};

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

var removeClass = function (collection, className) {
  Array.from(collection).forEach(function (item) {
    item.classList.remove(className);
  });
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

var generatePins = function (pin, index) {
  var newPin = document.createElement('button');
  var pinSize = 40;

  newPin.style.left = pin.location.x - pinSize / 2 + 'px';
  newPin.style.top = pin.location.y - pinSize / 2 + 'px';
  newPin.classList = 'map__pin map__pin--similar';
  newPin.setAttribute('data-index', index);

  newPin.innerHTML = '<img src="' + pin.author.avatar + '" width="' + pinSize + '" height="' + pinSize + '" draggable="false">';

  return newPin;
};

var generatePopup = function (index) {
  var newPopup = cardTemplate.cloneNode(true);
  var futuriesList = newPopup.querySelector('.popup__features');

  futuriesList.innerHTML = '';
  newPopup.querySelector('.popup__avatar').src = similarAds[index].author.avatar;
  newPopup.getElementsByTagName('h3')[0].textContent = similarAds[index].offer.title;
  newPopup.querySelector('.popup__price').innerHTML = similarAds[index].offer.price + '&#x20bd;/ночь';
  newPopup.getElementsByTagName('h4')[0].textContent = similarAds[index].offer.type;
  newPopup.getElementsByTagName('p')[0].textContent = similarAds[index].offer.rooms + ' для ' + similarAds[index].offer.guests + ' гостей';
  newPopup.getElementsByTagName('p')[2].textContent = 'Заезд после ' + similarAds[index].offer.checkin + ', выезд до ' + similarAds[index].offer.checkout;
  newPopup.getElementsByTagName('p')[3].textContent = similarAds[index].offer.description;

  similarAds[index].offer.features.forEach(function (item) {
    var listElem = document.createElement('li');

    listElem.classList = 'feature feature--' + similarAds[index].offer.features[item];

    futuriesList.appendChild(listElem);
  });

  futuriesList.replaceWith(futuriesList);

  return newPopup;
};

var renderPins = function () {
  Array.from(similarAds).forEach(function (item, index) {
    fragment.appendChild(generatePins(item, index));
  });

  pins.appendChild(fragment);
};

var renderPopup = function (index) {
  fragment.appendChild(generatePopup(index));
  map.insertBefore(fragment, document.querySelector('.map__filters-container'));
};

generateData();

// Show/hide popups

var mainPin = map.querySelector('.map__pin--main');
var mainPinRect = mainPin.getBoundingClientRect();

var form = document.querySelector('.notice__form');
var submit = form.querySelector('.form__submit');
var formFieldsets = form.querySelectorAll('.form__element');
var address = document.getElementsByName('address')[0];
var price = document.getElementsByName('price')[0];
var title = document.getElementsByName('title')[0];

var pinsAddHandler = function () {
  var mainPinX = mainPinRect.x + MAIN_PIN.size / 2;
  var mainPinY = mainPinRect.y + MAIN_PIN.size + MAIN_PIN.cornerSize;

  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  renderPins();

  address.value = 'x: ' + mainPinX + ' y: ' + mainPinY;

  formFieldsets.forEach(function (item) {
    item.disabled = false;
  });
};

var removePinsActiveState = function () {
  var similarPins = map.querySelectorAll('.map__pin--similar');

  removeClass(similarPins, CLASSES.pinActive);
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
    if (event.keyCode === KEYCODES.enter) {
      popupRemoveHandler(popup);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === KEYCODES.esc) {
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
  current.classList.add(CLASSES.pinActive);
  renderPopup(index);
  popupAddHandlers();
};

mainPin.addEventListener('mouseup', pinsAddHandler);

pins.addEventListener('click', function (event) {
  var target = event.target.parentNode;

  if (target.classList.contains('map__pin--similar')) {
    var index = target.getAttribute('data-index');

    addPinActiveStateHandler(target, index);
  }
});

pins.addEventListener('keydown', function (event) {
  var target = event.target;

  if (target.classList.contains('map__pin--similar') && event.keyCode === KEYCODES.enter) {
    var index = target.getAttribute('data-index');

    addPinActiveStateHandler(target, index);
  }
});

var linkedValues = {
  'type': {
    'linked': 'price',
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000,
  },
  'price': {
    'linked': 'type',
    '0': 'flat',
    '1000': 'bungalo',
    '5000': 'house',
    '100000': 'palace',
  },
  'timein': {
    'linked': 'timeout',
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00',
  },
  'timeout': {
    'linked': 'timein',
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00',
  },
  'room_number': {
    'linked': 'capacity',
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0,
  },
};

var synkFields = function (event) {
  var target = event.target;

  fieldValidation(target);

  if (!target.classList.contains('linked-control')) {
    return;
  }

  var linked = linkedValues[target.id].linked;
  var linkedVal = linkedValues[target.id][target.value];

  form.querySelector('#' + linked).value = linkedVal;

  if (target.id === 'room_number') {
    var linkedElm = form.querySelector('.capacity');

    for (var option = 0; option < linkedElm.length; option++) {
      var mainVal = parseInt(target.value, 10);
      var optionVal = parseInt(linkedElm[option].value, 10);

      linkedElm[option].disabled = true;

      if ((mainVal >= optionVal && optionVal !== 0 && mainVal !== 100) ||
          (mainVal === 100 && optionVal === 0)) {
        linkedElm[option].disabled = false;
      }
    }
  }
};

var fieldValidation = function (field) {
  if (field.validity.valid) {
    field.classList.remove(CLASSES.error);
  } else {
    field.classList.add(CLASSES.error);
  }
};

var formValidation = function () {
  Array.from(form.elements).forEach(function (item) {
    fieldValidation(item);
  });
};

var checkTitleHandler = function () {
  if (title.validity.tooShort) {
    title.setCustomValidity('Название должно быть не менее 30 символов!');
  } else if (title.validity.tooLong) {
    title.setCustomValidity('Название должно быть не более 100 символов!');
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле!');
  } else {
    title.setCustomValidity('');
  }
};

var initForm = function () {
  var mainPinX = mainPinRect.x + MAIN_PIN.size / 2;
  var mainPinY = mainPinRect.y + MAIN_PIN.size / 2;

  address.value = 'x: ' + mainPinX + ' y: ' + mainPinY;
  price.value = '1000';
};

initForm();

form.addEventListener('change', function (event) {
  synkFields(event);
});

title.addEventListener('invalid', checkTitleHandler);
submit.addEventListener('click', formValidation);
