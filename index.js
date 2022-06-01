'use strict';

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  '1 - Learn new words 2 - Check the word meaning\n',
  function (input) {
    switch (input) {
      case '1': {
        console.log('Learning new words');
        break;
      }
      case '2': {
        console.log('Checking the meaning');
        break;
      }
      default: {
        rl.close();
      }
    }
  }
);
