const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { runTests } = require('./all-push-api');
const { version } = require('../package.json');

test('preserves the Bark code 400 exception without applying it to other platforms', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'platform-status-'));
  const output = path.join(directory, 'status.md');
  try {
    for (const [result, expected] of [
      [{ status: 100, data: { code: 400 } }, '✅️成功'],
      [{ status: 100, extraMessage: { data: { code: 400 } } }, '✅️成功'],
      [{ status: 200 }, '✅️成功'],
      [{ status: 100, data: { code: 500 } }, '❌️失败'],
      [{ status: 102 }, '❌️失败'],
      [undefined, '❌️失败']
    ]) {
      class FakePushApi {
        constructor([{ name }]) {
          this.name = name;
        }

        async send() {
          return [{ name: this.name, result }];
        }
      }
      const results = await runTests({ Bark: { token: 'test' }, Qmsg: { token: 'test' } }, FakePushApi, output);
      assert.equal(results.get('Bark'), expected);
      assert.equal(results.get('Qmsg'), result?.status === 200 ? '✅️成功' : '❌️失败');
      assert.ok(fs.readFileSync(output, 'utf8').includes(`[Bark](./services#bark) | ${expected}`));
    }
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('writes all platforms with success, failure and untested states without exposing secrets', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'platform-status-'));
  const output = path.join(directory, 'status.md');
  const attempted = [];
  class FakePushApi {
    constructor([{ name }]) {
      this.name = name;
      attempted.push(name);
      if (name === 'Mail') throw new Error('private-credential');
    }

    async send() {
      if (this.name === 'IGot') return [];
      if (this.name === 'PushMe') throw new Error('private-credential');
      return [{ name: this.name, result: { status: this.name === 'PushDeer' ? 200 : 102 } }];
    }
  }
  try {
    const results = await runTests({
      PushDeer: { token: 'private-credential' },
      Bark: { token: 'private-credential' },
      Mail: { user: 'private-credential' },
      PushMe: { token: 'private-credential' },
      IGot: { token: 'private-credential' },
      Qmsg: { token: '' }
    }, FakePushApi, output);
    const report = fs.readFileSync(output, 'utf8');
    assert.match(report, /PushDeer.*✅️成功/);
    for (const name of ['Bark', 'Mail', 'PushMe']) {
      assert.equal(results.get(name), '❌️失败');
      assert.ok(report.includes(`[${name}](./services#${name.toLowerCase()}) | ❌️失败`));
    }
    for (const name of ['Qmsg', 'IGot', 'Chanify', 'Custom', 'GoogleChat', 'RocketChat', 'GoCqhttp']) {
      assert.ok(report.includes(`[${name}](./services#${name.toLowerCase()}) | ⚠️无法测试`));
    }
    assert.ok(report.includes(version));
    assert.ok(!report.includes('private-credential'));
    assert.ok(!attempted.includes('Qmsg'));
    const platforms = [...fs.readFileSync(path.resolve(__dirname, '../docs/services.md'), 'utf8')
      .matchAll(/^## (\w+)\r?$/gm)];
    assert.equal(report.split('\n').filter((line) => line.startsWith('| [')).length, platforms.length);

    await runTests({}, FakePushApi, output);
    const emptyReport = fs.readFileSync(output, 'utf8');
    assert.ok(!emptyReport.includes('| ✅️成功'));
    assert.ok(!emptyReport.includes('| ❌️失败'));
    assert.equal(emptyReport.split('\n').filter((line) => line.endsWith('| ⚠️无法测试 |')).length, platforms.length);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
