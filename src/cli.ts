#!/usr/bin/env node
import meow from 'meow';

import { checker } from './checker';

const cli = meow(
  `
	Usage
	  $ jsherlock <input>

  Options
    --export-csv='jsherlock.csv'

	Examples
	  $ jsherlock zuck
	  $ jsherlock zuck --export-csv='jsherlock.csv'
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
