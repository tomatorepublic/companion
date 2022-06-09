'use strict';

const promises = require('./promises.js');

const main = async () => {
  let word = await promises.question(`\nPlease enter the word - `);
  console.log(await promises.wordSearch(word.toLowerCase()));
  return await promises.wordSearch(word.toLowerCase());
};

module.exports = { main };
