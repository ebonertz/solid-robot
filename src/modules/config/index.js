import path from 'path';
import fs from 'fs';
import ironWorker from 'iron_worker';
import yaml from 'js-yaml';
import conf from 'nconf';


export default (stores) => {
  const storesFiles = stores || {};
  const env = process.env.NODE_ENV = process.env.NODE_ENV || 'local';
  const rootPath = path.normalize(`${__dirname}/../..`);

  console.log('%s - \u001b[32minfo\u001b[39m: [config] using [%s] configuration',
    new Date().toISOString(), env);


  //  Hierarchy
  //
  //  1. Config from iron.io
  //  2. Environment variables
  //  3. Arguments
  //  4. ConfigFiles
  conf.overrides(yaml.safeLoad(ironWorker.config()));
  conf.env('_');
  conf.argv();

  let i = 1;
  storesFiles.forEach((configFile) => {
    let file = configFile;

    if (file) {
      if (fs.existsSync(file)) {
        if (file.indexOf('/') !== 0) {
          file = `${rootPath}/${file}`;
        }
        file = path.normalize(file);
        console.log('%s - \u001b[32minfo\u001b[39m: [config] using file [%s]',
          new Date().toISOString(),
          file);
        try {
          if (!fs.existsSync(file)) {
            throw new Error('File doesn\'t exist');
          }
          const obj = {
            type: 'file',
            file,
          };
          conf.use(`z${i++}`, obj);
        } catch (e) {
          console.log('%s - \u001b[31merror\u001b[39m: [config] file [%s] error [%s]',
            new Date().toISOString(),
            file,
            e.message);
        }
      } else {
        console.log('%s - \u001b[31mwarn\u001b[39m: [config] file [%s] not exists',
          new Date().toISOString(),
          file);
      }
    }
  });

  conf.set('env', env);
  conf.set('rootPath', rootPath);

  return conf;
};
