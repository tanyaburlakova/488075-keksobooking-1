'use strict';

(function () {
  var form = document.querySelector('.notice__form');

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

  var syncFields = function (event) {
    var target = event.target;

    window.utils.highlightValidity(target);

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

  form.addEventListener('change', function (event) {
    syncFields(event);
  });
})();
