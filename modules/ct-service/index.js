'use strict';

const SphereClient = require('sphere-node-sdk').SphereClient;
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = (app) => {
  const module = app.ctService = {};
  const config = app.config;
  const logger = app.logger;
  const utils = app.utils;

  const client = app.ctService.client = new SphereClient({
    config: {
      client_id: config.get("sphereProjectConfig:clientId"),
      client_secret: config.get("sphereProjectConfig:clientSecret"),
      project_key: config.get("sphereProjectConfig:projectKey")
    },
    host: config.get("sphereProjectConfig:apiHost"),
    oauth_host: config.get("sphereProjectConfig:oauthHost")
  });

  return module;
}