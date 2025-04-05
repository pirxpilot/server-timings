const onHeaders = require('on-headers');
const { makeTimings } = require('./lib/timings');

module.exports = serverTimings;

function serverTimings(_req, res, next) {
  const tms = makeTimings();
  tms.start('total');

  res.locals ??= {};
  res.locals.timings = tms;

  onHeaders(res, () => res.appendHeader('Server-Timing', tms.header()));
  next();
}

serverTimings.start = start;
serverTimings.end = end;

function start(...args) {
  return function (_req, res, next) {
    res.locals?.timings?.start(...args);
    next();
  };
}

function end(...args) {
  return function (_req, res, next) {
    res.locals?.timings?.end(...args);
    next();
  };
}
