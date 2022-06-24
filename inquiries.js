'use strict';

const fs = require('fs');
const readline = require('readline');

const DICTIONARY = 'dictionary.json';
const LEARNED = 'learned.json';
const TIPS = 'tips.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const generateWords = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(DICTIONARY, 'utf-8', (error, data) => {
      if (!error) {
        let jsonData = JSON.parse(data);
        let index = Math.floor(Math.random() * Object.keys(jsonData).length);
        let key = Object.keys(jsonData)[index];
        let value = Object.values(jsonData)[index];
        resolve([index, key, value]);
      } else {
        reject('\nSomething is not okay with the dictionary file');
      }
    });
  });
};

const saveLearned = (index) => {
  if (fs.existsSync(`./${LEARNED}`)) {
    fs.readFile(LEARNED, 'utf-8', (error, data) => {
      let json = JSON.parse(data);
      json.push(index);
      fs.writeFile(LEARNED, JSON.stringify(json), (error) => {
        if (error) console.log('\nSomething suddenly went wrong');
      });
    });
  } else {
    fs.writeFileSync(LEARNED, JSON.stringify([index]));
  }
};

const checkLearned = (index) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(`./${LEARNED}`)) {
      fs.readFile(LEARNED, 'utf-8', (error, data) => {
        if (error)
          console.log('\nSomething has happened with the learned file');
        let jsonData = JSON.parse(data);
        if (jsonData[`${index}`] === undefined) resolve(false);
        else reject(true);
      });
    } else {
      resolve(false);
    }
  });
};

const getWords = (index) => {
  return new Promise((resolve, reject) => {
    fs.readFile(DICTIONARY, 'utf-8', (error, data) => {
      if (error)
        console.log(
          '\nSorry, there is something wrong with the dictionary file'
        );
      let jsonData = JSON.parse(data);
      if (index !== undefined) resolve(Object.keys(jsonData)[index]);
      else reject('\nThere must have been a mistake...');
    });
  });
};

const displayLearned = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(`./${LEARNED}`)) {
      fs.readFile(LEARNED, 'utf-8', (error, data) => {
        if (error) console.log('\nSomething is wrong with the learned file');
        let jsonData = JSON.parse(data);
        let results = Object.values(jsonData);
        let indexes = [];
        for (let index = 0; index < results.length; index++) {
          indexes.push(results[index]);
        }
        resolve(indexes);
      });
    } else {
      reject('\nYou have not learned any words yet!');
    }
  });
};

const searchMeaning = (word) => {
  return new Promise((resolve, reject) => {
    fs.readFile(DICTIONARY, 'utf-8', (error, data) => {
      if (error)
        console.log('\nThere must be something wrong with the dictionary file');
      let jsonData = JSON.parse(data);
      if (jsonData[`${word}`] !== undefined) resolve(jsonData[`${word}`]);
      else reject('\nSorry, the word was not found...');
    });
  });
};

const getTips = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(TIPS, 'utf-8', (error, data) => {
      if (error) console.log('\nSomething wrong with the tips file');
      let jsonData = JSON.parse(data);
      let index = Math.floor(Math.random() * Object.keys(jsonData).length);
      resolve(Object.values(jsonData)[index]);
    });
  });
};

const clearLearned = async () => {
  try {
    fs.unlinkSync(`./${LEARNED}`);
    return 'Your history was successfully deleted';
  } catch {
    return 'Your learned words list is empty';
  }
};

const question = (str) => {
  return new Promise((resolve) => {
    rl.question(str, resolve);
  });
};

module.exports = {
  question,
  generateWords,
  checkLearned,
  saveLearned,
  getWords,
  displayLearned,
  searchMeaning,
  getTips,
  clearLearned,
};
