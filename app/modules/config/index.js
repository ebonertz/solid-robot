'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _iron_worker = require('iron_worker');

var _iron_worker2 = _interopRequireDefault(_iron_worker);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = stores => {
  const storesFiles = stores || {};
  const env = process.env.NODE_ENV = process.env.NODE_ENV || 'local';
  const rootPath = _path2.default.normalize(`${ __dirname }/../..`);

  console.log('%s - \u001b[32minfo\u001b[39m: [config] using [%s] configuration', new Date().toISOString(), env);

  //  Hierarchy
  //
  //  1. Config from iron.io
  //  2. Environment variables
  //  3. Arguments
  //  4. ConfigFiles
  _nconf2.default.overrides(_jsYaml2.default.safeLoad(_iron_worker2.default.config()));
  _nconf2.default.env('_');
  _nconf2.default.argv();

  let i = 1;
  storesFiles.forEach(configFile => {
    let file = configFile;

    if (file) {
      if (_fs2.default.existsSync(file)) {
        if (file.indexOf('/') !== 0) {
          file = `${ rootPath }/${ file }`;
        }
        file = _path2.default.normalize(file);
        console.log('%s - \u001b[32minfo\u001b[39m: [config] using file [%s]', new Date().toISOString(), file);
        try {
          if (!_fs2.default.existsSync(file)) {
            throw new Error('File doesn\'t exist');
          }
          const obj = {
            type: 'file',
            file: file
          };
          _nconf2.default.use(`z${ i++ }`, obj);
        } catch (e) {
          console.log('%s - \u001b[31merror\u001b[39m: [config] file [%s] error [%s]', new Date().toISOString(), file, e.message);
        }
      } else {
        console.log('%s - \u001b[31mwarn\u001b[39m: [config] file [%s] not exists', new Date().toISOString(), file);
      }
    }
  });

  _nconf2.default.set('env', env);
  _nconf2.default.set('rootPath', rootPath);

  return _nconf2.default;
};