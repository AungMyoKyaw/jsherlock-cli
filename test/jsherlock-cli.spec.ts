import execa from 'execa';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import 'mocha';

const cliPath = path.join(__dirname, '../src/cli.ts');
const testOutputDir = path.join(__dirname, '../test-output');

describe('JSHERLOCK-CLI', () => {
  before(() => {
    // Create test output directory if it doesn't exist
    if (!fs.existsSync(testOutputDir)) {
      fs.mkdirSync(testOutputDir, { recursive: true });
    }
  });

  after(() => {
    // Clean up test output directory
    if (fs.existsSync(testOutputDir)) {
      const files = fs.readdirSync(testOutputDir);
      files.forEach(file => {
        fs.unlinkSync(path.join(testOutputDir, file));
      });
      fs.rmdirSync(testOutputDir);
    }
  });

  it('SHOULD RETURN HELP', done => {
    (async () => {
      try {
        const { stdout } = await execa('ts-node', [cliPath]);
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
        const { stdout } = await execa('ts-node', [cliPath, 'zuck']);
        assert.equal(stdout.includes('facebook'), true);
        done();
      } catch (e) {
        done(e);
      }
    })();
  });

  it('SHOULD EXPORT CSV', done => {
    (async () => {
      try {
        const outputPath = path.join(testOutputDir, 'test-output.csv');
        const { stdout } = await execa('ts-node', [
          cliPath,
          'zuck',
          `--export-csv=${outputPath}`
        ]);
        assert.equal(fs.existsSync(outputPath), true);
        done();
      } catch (e) {
        done(e);
      }
    })();
  });
});
