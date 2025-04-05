const { test } = require('node:test');
const { setTimeout } = require('node:timers/promises');

const { makeTimings } = require('../lib/timings');

test('timings', async t => {
  await t.test('withou description', async t => {
    const tm = makeTimings();
    const key = 'test';
    tm.start(key);
    await setTimeout(11);
    const delta = tm.end(key);
    t.assert.ok(delta >= 10, `${delta} >= 10`);
    t.assert.match(tm.header(), /^test; dur=\d\d\.\d\d$/);
  });

  await t.test('with description', async t => {
    const tm = makeTimings();
    const key = 'test';
    tm.start(key, 'test description');
    await setTimeout(11);
    const delta = tm.end(key);
    t.assert.ok(delta >= 10, `${delta} >= 10`);
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
    await setTimeout(11);
    const delta1 = tm.end(key1);
    t.assert.ok(delta1 >= 10, `${delta1} >= 10`);
    await setTimeout(6);
    const delta2 = tm.end(key2);
    t.assert.ok(delta2 >= 15, `${delta2} >= 15`);
    t.assert.match(
      tm.header(),
      /^test1; dur=\d\d\.\d\d; desc="a", test2; dur=\d\d\.\d\d$/
    );
  });
});
