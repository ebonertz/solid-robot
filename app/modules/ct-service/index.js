'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sphereNodeSdk = require('sphere-node-sdk');

exports.default = config => {
  const module = {};
  const client = new _sphereNodeSdk.SphereClient({
    config: {
      client_id: config.get('sphereProjectConfig:clientId'),
      client_secret: config.get('sphereProjectConfig:clientSecret'),
      project_key: config.get('sphereProjectConfig:projectKey')
    },
    host: config.get('sphereProjectConfig:apiHost'),
    oauth_host: config.get('sphereProjectConfig:oauthHost')
  });

  module.getOneProduct = () => client.products.page(1).perPage(1).fetch();

  return module;
};