[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# @pirxpilot/server-timings

This is a modernized fork of [server-timings]

## Usage

Load the middleware as early as possible to record the request timing:

```js
const express = require('express');
const app = express();
const timings = require('server-timings');

app.use(timings);
app.use(require('./routes'));
```

This will automatically add a `Server-Timing` header shown in milliseconds.

```bash
$ curl https://jsonbin.org/remy/urls -I
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Server-Timing: total; dur=72.45
```

To include additional timings the middleware exposes two methods on the `res.locals.timings` property:

- `start(label[, description])` - record the start time
- `end(label)` - end the record time - if this isn't called, it will be called when the request is finished

### Start/end as middleware

As well as being exposed in `res.locals.timings` you can also call start and end as middleware:

```js
app.use(timings);
app.use(timings.start('routing'));
app.use(require('./routes'));
app.use(timings.end('routing'));
```
[server-timings]: https://npmjs.org/package/server-timings

[npm-image]: https://img.shields.io/npm/v/@pirxpilot/server-timings
[npm-url]: https://npmjs.org/package/@pirxpilot/server-timings

[build-url]: https://github.com/pirxpilot/server-timings/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/server-timings/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@pirxpilot/server-timings
[deps-url]: https://libraries.io/npm/@pirxpilot%2Fserver-timings
