'use strict';

const promises = require('./promises.js');

const main = async () => {
  let word = await promises.wordGenerator();
  console.log(`${await promises.learnedCheck(word[0]) === false}`)
};

module.exports = { main };