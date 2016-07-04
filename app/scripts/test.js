'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sphereNodeSdk = require('sphere-node-sdk');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../modules/config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('../modules/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = {};

// Config
const config = app.config = (0, _config2.default)([process.env.EXTERNAL_CONFIG, _path2.default.join(__dirname, `../../config/${ process.env.NODE_ENV || 'local' }.json`), _path2.default.join(__dirname, '../../config/defaults.json')]);

// Logger
const logger = app.logger = (0, _logger2.default)(config);

const concurrency = config.get('concurrency') || 1;
logger.debug('Concurrency: %s', concurrency);

const client = new _sphereNodeSdk.SphereClient({
  config: {
    client_id: config.get('sphereProjectConfig:clientId'),
    client_secret: config.get('sphereProjectConfig:clientSecret'),
    project_key: config.get('sphereProjectConfig:projectKey')
  },
  host: config.get('sphereProjectConfig:apiHost'),
  oauth_host: config.get('sphereProjectConfig:oauthHost')
});

const restClient = new _sphereNodeSdk.Rest({
  config: {
    client_id: config.get('sphereProjectConfig:clientId'),
    client_secret: config.get('sphereProjectConfig:clientSecret'),
    project_key: config.get('sphereProjectConfig:projectKey')
  },
  host: config.get('sphereProjectConfig:apiHost'),
  oauth_host: config.get('sphereProjectConfig:oauthHost')
});