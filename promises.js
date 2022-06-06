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
        reject(error);
      }
    })
  })
}

const saveLearned = (index) => {
  if (fs.existsSync('./learned.json')) {
    fs.readFile('learned.json', 'utf8', (error, data) => {
      if (error) {
        console.log(error);
      } else {
        fs.readFile('learned.json', function (error, data) {
          var json = JSON.parse(data);
          json.push(index);
          fs.writeFile("learned.json", JSON.stringify(json), function(error){
            if (error) throw error;
          });
        })
      }
    });
  } else {
    fs.writeFile('learned.json', JSON.stringify([index]), 'utf8', function(error) {
      if (error) throw error;
    });
  }
}

const learnedCheck = (index) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('./learned.json')) {
      fs.readFile('learned.json', 'utf-8', (data) => {
        let jsonData = JSON.parse(data);
        if (jsonData[`${index}`] !== undefined) resolve(false);
        else reject(true);
      })
    } else {
      resolve(false);
    }
  })
}

const question = (str) => new Promise(resolve => rl.question(str, resolve));

module.exports = { question, wordGenerator, learnedCheck, saveLearned };