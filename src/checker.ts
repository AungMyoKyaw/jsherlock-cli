import jsherlock from 'jsherlock';

import chalk from 'chalk';
import ora from 'ora';

const log = console.log;

interface Istatus {
  userName: string;
  siteName: string;
  uri: string;
  exist: boolean;
}

let spinner: any;

const checker = async (userName: string, path?: string) => {
  const sherlockChecker = new jsherlock(userName);
  const sites = jsherlock.sites();

  log(chalk.greenBright.bold`
   __  ____  _  _  ____  ____  __     __    ___  __ _
 _(  )/ ___)/ )( \\(  __)(  _ \\(  )   /  \\  / __)(  / )
/ \\) \\\\___ \\) __ ( ) _)  )   // (_/\\(  O )( (__  )  (
\\____/(____/\\_)(_/(____)(__\\_)\\____/ \\__/  \\___)(__\\_)

`);

  //start spinner
  if (path) {
    spinner = ora({
      spinner: 'dots',
      color: 'green',
      text: 'JSHERLOCK'
    }).start();
  }

  const checking = await Promise.all(
    sites.map(async site => {
      const status: Istatus = await sherlockChecker.checkFor(site);
      if (path) {
        exporter(status, path);
      } else {
        display(status);
      }
      return status;
    })
  );

  //stop spinner
  if (path) {
    spinner.stop();
  }
};

const display = (status: Istatus): void => {
  const sign = status.exist ? '+' : '-';
  const { siteName, uri } = status;

  if (status.exist) {
    log(
      chalk`[{greenBright.bold ${sign}}] {greenBright.bold ${siteName}:} ${uri}`
    );
  } else {
    log(
      chalk`[{redBright.bold ${sign}}] {greenBright.bold ${siteName}:} {yellowBright.bold Not Found}`
    );
  }
};

const exporter = (status: Istatus, path: string): void => {
  const { siteName, uri } = status;
  //spinner
  spinner.text = `Checking for ${siteName}`;
};

export { checker };
