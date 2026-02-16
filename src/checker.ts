import jsherlock from 'jsherlock';
import * as fs from 'fs';

import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { parse as json2csv } from 'json2csv';

const log = console.log;

interface IStatus {
  userName: string;
  siteName: string;
  uri: string;
  exist: boolean;
}

let spinner: Ora | undefined;

const checker = async (userName: string, path?: string): Promise<void> => {
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

  const status: IStatus[] = await Promise.all(
    sites.map(async site => {
      const siteStatus: IStatus = await sherlockChecker.checkFor(site);
      if (path && spinner) {
        //spinner
        spinner.text = `Checking for ${siteStatus.siteName}`;
      } else {
        display(siteStatus);
      }
      return siteStatus;
    })
  );

  //stop spinner & export to csv
  if (path && spinner) {
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

const display = (status: IStatus): void => {
  const { siteName } = status;
  const sign = status.exist ? '+' : '-';
  const uri = status.exist ? `white ${status.uri}` : 'yellowBright.bold Not Found';

  log(
    chalk`[{greenBright.bold ${sign}}] {greenBright.bold ${siteName}:} {${uri}}`
  );
};

const exporter = async (status: IStatus[], path: string): Promise<void> => {
  const sortedStatus = Sorter.availability(status);
  const fields = ['userName', 'siteName', 'exist', 'uri'];
  const opts = { fields };
  try {
    const csv = json2csv(sortedStatus, opts);
    fs.writeFileSync(path, csv, 'utf8');
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Failed to export CSV: ${err.message}`);
    }
    throw err;
  }
};

class Sorter {
  static availability(status: IStatus[]): IStatus[] {
    return status.sort((prev, cur) => {
      const prevStatus = prev.exist ? 0 : 1;
      const curStatus = cur.exist ? 0 : 1;
      //true come first
      return prevStatus - curStatus;
    });
  }
}

export { checker };
