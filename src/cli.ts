#!/usr/bin/env node
import meow from 'meow';

import { checker } from './checker';

const cli = meow(`
	Usage
	  $ jsherlock <input>

	Examples
	  $ jsherlock zuck
`);

const userName = cli.input[0];

if (!userName) {
  cli.showHelp();
}

checker(userName);
