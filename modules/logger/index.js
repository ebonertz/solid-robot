'use strict';

const winston = require('winston');
require('winston-papertrail').Papertrail;

module.exports = (app) => {
  const config = app.config;
  const level = config.get('logger:level');

  let transports = [new (winston.transports.Console)({
    level: level,
    json: false,
    timestamp: true,
    colorize: true
  })];

  let exceptionHandlers = [new (winston.transports.Console)({
    level: level,
    json: false,
    timestamp: true,
    colorize: true,
    silent: false,
    prettyPrint: true
  })];

  if (config.get("papertrail") && config.get("papertrail:host")) {
    transports.push(new winston.transports.Papertrail({
      level: level,
      timestamp: true,
      colorize: true,
      host: config.get("papertrail:host"),
      port: config.get("papertrail:port")
    }));

    exceptionHandlers.push(new winston.transports.Papertrail({
      level: level,
      timestamp: true,
      colorize: true,
      host: config.get("papertrail:host"),
      port: config.get("papertrail:port")
    }));
  }

  let logger = app.logger = new (winston.Logger)({
    transports: transports,
    exceptionHandlers: exceptionHandlers,
    exitOnError: false
  });

  logger.info('[logger] initialized with [%s] level', level);

  return logger;
}
