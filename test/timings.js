const { test } = require('node:test');
const { setTimeout } = require('node:timers/promises');

const { makeTimings } = require('../lib/timings');

test('timings', async t => {
  await t.test('withou description', async t => {
    const tm = makeTimings();
    const key = 'test';
    tm.start(key);
    await setTimeout(10);
    const delta = tm.end(key);
    t.assert.ok(delta >= 9, `${delta} >= 9`);
    t.assert.match(tm.header(), /^test; dur=\d\d\.\d\d$/);
  });

  await t.test('with description', async t => {
    const tm = makeTimings();
    const key = 'test';
    tm.start(key, 'test description');
    await setTimeout(10);
    const delta = tm.end(key);
    t.assert.ok(delta >= 9, `${delta} >= 9`);
    t.assert.match(
      tm.header(),
      /^test; dur=\d\d\.\d\d; desc="test description"$/
    );
  });

  await t.test('multiple timings', async t => {
    const tm = makeTimings();
    const key1 = 'test1';
    const key2 = 'test2';
    tm.start(key1, 'a');
    tm.start(key2);
    await setTimeout(10);
    const delta1 = tm.end(key1);
    t.assert.ok(delta1 >= 9, `${delta1} >= 9`);
    await setTimeout(5);
    const delta2 = tm.end(key2);
    t.assert.ok(delta2 >= 14, `${delta2} >= 14`);
    t.assert.match(
      tm.header(),
      /^test1; dur=\d\d\.\d\d; desc="a", test2; dur=\d\d\.\d\d$/
    );
  });
});
