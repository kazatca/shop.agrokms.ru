'use strict';

var flatten = require('flat');
require('dotenv').config({
  path: '.env'
});

var data = {
  phone: {
    mask: '+7(999)999-99-99'
  },
  suggestions: {
    address: {
      apiKey: process.env.DADATA_KEY,
      count: 10,
      locations: [
        {city: 'Комсомольск-на-Амуре'}, 
        {kladr_id: '2701'}
      ],
      unwantedWords: ['Хабаровский край', 'Комсомольский р-н']
    }
  },
  gmap: {
    apiKey: process.env.GMAP_KEY
  }
};

function convert(data){
  var result = flatten(data, {safe: true});
  return Object.keys(result).map(function(key){
    return {
      key: key,
      value: JSON.stringify(result[key]),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Settings', convert(data), {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Settings', null, {});
  }
};
