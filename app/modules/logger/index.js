'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _winstonPapertrail = require('winston-papertrail');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = config => {
  const level = config.get('logger:level');

  const transports = [new _winston2.default.transports.Console({
    level: level,
    json: false,
    timestamp: true,
    colorize: true
  })];

  const exceptionHandlers = [new _winston2.default.transports.Console({
    level: level,
    json: false,
    timestamp: true,
    colorize: true,
    silent: false,
    prettyPrint: true
  })];

  if (config.get('papertrail') && config.get('papertrail:host')) {
    transports.push(new _winstonPapertrail.Papertrail({
      level: level,
      timestamp: true,
      colorize: true,
      host: config.get('papertrail:host'),
      port: config.get('papertrail:port')
    }));

    exceptionHandlers.push(new _winstonPapertrail.Papertrail({
      level: level,
      timestamp: true,
      colorize: true,
      host: config.get('papertrail:host'),
      port: config.get('papertrail:port')
    }));
  }

  const logger = new _winston2.default.Logger({
    transports: transports,
    exceptionHandlers: exceptionHandlers,
    exitOnError: false
  });

  logger.info('[logger] initialized with [%s] level', level);

  return logger;
};