'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var popupTemplate = document.querySelector('#map-elements-template').content.querySelector('.map__card');

  var generatePopup = function (data, index) {
    var newPopup = popupTemplate.cloneNode(true);
    var futuriesList = newPopup.querySelector('.popup__features');

    var apartmentTypes = {
      'bungalo': 'Лачуга',
      'flat': 'Квартира',
      'house': 'Дом',
      'palace': 'Дворец',
    };

    futuriesList.innerHTML = '';
    newPopup.querySelector('.popup__avatar').src = data[index].author.avatar;
    newPopup.getElementsByTagName('h3')[0].textContent = data[index].offer.title;
    newPopup.querySelector('.popup__price').innerHTML = data[index].offer.price + '&#x20bd;/ночь';
    newPopup.getElementsByTagName('h4')[0].textContent = apartmentTypes[data[index].offer.type];
    newPopup.getElementsByTagName('p')[0].textContent = data[index].offer.rooms + ' для ' + data[index].offer.guests + ' гостей';
    newPopup.getElementsByTagName('p')[2].textContent = 'Заезд после ' + data[index].offer.checkin + ', выезд до ' + data[index].offer.checkout;
    newPopup.getElementsByTagName('p')[3].textContent = data[index].offer.description;

    data[index].offer.features.forEach(function (item) {
      var listElem = document.createElement('li');

      listElem.classList = 'feature feature--' + data[index].offer.features[item];

      futuriesList.appendChild(listElem);
    });

    futuriesList.replaceWith(futuriesList);

    return newPopup;
  };

  window.popup = {
    render: function (data, index) {
      fragment.appendChild(generatePopup(data, index));
      map.insertBefore(fragment, document.querySelector('.map__filters-container'));
    },
  };
})();
