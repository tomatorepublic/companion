'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const wordGenerator = () => {

}

const saveLearned = () => {

}

const learnedCheck = () => {
  
}

const question = (str) => new Promise(resolve => rl.question(str, resolve));

module.exports = { question };