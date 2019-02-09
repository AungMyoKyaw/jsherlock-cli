import jsherlock from 'jsherlock';
import * as fs from 'fs';

import chalk from 'chalk';
import ora from 'ora';
import { parse as json2csv } from 'json2csv';

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

  //banner
  banner();

  //start spinner
  if (path) {
    spinner = ora({
      spinner: 'dots',
      color: 'green',
      text: 'JSHERLOCK'
    }).start();
  }

  const status: Istatus[] = await Promise.all(
    sites.map(async site => {
      const siteStatus: Istatus = await sherlockChecker.checkFor(site);
      if (path) {
        //spinner
        spinner.text = `Checking for ${siteStatus.siteName}`;
      } else {
        display(siteStatus);
      }
      return siteStatus;
    })
  );

  //stop spinner & export to csv
  if (path) {
    await exporter(status, path);
    spinner.succeed(`Exported to => ${path}`);
  }
};

const banner = (): void => {
  //jsherlock logo
  log(chalk.greenBright.bold`
   ___      _               _            _
  |_  |    | |             | |          | |
    | | ___| |__   ___ _ __| | ___   ___| | __
    | |/ __| '_ \\ / _ \\ '__| |/ _ \\ / __| |/ /
/\\__/ /\\__ \\ | | |  __/ |  | | (_) | (__|   <
\\____/ |___/_| |_|\\___|_|  |_|\\___/ \\___|_|\\_\\
`);
};

const display = (status: Istatus): void => {
  const { siteName } = status;
  const sign = status.exist == true ? '+' : '-';
  let { uri } = status;
  uri = status.exist == true ? `white ${uri}` : `yellowBright.bold Not Found`;

  log(
    chalk`[{greenBright.bold ${sign}}] {greenBright.bold ${siteName}:} {${uri}}`
  );
};

const exporter = async (status: Istatus[], path: string) => {
  status = sorter.availability(status);
  const fields = ['userName', 'siteName', 'exist', 'uri'];
  const opts = { fields };
  try {
    const csv = json2csv(status, opts);
    fs.writeFileSync(path, csv, 'utf8');
  } catch (err) {
    throw err;
  }
};

class sorter {
  static availability(status: Istatus[]): Istatus[] {
    status = status.sort((prev, cur) => {
      const prevStatus = prev.exist ? 0 : 1;
      const curStatus = cur.exist ? 0 : 1;
      //true come first
      return prevStatus - curStatus;
    });

    return status;
  }
}

export { checker };
