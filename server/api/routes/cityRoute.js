const console = require('console');
const path = require('path');
const data = require('../cityMeta.json');
const sha1 = require('sha1');
const geoip = require('geoip-lite');
const maxBy = require('lodash.maxby');
const minBy = require('lodash.minby');
const turf = require('@turf/turf');

/**
 * Gets all Cities
 */
exports.getAllCities = (request, response) => {
  response.json(
    Object.keys(data)
      .sort()
      .map(item => ({ slug: item, name: data[item].name }))
  );
};

exports.closestCityToGuess = (request, response) => {
  const guess = request.body.guess;

  if (!guess) {
    response.status(404).send(`No closest guest found`);
    return;
  }

  const allCitiesSpaces = Object.keys(data).map(item => {
    const hundredPercent = data[item].space.rail + data[item].space.car + data[item].space.bike;
    const car = ((100 / hundredPercent) * data[item].space.car) / 100;
    const bike = ((100 / hundredPercent) * data[item].space.bike) / 100;
    const rail = ((100 / hundredPercent) * data[item].space.rail) / 100;
    const result = { car, bike, rail };
    return {
      bike: result.bike,
      car: result.car,
      rail: result.rail,
      name: data[item].name,
      slug: item
    };
  });

  const getPercentOfRightness = (valueA, valueB) =>
    100 - Math.round(Math.abs(valueA * 100 - valueB * 100));

  let guessRightnessAgainstAllCities = allCitiesSpaces.map(item => ({
    score:
      (getPercentOfRightness(guess.bike, item.bike) +
        getPercentOfRightness(guess.car, item.car) +
        getPercentOfRightness(guess.rail, item.rail)) /
      3,
    name: item.name,
    slug: item.slug
  }));

  const best = maxBy(guessRightnessAgainstAllCities, 'score');

  response.json(best);
};

/**
 * Gets nearest City by calculating IP-Location
 */
exports.getNerestCity = (request, response) => {
  // const ip = '185.158.103.43';
  const ip = request.body.ip;
  console.log('Client ip is: ' + ip);

  const geo = geoip.lookup(ip);

  if (geo === null) {
    response.status(404).send(`Not Found City near ${ip}`);
  } else {
    const cities = Object.keys(data);
    let city = '';

    if (cities.indexOf(geo.city) === -1) {
      city = getCityByPoint(geo.ll);
    } else {
      city = geo.city;
    }

    response.status(200).json(city);
  }
};

/**
 * Gets City Info
 */
exports.getInfo = (request, response) => {
  response.json(data[request.params.city]);
};

/**
 * Gets Streets
 */
exports.getStreets = (request, response) => {
  const mongoClient = request.mongoClient;
  const db = request.db;
  const collection = db.collection('streets');

  collection.find({}, { limit: request.limit }).toArray((error, docs) => {
    if (error) {
      console.log(error);
      mongoClient.close();
    }
    response.json(docs);
    mongoClient.close();
  });
};

/**
 * Gets Street by ID
 */
exports.getStreetByID = (request, response) => {
  const mongoClient = request.mongoClient;
  const db = request.db;
  const collections = {
    bike: 'biketracks',
    rail: 'railtracks',
    railparking: 'railtracksparking',
    car: 'streets'
  };

  const collection = db.collection(collections[request.params.vehicle]);

  collection.findOne({ _id: parseInt(request.params.id, 10) }, {}, (error, docs) => {
    if (error) {
      console.log(error);
      mongoClient.close();
    }
    response.json(docs);
    mongoClient.close();
  });
  // });
};

/**
 * Gets Versus of Cities
 */
exports.getVersus = (request, response) => {
  const cityName = request.params.city;

  const toReturn = [data[cityName]];

  for (let i = 0; i < Object.keys(data).length; i += 1) {
    if (Object.keys(data)[i] !== cityName) {
      toReturn.push(data[Object.keys(data)[i]]);
    }
  }

  response.json(
    toReturn.map(city => {
      const { space, name, modalsplit } = city;
      return { space, modalsplit, city: name };
    })
  );
};

/**
 * Gets Backgroundimage for given City
 */
exports.getCityBackground = (request, response) => {
  const city = request.params.city.charAt(0).toUpperCase() + request.params.city.slice(1);
  response.header('Content-Type', 'image/jpeg');
  response.sendFile(path.join(__dirname, `../../../static/cityBackgrounds/about-${city}.jpg`));
};

/**
 * Gets Landmark for given City
 */
exports.getLandmark = (request, response) => {
  const city = request.params.city.charAt(0).toUpperCase() + request.params.city.slice(1);
  response.header('Content-Type', 'image/svg+xml');
  response.sendFile(path.join(__dirname, `../../../static/cityLandmarks/Landmark_${city}.svg`));
};

// Helpers
const error = message => console.log(`Error ${message}`);

const getCityByPoint = ll => {
  let toReturn = '';

  const latitude = ll[0];
  const longitude = ll[1];

  const cities = Object.keys(data);

  const ipPoint = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: ll
    }
  };

  const citiesWithDistance = cities.map(item => {
    const city = data[item];

    const cityPoint = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [city.boundingBox[0], city.boundingBox[1]]
      }
    };

    return {
      slug: item,
      name: city.name,
      distance: turf.distance(cityPoint, ipPoint)
    };
  });

  return minBy(citiesWithDistance, 'distance');
};
