'use strict'

const app = {};
const Promise = require('bluebird');
const _ = require('lodash');

// Config
const config = require('./modules/config')(app, [
  process.env.EXTERNAL_CONFIG
  , './config/' + (process.env.NODE_ENV || 'local') + '.json'
  , './config/defaults.json'
]);

// Logger
const logger = require('./modules/logger')(app);

// Utils
const utils = require('./modules/utils')(app);

// CT service
const ctService = require('./modules/ct-service')(app);

const concurrency = config.get("concurrency") || 1;
logger.debug("Concurrency: %s", concurrency);


if (process.env.NODE_ENV !== "test") {
  // Your code here
}

module.exports = app;