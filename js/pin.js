'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var pins = document.querySelector('.map__pins');

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

  window.pin = {
    render: function (data) {
      Array.from(data).forEach(function (item, index) {
        fragment.appendChild(generatePins(item, index));
      });

      pins.appendChild(fragment);
    },
  };
})();
