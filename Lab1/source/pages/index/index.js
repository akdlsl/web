import './index.css';
import './Arrow.js'

ymaps.ready(async function () {
    let myMap = new ymaps.Map('map', {
        center: [55.733835, 37.588227],
        zoom: 5
    });

    let ArrowObject;
    await ymaps.modules.require(['geoObject.Arrow'], function (Arrow) {
        ArrowObject = Arrow;
    });

    const placesAddress = ['Стокгольм', 'Таллин', 'Выборг', 'Санкт-Петербург', 'Новгород', 'Смоленск', 'Киев', 'Одесса', 'Варна', 'Стамбул', 'Афины'];
    const placeCoordinates = [];
    for (const a of placesAddress) {
        const geocoder = await ymaps.geocode(a);
        const coordinates = geocoder.geoObjects.get(0).geometry.getCoordinates();
        placeCoordinates.push(coordinates);
        let placemark = new ymaps.Placemark(coordinates, {'hintContent': a});
        myMap.geoObjects.add(placemark);
    }

    placeCoordinates.forEach((value, index, arr) => {
        if (index + 1 >= arr.length) {
            return;
        }

        const arrow = new ArrowObject([arr[index], arr[index + 1]], null, {
            geodesic: true,
            strokeWidth: 5,
            opacity: 0.5,
            strokeStyle: 'shortdash'
        });

        myMap.geoObjects.add(arrow);
    });
});
