'use strict';

const winston = require('winston');
const winstonPapertrail = require('winston-papertrail').Papertrail;

module.exports = (app) => {
  const config = app.config;
  const level = config.get('logger:level');

  const transports = [new (winston.transports.Console)({
    level,
    json: false,
    timestamp: true,
    colorize: true,
  })];

  const exceptionHandlers = [new (winston.transports.Console)({
    level,
    json: false,
    timestamp: true,
    colorize: true,
    silent: false,
    prettyPrint: true,
  })];

  if (config.get('papertrail') && config.get('papertrail:host')) {
    transports.push(new winston.transports.Papertrail({
      level,
      timestamp: true,
      colorize: true,
      host: config.get('papertrail:host'),
      port: config.get('papertrail:port'),
    }));

    exceptionHandlers.push(new winston.transports.Papertrail({
      level,
      timestamp: true,
      colorize: true,
      host: config.get('papertrail:host'),
      port: config.get('papertrail:port'),
    }));
  }

  const logger = new (winston.Logger)({
    transports,
    exceptionHandlers,
    exitOnError: false,
  });

  logger.info('[logger] initialized with [%s] level', level);

  return logger;
};
