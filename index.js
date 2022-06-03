'use strict';

const { question } = require('./promises.js');
const learning = require('./learning.js');
const meaning = require('./meaning.js');

const main = async () => {
  let selection = parseInt(
	  await question('1 - Learn new words 2 - Check the word meaning\n')
	);
	switch (selection) {
	  case 1:
	    learning.main();
	    break;
	  case 2:
	    meaning.main();
	    break;
	  default:
	    process.exit();
	    break;
	}
}

main();