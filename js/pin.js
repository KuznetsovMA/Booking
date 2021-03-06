'use strict';

(function () {
  var createCard = window.card.create;
  var removeCard = window.card.remove;

  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');

  function createPin(offer) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = offer.location.x + 'px';
    pinElement.style.top = offer.location.y + 'px';

    pinElement.querySelector('img').setAttribute('src', offer.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', offer.offer.title);

    pinElement.addEventListener('click', function (e) {
      onPinClick(e, offer);
    });

    return pinElement;
  }

  // Rendering all pins by offers data
  function renderPins(offers) {
    var fragment = document.createDocumentFragment();

    // Creating single pin by offer data and appending it to fragment
    offers.forEach(function (offer) {
      var pinElement = createPin(offer);
      fragment.appendChild(pinElement);
    });

    // Appending fragment with all the pins to container
    pinsContainer.appendChild(fragment);
  }

  function removePins() {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    // Removing pins
    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function removePinActiveState(pinElement) {
    pinElement.classList.remove('map__pin--active');
  }

  function onPinClick(e, offer) {
    var pinElement = e.currentTarget;
    var pinElements = map.querySelectorAll('.map__pin');
    var cardElement = createCard(offer);

    // Toggle active state
    pinElements.forEach(removePinActiveState);
    pinElement.classList.add('map__pin--active');

    // Deleting previous card
    removeCard();

    // Creating new card
    map.insertBefore(cardElement, filtersContainer);
  }

  window.pin = {
    render: renderPins,
    remove: removePins
  };

}());
