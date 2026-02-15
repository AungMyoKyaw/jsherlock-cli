#!/usr/bin/env node
import meow from 'meow';

import { checker } from './checker';

const cli = meow(
  `
	Usage
	  $ jsherlock <input>

  Options
    --export-csv    Export results to a CSV file

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

(async (): Promise<void> => {
  try {
    await checker(userName, exportCsv);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Error: ${errorMessage}`);
    process.exit(1);
  }
})();
