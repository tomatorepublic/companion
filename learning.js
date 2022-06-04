'use strict';

const promises = require('./promises.js');

const main = async () => {
  console.log(`${await promises.wordGenerator()}`);
};

module.exports = { main };