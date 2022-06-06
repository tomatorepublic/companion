'use strict';

const promises = require('./promises.js');

const main = async () => {
  try {
    let word = await promises.wordGenerator();
    if ((await promises.learnedCheck(word[0])) === false) {
      console.log(`\n${word[1]} - ${word[2]}`);
      await promises.saveLearned(word[0]);
    } else {
      main();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { main };