import path from 'path';
import loggerModule from './modules/logger';
import utilsModule from './modules/utils';
import ctServiceModule from './modules/ct-service';
import configModule from './modules/config';

const app = {};

// Config
const config = app.config = configModule([
  process.env.EXTERNAL_CONFIG,
  path.join(__dirname, `../config/${process.env.NODE_ENV || 'local'}.json`),
  path.join(__dirname, '../config/defaults.json'),
]);

// Logger
const logger = app.logger = loggerModule(config);

// Utils
app.utils = utilsModule();

// CT service
app.ctService = ctServiceModule(config, logger);

const concurrency = config.get('concurrency') || 1;
logger.debug('Concurrency: %s', concurrency);


if (process.env.NODE_ENV !== 'test') {
  // Your code here
}

export default app;
