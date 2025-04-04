exports.makeTimings = makeTimings;

function makeTimings() {
  const timings = {};

  return {
    start,
    end,
    header
  };

  function header() {
    return Object.keys(timings).map(entry).join(', ');
  }

  function entry(key) {
    const dur = end(key).toFixed(2);
    const { desc } = timings[key];
    const t = `${key}; dur=${dur}`;
    return desc ? `${t}; desc="${desc}"` : t;
  }

  function start(key, desc) {
    const start = process.hrtime.bigint();
    timings[key] = {
      start,
      desc,
      delta: 0
    };
    return start;
  }

  function end(key) {
    const tm = timings[key];
    if (!tm) {
      return;
    }
    if (tm.delta === 0) {
      const nanoDelta = Number(process.hrtime.bigint() - tm.start);
      tm.delta = nanoDelta / 1e6; // convert to milliseconds
    }
    return tm.delta;
  }
}
