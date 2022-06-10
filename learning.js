'use strict';

const promises = require('./promises.js');

const main = async () => {
  try {
    let word = await promises.wordGenerator();
    if ((await promises.learnedCheck(word[0])) === false) {
      console.log(`\n${word[1].capitalize()} - ${word[2].toLowerCase()}`);
      await promises.saveLearned(word[0]);
    } else {
      main();
    }
  } catch (error) {
    console.log(error);
  }
};

Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});


module.exports = { main };