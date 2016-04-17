'use strict';

const app = {};
const Promise = require('bluebird');
const _ = require('lodash');
const path = require('path');

// Config
const config = app.config = require('./modules/config')(app, [
  process.env.EXTERNAL_CONFIG,
  path.join(__dirname, `./config/${process.env.NODE_ENV || 'local'}.json`),
  path.join(__dirname, './config/defaults.json'),
]);

// Logger
const logger = app.logger = require('./modules/logger')(app);

// Utils
const utils = app.utils = require('./modules/utils')(app);

// CT service
const ctService = app.ctService = require('./modules/ct-service')(app);

const concurrency = config.get('concurrency') || 1;
logger.debug('Concurrency: %s', concurrency);


if (process.env.NODE_ENV !== 'test') {
  // Your code here
}

module.exports = app;
