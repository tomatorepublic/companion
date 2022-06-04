'use strict';

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const wordGenerator = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('dictionary.json', 'utf-8', (error, data) => {
        if (!error) {
            let jsonData = JSON.parse(data)
            let index = Math.floor(Math.random() * Object.keys(jsonData).length);
            let key = Object.keys(jsonData)[index];
            let value = Object.values(jsonData)[index];
            resolve([index, key, value]);
        }
        else {
            reject(error);
        }
    })
  })
}

const saveLearned = () => {

}

const learnedCheck = () => {
  
}

const question = (str) => new Promise(resolve => rl.question(str, resolve));

module.exports = { question, wordGenerator };