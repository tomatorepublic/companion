'use strict';

const { question } = require('./promises.js');
const learning = require('./learning.js');
const meaning = require('./meaning.js');

const features = [learning.main, meaning.main];
const questions = `What can I help you with?
  1 - Learn new words
  2 - Check the word meaning
  3 - Exit an application`;

const main = async () => {
  let selection = parseInt(
	  (await question(`${questions}\nI'm interested in - `)) - 1
	);
	let answer = features[selection];
	if (answer) answer();
	else process.exit();
}

main();