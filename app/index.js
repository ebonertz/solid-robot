'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./modules/logger');

var _logger2 = _interopRequireDefault(_logger);

var _utils = require('./modules/utils');

var _utils2 = _interopRequireDefault(_utils);

var _ctService = require('./modules/ct-service');

var _ctService2 = _interopRequireDefault(_ctService);

var _config = require('./modules/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = {};

// Config
const config = app.config = (0, _config2.default)([process.env.EXTERNAL_CONFIG, _path2.default.join(__dirname, `../config/${ process.env.NODE_ENV || 'local' }.json`), _path2.default.join(__dirname, '../config/defaults.json')]);

// Logger
const logger = app.logger = (0, _logger2.default)(config);

// Utils
app.utils = (0, _utils2.default)();

// CT service
app.ctService = (0, _ctService2.default)(config, logger);

const concurrency = config.get('concurrency') || 1;
logger.debug('Concurrency: %s', concurrency);

if (process.env.NODE_ENV !== 'test') {
  // Your code here
}

exports.default = app;