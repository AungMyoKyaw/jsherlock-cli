import execa from 'execa';
import * as assert from 'assert';

import 'mocha';

const cliPath = `${process.env.PWD}/src/cli.ts`;

describe('JSHERLOCK-CLI', () => {
  it('SHOULD RETURN HELP', done => {
    (async () => {
      try {
        const { stdout } = await execa.shell(`ts-node ${cliPath}`);
        assert.equal(stdout.includes('Examples'), true);
        done();
      } catch (e) {
        done(e);
      }
    })();
  });

  it('SHOULD RETURN USERNAME AVAILABILITY', done => {
    (async () => {
      try {
        const { stdout } = await execa.shell(`ts-node ${cliPath} zuck`);
        assert.equal(stdout.includes('facebook'), true);
        done();
      } catch (e) {
        done(e);
      }
    })();
  });
});
