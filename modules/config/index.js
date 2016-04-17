'use strict';

const path = require('path')
  , fs = require('fs')
  , iron_worker = require('iron_worker')
  , yaml = require('js-yaml');


module.exports = function (app, stores) {
  stores = stores || {};

  let env = process.env.NODE_ENV = process.env.NODE_ENV || 'local';
  let rootPath = path.normalize(__dirname + '/../..');

  let conf = app.config = require('nconf');

  console.log('%s - \u001b[32minfo\u001b[39m: [config] using [%s] configuration', new Date().toISOString(), env);


  //  Hierarchy
  //
  //  1. Config from iron.io
  //  2. Environment variables
  //  3. Arguments
  //  4. ConfigFiles
  conf.overrides(yaml.safeLoad(iron_worker.config()));
  conf.env('_');
  conf.argv();

  let i = 1;
  stores.forEach(function (file) {
    if (file && fs.existsSync(file)) {
      if (file.indexOf('/') != 0) {
        file = rootPath + '/' + file;
      }
      file = path.normalize(file);
      console.log('%s - \u001b[32minfo\u001b[39m: [config] using file [%s]', new Date().toISOString(), file);
      try {
        if (!fs.existsSync(file)) {
          throw new Error('File doesn\'t exist');
        }
        conf.use('z' + i++, {type: 'file', file: file});
      } catch (e) {
        console.log('%s - \u001b[31merror\u001b[39m: [config] file [%s] error [%s]', new Date().toISOString(), file, e.message);
      }
    } else {
      if (file) {
        console.log('%s - \u001b[31mwarn\u001b[39m: [config] file [%s] not exists', new Date().toISOString(), file);
      }
    }
  });

  conf.set('env', env);
  conf.set('rootPath', rootPath);

  return conf;
}