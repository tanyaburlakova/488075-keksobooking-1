'use strict';

(function () {
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

  var highlightValidity = function (field) {
    if (field.validity.valid) {
      field.classList.remove(window.constants.ERROR_CLASS);
    } else {
      field.classList.add(window.constants.ERROR_CLASS);
    }
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    removeClass: removeClass,
    getRandomLengthArray: getRandomLengthArray,
    highlightValidity: highlightValidity,
  };
})();
