import jsherlock from 'jsherlock';

import chalk from 'chalk';

const log = console.log;

const checker = (userName: string) => {
  const sherlockChecker = new jsherlock(userName);
  const sites = jsherlock.sites();

  log(chalk.greenBright.bold`
   __  ____  _  _  ____  ____  __     __    ___  __ _
 _(  )/ ___)/ )( \\(  __)(  _ \\(  )   /  \\  / __)(  / )
/ \\) \\\\___ \\) __ ( ) _)  )   // (_/\\(  O )( (__  )  (
\\____/(____/\\_)(_/(____)(__\\_)\\____/ \\__/  \\___)(__\\_)

`);

  sites.forEach(async site => {
    const status = await sherlockChecker.checkFor(site);
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
    // console.log(sign, ' ', siteName, uri);
  });
};

export { checker };
