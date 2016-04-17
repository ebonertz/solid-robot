'use strict'

const Promise = require('bluebird');
const _ = require('lodash');
const SphereClient = require('sphere-node-sdk').SphereClient;
const SphereRest = require('sphere-node-sdk').Rest;


const app = {};

// Configuration object
require('./../modules/config')(app, [
  process.env.EXTERNAL_CONFIG
  , __dirname + '/../config/' + (process.env.NODE_ENV || 'local') + '.json'
  , __dirname + '/../config/defaults.json'
]);

// Logger
const logger = require('../modules/logger')(app);

const client = new SphereClient({
  config: {
    client_id: config.get("sphereProjectConfig:clientId"),
    client_secret: config.get("sphereProjectConfig:clientSecret"),
    project_key: config.get("sphereProjectConfig:projectKey")
  },
  host: config.get("sphereProjectConfig:apiHost"),
  oauth_host: config.get("sphereProjectConfig:oauthHost")
});

const restClient = new SphereRest({
  config: {
    client_id: config.get("sphereProjectConfig:clientId"),
    client_secret: config.get("sphereProjectConfig:clientSecret"),
    project_key: config.get("sphereProjectConfig:projectKey")
  },
  host: config.get("sphereProjectConfig:apiHost"),
  oauth_host: config.get("sphereProjectConfig:oauthHost")
});





