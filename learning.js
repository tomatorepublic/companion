'use strict';

const inquiries = require('./inquiries.js');

const toLearn = async () => {
  try {
    let word = await inquiries.generateWords();
    if ((await inquiries.checkLearned(word[0])) === false) {
      console.log(`\n${word[1].capitalize()} - ${word[2].toLowerCase()}`);
      await inquiries.saveLearned(word[0]);
    } else {
      toLearn();
    }
  } catch (error) {
    console.log(error);
  }
};

const seeResults = async () => {
  try {
    console.log('\nHere are the words you have learned:');
    let indexData = await inquiries.displayLearned();
    let indexes = Object.values(indexData);
    for (let i = 0; i < indexes.length; i++) {
      let words = await inquiries.getWords(indexes[i]);
      console.log(`${i + 1}. ${words.capitalize()}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const itMeans = async () => {
  try {
    let word = await inquiries.question(`\nPlease enter the word - `);
    console.log(`\n- ${await inquiries.searchMeaning(word.toLowerCase())}`);
    return await inquiries.searchMeaning(word.toLowerCase());
  } catch (error) {
    console.log(error);
  }
};

const seeTips = async () => {
  console.log('\nTip of the day for learning languages is:');
  let tip = await inquiries.getTips();
  console.log(`\n- ${tip}`);
};

const doClearing = async () => {
  try {
    let status = await inquiries.clearLearned();
    console.log(`\n${status}`);
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

module.exports = { toLearn, seeResults, itMeans, seeTips, doClearing };
