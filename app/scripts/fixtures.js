'use strict';

const app = {};
const SphereClient = require('sphere-node-sdk').SphereClient;
const program = require('commander');
const _ = require('lodash');
const rest = require('restler');
const chance = require('chance').Chance();
const path = require('path');
const Promise = require('bluebird');

// Config
const config = app.config = require('../modules/config')(app, [process.env.EXTERNAL_CONFIG, path.join(__dirname, `../config/${ process.env.NODE_ENV || 'local' }.json`), path.join(__dirname, '../config/defaults.json')]);

const splashbaseUrl = "http://www.splashbase.co/api/v1/images/random";
const client = new SphereClient({
  config: {
    client_id: config.get("sphereProjectConfig:clientId"),
    client_secret: config.get("sphereProjectConfig:clientSecret"),
    project_key: config.get("sphereProjectConfig:projectKey")
  },
  host: config.get("sphereProjectConfig:apiHost"),
  oauth_host: config.get("sphereProjectConfig:oauthHost")
});

let getSequenceNewValue = function getSequenceNewValue(sequence) {
  return client.customObjects.where('key="' + sequence + '"').fetch().then(function (res) {
    return res.body.results;
  }).then(function (results) {
    if (!_.isEmpty(results)) {
      return _.first(results);
    } else if (config && config.sequence) {
      return {
        value: config.sequence
      };
    } else {
      return {
        value: 1000000
      };
    }
  }).then(function (lastValue) {
    return {
      value: lastValue.value + 1,
      version: lastValue.version
    };
  }).then(function (newValue) {
    return client.customObjects.save({
      container: sequence,
      key: sequence,
      value: newValue.value,
      version: newValue.version
    }).then(function (res) {
      return res.body.value;
    }).catch(function () {
      return getSequenceNewValue(sequence);
    });
  });
};

let getNewAddress = function getNewAddress() {
  let salutation = chance.prefix({ gender: "female" });
  let firstName = chance.first({ gender: "female" });
  let lastName = chance.last();
  let streetName = chance.street();
  let streetNumber = getRandomNumber(1, 100).toString();
  let email = firstName + getRandomNumber(1, 100).toString() + "@devgurus.io";
  let postalCode = chance.zip();
  let city = chance.city();
  let state = chance.state();
  let country = "US";
  let company = "devgurus.io";
  let apartment = getRandomNumber(1, 20).toString();
  let phone = chance.phone();

  let address = {
    salutation: salutation,
    firstName: firstName,
    lastName: lastName,
    streetName: streetName,
    streetNumber: streetNumber,
    postalCode: postalCode,
    city: city,
    state: state,
    country: country,
    company: company,
    apartment: apartment,
    phone: phone,
    email: email
  };

  return address;
};

let getNewOrder = function getNewOrder() {
  return getLineItems().then(function (lineItems) {
    let address = getNewAddress();

    return client.taxCategories.fetch().then(res => {
      if (res.body.results.length > 0) {
        return res.body.results[0];
      } else {
        return Promise.reject("Please create at least a tax category in the project");
      }
    }).then(taxCategory => {
      return getSequenceNewValue("orderNumberSequence").then(function (orderNumber) {
        return {
          orderNumber: orderNumber.toString(),
          //customerEmail: address.email,
          //customerId: "d6c1b7c1-962a-4f49-a5b5-a6665539166d",
          lineItems: lineItems,
          totalPrice: {
            currencyCode: _.first(lineItems).price.value.currencyCode,
            centAmount: _.reduce(lineItems, function (sum, lineItem) {
              return sum + lineItem.price.value.centAmount * lineItem.quantity;
            }, 0)
          },
          shippingAddress: address,
          billingAddress: address,
          orderState: 'Complete',
          shipmentState: 'Shipped',
          paymentState: 'Paid',
          shippingInfo: {
            shippingMethodName: "UPS Express",
            price: {
              currencyCode: "USD",
              centAmount: 1000
            },
            shippingRate: {
              price: {
                currencyCode: "USD",
                centAmount: 1000
              }
            },
            taxRate: {
              id: "tax_id1",
              name: "tax_id1",
              amount: 0,
              includedInPrice: true,
              country: "US"
            },
            taxCategory: {
              typeId: "tax-category",
              id: taxCategory.id
            }
          },
          completedAt: new Date().toISOString()
        };
      });
    });
  });
};

let getNewCustomer = function getNewCustomer() {
  let address = getNewAddress();

  return getSequenceNewValue("customerNumberSequence").then(function (customerNumber) {
    return {
      "customerNumber": customerNumber.toString(),
      "email": address.email,
      "firstName": address.firstName,
      "lastName": address.lastName,
      "password": "rkRcbAHpHGyHGJd3qDn0EZ/XozoSKrAw1IdZA29H4F0=$IUv/x/RLZa6aWrUOFEkTbOmzppQ2LvFV1yfH1wHldKc=",
      "title": address.salutation,
      "addresses": [address],
      "defaultBillingAddress": 0,
      "defaultShippingAddress": 0
    };
  });
};

let getNewProduct = function getNewProduct(productTypeId, currencyCode) {
  return client.taxCategories.fetch().then(res => {
    if (res.body.results.length > 0) {
      return res.body.results[0];
    } else {
      return Promise.reject("Please create at least a tax category in the project");
    }
  }).then(taxCategory => {
    let productName = getRandomProductName(1, 10000);
    let product = {
      "name": {
        "en": productName
      },
      "slug": {
        "en": productName + "-slug"
      },
      "description": {
        "en": "Sample product from fixtures.js"
      },
      "productType": {
        "typeId": "product-type",
        "id": productTypeId
      },
      "masterVariant": {
        "sku": productName + "-sku",
        "prices": [{
          "value": {
            "currencyCode": currencyCode,
            "centAmount": getRandomNumber(1, 100) * 100
          }
        }]
      },
      "taxCategory": {
        "typeId": 'tax-category',
        "id": taxCategory.id
      }
    };

    return new Promise(function (resolve, reject) {
      rest.get(splashbaseUrl, {
        query: "images_only=true"
      }).on("complete", function (image) {
        product.masterVariant.images = [{
          "url": image.url,
          "dimensions": {
            "w": 1400,
            "h": 1400
          }
        }];
        return resolve(product);
      });
    });
  });
};

let getRandomProductName = function getRandomProductName(min, max) {
  return "Product-" + getRandomNumber(min, max).toString();
};

let getLineItem = function getLineItem(product) {
  let variantSku;
  let variants = product.masterData.current.variants;

  if (!_.isEmpty(variants)) {
    let number = getRandomNumber(1, 10);
    if (number % 2 === 0) {
      // even
      variantSku = product.masterData.current.masterVariant.sku;
    } else {
      let variantIndex = getRandomNumber(0, variants.length - 1);
      variantSku = variants[variantIndex].sku;
    }
  } else {
    variantSku = product.masterData.current.masterVariant.sku;
  }

  return {
    name: {
      en: product.masterData.current.name.en
    },
    variant: {
      sku: variantSku
    },
    price: {
      value: {
        currencyCode: product.masterData.current.masterVariant.prices[0].value.currencyCode,
        centAmount: product.masterData.current.masterVariant.prices[0].value.centAmount
      }
    },
    quantity: getRandomNumber(1, 5)
  };
};

let getCartLineItem = function getCartLineItem(product) {
  let variantId;
  let variants = product.masterData.current.variants;

  if (!_.isEmpty(variants)) {
    let number = getRandomNumber(1, 10);
    if (number % 2 === 0) {
      // even
      variantId = product.masterData.current.masterVariant.id;
    } else {
      let variantIndex = getRandomNumber(0, variants.length - 1);
      variantId = variants[variantIndex].id;
    }
  } else {
    variantId = product.masterData.current.masterVariant.id;
  }

  return {
    productId: product.id,
    variantId: variantId,
    quantity: getRandomNumber(1, 5)
  };
};

let getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getLineItems = function getLineItems() {
  let lineItems = [];
  let productsCount = 2;

  return client.products.page(1).perPage(1).fetch().then(function (res) {
    return res.body.total;
  }).then(function (totalProducts) {
    let page;
    let perPage = productsCount;

    if (productsCount >= totalProducts) {
      page = 1;
    } else {
      let maxPage = Math.floor((totalProducts - perPage) / perPage) + 1;
      page = getRandomNumber(1, maxPage);
    }
    return client.products.page(page).perPage(perPage).fetch().then(function (res) {
      _.each(res.body.results, function (product) {
        lineItems.push(getLineItem(product));
      });
      return Promise.resolve(lineItems);
    });
  });
};

let getCartLineItems = function getCartLineItems() {
  let lineItems = [];
  let productsCount = 2;

  return client.products.page(1).perPage(1).fetch().then(function (res) {
    return res.body.total;
  }).then(function (totalProducts) {
    let page;
    let perPage = productsCount;

    if (productsCount >= totalProducts) {
      page = 1;
    } else {
      let maxPage = Math.floor((totalProducts - perPage) / perPage) + 1;
      let page = getRandomNumber(1, maxPage);
    }
    return client.products.page(page).perPage(perPage).fetch().then(function (res) {
      _.each(res.body.results, function (product) {
        lineItems.push(getCartLineItem(product));
      });
      return Promise.resolve(lineItems);
    });
  });
};

let createCustomer = function createCustomer(numToCreate) {
  const promises = [];

  _.times(numToCreate, function () {
    promises.push(',');
  });

  return Promise.map(promises, () => {
    return getNewCustomer().then(function (customer) {
      return client.customers.create(customer).then(function (data) {
        console.log("Customer created successfully: %s", data.body.customer.email);
      }).catch(function (err) {
        console.log(JSON.stringify(err, null, 2));
      });
    });
  }, { concurrency: 10 });
};

let createOrder = function createOrder(numToCreate) {
  let promises = [];

  _.times(numToCreate, function () {
    promises.push(',');
  });

  return Promise.map(promises, () => {
    return getNewOrder().then(function (order) {
      if (order.customerId) {
        return client.customers.byId(order.customerId).fetch().then(function (res) {
          return res.body;
        }).then(function (customer) {
          if (customer) {
            order.customerId = customer ? customer.id : "";
            order.billingAddress = customer.addresses[0] || order.billingAddress;
            order.shippingAddress = order.billingAddress;
            order.customerEmail = customer.email;
          }
          return client.orders.import(order).then(function (data) {
            console.log("Order created successfully: %s", data.body.orderNumber);
          }).catch(function (err) {
            console.log(JSON.stringify(err, null, 2));
          });
        });
      } else if (order.customerEmail) {
        return client.orders.import(order).then(function (data) {
          console.log("Order created successfully: %s", data.body.orderNumber);
        }).catch(function (err) {
          console.log(JSON.stringify(err, null, 2));
        });
      } else {
        return client.customers.page(1).perPage(1).fetch().then(function (res) {
          return res.body.total;
        }).then(function (totalCustomers) {
          let index = getRandomNumber(1, totalCustomers);
          return client.customers.page(index).perPage(1).fetch();
        }).then(function (res) {
          return _.first(res.body.results);
        }).then(function (customer) {
          if (customer) {
            order.customerId = customer ? customer.id : "";
            order.billingAddress = customer.addresses[0] || order.billingAddress;
            order.shippingAddress = order.billingAddress;
            order.customerEmail = customer.email;
          }
          return client.orders.import(order).then(function (data) {
            console.log("Order created successfully: %s", data.body.orderNumber);
          }).catch(function (err) {
            console.log(JSON.stringify(err, null, 2));
          });
        });
      }
    });
  }, { concurrency: 10 });
};

let getNewCart = function getNewCart() {
  return getCartLineItems().then(function (lineItems) {
    let address = getNewAddress();

    return client.customers.fetch().then(res => {
      if (res.body.results.length > 0) {
        return Promise.resolve({
          currency: "USD",
          customerId: res.body.results[0].id,
          lineItems: lineItems,
          shippingAddress: address,
          billingAddress: address,
          cartState: 'Active'
        });
      } else {
        return {
          currency: "USD",
          lineItems: lineItems,
          shippingAddress: address,
          billingAddress: address,
          cartState: 'Active'
        };
      }
    });
  });
};

let createCart = function createCart(numToCreate) {
  _.times(numToCreate, function () {
    getNewCart().then(function (cart) {
      client.carts.create(cart).then(function (data) {
        console.log("Cart created successfully: " + JSON.stringify(data));
      }).catch(function (err) {
        console.log(JSON.stringify(err, null, 2));
      });
    });
  });
};

let createProduct = function createProduct(numToCreate) {
  return client.productTypes.page(1).perPage(1).fetch().then(function (res) {
    let productType = res.body.results[0];
    return productType.id;
  }).then(function (productTypeId) {
    return client.project.fetch().then(function (res) {
      let currencies = res.body.currencies;
      return {
        productTypeId: productTypeId,
        currencyCode: currencies[0]
      };
    });
  }).then(function (data) {
    const promises = [];
    let productTypeId = data.productTypeId;
    let currencyCode = data.currencyCode;

    _.times(numToCreate, function () {
      promises.push(',');
    });

    return Promise.map(promises, () => {
      return getNewProduct(productTypeId, currencyCode).then(function (product) {
        return client.products.create(product).then(function (data) {
          console.log("Product created successfully: %s", data.body.masterData.current.name.en);
        }).catch(function (err) {
          console.log(JSON.stringify(err, null, 2));
        });
      });
    }, { concurrency: 10 });
  });
};

program.version('0.0.1').option('-t, --type <src>', 'Type (either "customer", "product", "order", "all")').option('-n, --number <src>', 'Number of entities to create').parse(process.argv);

let numToCreate = program.number || 1;

if (program.type === "customer") {
  createCustomer(numToCreate);
} else if (program.type === "order") {
  createOrder(numToCreate);
} else if (program.type === "product") {
  createProduct(numToCreate);
} else if (program.type === "cart") {
  //createCart(numToCreate);
} else if (program.type === "all") {
    Promise.all([createCustomer(numToCreate), createProduct(numToCreate)]).then(() => {
      Promise.all([
      //createCart(numToCreate),
      createOrder(numToCreate)]).then(() => {}).then(() => {
        console.log("All entities created");
      });
    });
  } else {
    console.error("Please provide the type (ie. -t [customer, product, cart, order, all])");
    process.exit(1);
  }