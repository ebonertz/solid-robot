import path from 'path';
import loggerModule from './modules/logger';
import utilsModule from './modules/utils';
import ctServiceModule from './modules/ct-service';
import configModule from './modules/config';

const app = {};

// Config
const config = app.config = configModule([
  process.env.EXTERNAL_CONFIG,
  path.join(__dirname, `../config/${process.env.NODE_ENV || 'development'}.json`),
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
  // Get products method
  app.ctService.getAllProducts()
    .each((product) => {
      logger.info('Product: ${product.name.en}');
      console.log(JSON.stringify(product));
    });
  // Get orders method
  app.ctService.getAllOrders()
    .each((order) => {
      logger.info('Order: ${orders.id}');
      console.log(JSON.stringify(order));
    }).then(() => {
      setTimeout(() => {
        logger.info('Process sucessfully finished. Nice Work Champ. Peace Im Out');
        process.exit(0);
      }, 1000);
    });
}

export default app;
