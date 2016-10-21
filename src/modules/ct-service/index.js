import { SphereClient } from 'sphere-node-sdk';

export default (config) => {
  const module = {};
  const client = new SphereClient({
    config: {
      client_id: config.get('sphereProjectConfig:clientId'),
      client_secret: config.get('sphereProjectConfig:clientSecret'),
      project_key: config.get('sphereProjectConfig:projectKey'),
    },
    host: config.get('sphereProjectConfig:apiHost'),
    oauth_host: config.get('sphereProjectConfig:oauthHost'),
  });

  module.getOneProduct = () => client.products.page(1).perPage(1).fetch();

  module.getAllProducts = () => {
    console.log(client.products);
    return client.productProjections
          .all()
          .staged(true)
          .fetch()
          .then((res) => {
            return res.body.results;
          });
  };

  module.getAllOrders = () => {
    console.log(client.orders);
    return client.orders
          .all()
          .fetch()
          .then((res) => {
            return res.body.results;
          });
  };

  return module;
};
