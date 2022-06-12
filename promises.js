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
      } else {
        reject('\nSomething went wrong...');
      }
    })
  })
}

const saveLearned = (index) => {
  if (fs.existsSync('./learned.json')) {
    fs.readFile('learned.json', 'utf8', (error, data) => {
      if (error) {
        console.log('\nSomething went wrong...');
      } else {
        fs.readFile('learned.json', function (error, data) {
          var json = JSON.parse(data);
          json.push(index);
          fs.writeFile("learned.json", JSON.stringify(json), function(error){
            if (error) console.log('\nSomething went wrong...');
          });
        })
      }
    });
  } else {
    fs.writeFile('learned.json', JSON.stringify([index]), 'utf8', function(error) {
      if (error) console.log('\nSomething went wrong...');
    });
  }
}

const learnedCheck = (index) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('./learned.json')) {
      fs.readFile('learned.json', 'utf-8', (error, data) => {
        if (error) console.log('\nSomething went wrong...');
        let jsonData = JSON.parse(data);
        if (jsonData[`${index}`] === undefined) resolve(false);
        else reject(true);
      })
    } else {
      resolve(false);
    }
  })
}

const wordSearch = (naming) => {
  return new Promise((resolve, reject) => {
    fs.readFile('dictionary.json', 'utf-8', (error, data) => {
      if (error) console.log('\nSorry, something went wrong...');
      let jsonData = JSON.parse(data);
      if (jsonData[`${naming}`] !== undefined) resolve(jsonData[`${naming}`]);
      else reject('\nSorry, the word was not found...');
    })
  })
}

const question = (str) => new Promise(resolve => rl.question(str, resolve));

module.exports = { question, wordGenerator, learnedCheck, saveLearned, wordSearch };
