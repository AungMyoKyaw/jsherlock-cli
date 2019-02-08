#!/usr/bin/env node
import meow from 'meow';

import { checker } from './checker';

const cli = meow(
  `
	Usage
	  $ jsherlock <input>

  Options
    --export-csv='~/Desktop/jsherlock.csv'

	Examples
	  $ jsherlock zuck
	  $ jsherlock zuck --export-csv='~/Desktop/jsherlock.csv'
`,
  {
    flags: {
      'export-csv': {
        type: 'string'
      }
    }
  }
);

const userName = cli.input[0];
const { exportCsv } = cli.flags;

if (!userName) {
  cli.showHelp(0);
}

checker(userName, exportCsv);
