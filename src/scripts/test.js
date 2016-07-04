'use strict'

import Promise from 'bluebird';
import _ from 'lodash';
import { SphereClient, Rest } from 'sphere-node-sdk';
import path from 'path';
import configMod from '../modules/config';
import loggerMod from '../modules/logger';

const app = {};

// Config
const config = app.config = configMod([
  process.env.EXTERNAL_CONFIG,
  path.join(__dirname, `../../config/${process.env.NODE_ENV || 'local'}.json`),
  path.join(__dirname, '../../config/defaults.json'),
]);

// Logger
const logger = app.logger = loggerMod(config);

const concurrency = config.get('concurrency') || 1;
logger.debug('Concurrency: %s', concurrency);

const client = new SphereClient({
  config: {
    client_id: config.get('sphereProjectConfig:clientId'),
    client_secret: config.get('sphereProjectConfig:clientSecret'),
    project_key: config.get('sphereProjectConfig:projectKey'),
  },
  host: config.get('sphereProjectConfig:apiHost'),
  oauth_host: config.get('sphereProjectConfig:oauthHost'),
});

const restClient = new Rest({
  config: {
    client_id: config.get('sphereProjectConfig:clientId'),
    client_secret: config.get('sphereProjectConfig:clientSecret'),
    project_key: config.get('sphereProjectConfig:projectKey'),
  },
  host: config.get('sphereProjectConfig:apiHost'),
  oauth_host: config.get('sphereProjectConfig:oauthHost'),
});
