'use strict';

const { question } = require('./inquiries.js');
const learning = require('./learning.js');

const features = [
  learning.toLearn,
  learning.itMeans,
  learning.seeResults,
  learning.seeTips,
  learning.doClearing,
];
const questions = `What can I help you with?
  1 - Learn new words
  2 - Check the word meaning
  3 - See the learned words list
  4 - Random language studying tips
  5 - Delete all the learning history
  6 - Exit an application`;

const menu = async () => {
  let selection = parseInt(
    (await question(`${questions}\nI'm interested in - `)) - 1
  );
  let answer = features[selection];
  if (answer) await answer();
  else process.exit();
};

const main = async () => {
  while (true) {
    await menu();
    const answer = await question('\nClear the menu? (yes/no/quit)\n');
    if (answer.toLowerCase() === 'yes') console.clear();
    else if (answer.toLowerCase() === 'quit') process.exit();
  }
};

main();
