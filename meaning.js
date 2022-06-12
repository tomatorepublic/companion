'use strict';

const promises = require('./promises.js');

const main = async () => {
  try {
    let word = await promises.question(`\nPlease enter the word - `);
    console.log(`\n- ${await promises.wordSearch(word.toLowerCase())}`);
    return await promises.wordSearch(word.toLowerCase());
  } catch (error) {
    console.log(error);
  }
};

module.exports = { main };
