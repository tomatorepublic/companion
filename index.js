'use strict';

const { question } = require('./promises.js');
const learning = require('./learning.js');
const meaning = require('./meaning.js');

const features = [learning.main, meaning.main];

const main = async () => {
  let selection = parseInt(
	  (await question('1 - Learn new words 2 - Check the word meaning\n')) - 1
	);
	let answer = features[selection];
	if (answer) answer();
	else process.exit();
}

main();