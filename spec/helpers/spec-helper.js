beforeAll(function () {


  this.getOrder = function () {
    return {
      "type": "Order",
      "id": "a79c5367-8702-4da8-9cbe-1239652125bf",
      "version": 2,
      "orderNumber": "1",
      "customerId": "93f9f4aa-dbd9-4ac0-b714-970d705c593e",
      "createdAt": "2015-09-30T09:32:11.565Z",
      "lastModifiedAt": "2015-09-30T09:32:54.880Z",
      "totalPrice": {
        "currencyCode": "USD",
        "centAmount": 110700
      },
      "orderState": "Open",
      "shipmentState": "Pending",
      "syncInfo": [],
      "returnInfo": [],
      "lineItems": [
        {
          "id": "a03d263c-2c7a-461d-8ee7-b0082922ef22",
          "productId": "8848f8f5-6d13-47c6-ac11-732f5a609a2a",
          "name": {
            "en": "Product-6421"
          },
          "productSlug": {
            "en": "Product-6421-slug"
          },
          "variant": {
            "id": 1,
            "sku": "Product-6421-sku",
            "prices": [
              {
                "value": {
                  "currencyCode": "USD",
                  "centAmount": 7100
                },
                "id": "3d38fc85-73f1-4572-a2e3-5a73e0030b58"
              }
            ],
            "images": [
              {
                "url": "https://splashbase.s3.amazonaws.com/lifeofpix/regular/Life-of-Pix-free-stock-photos-plants-tall-weeds-light-leeroy-copie-1440x960.jpg",
                "dimensions": {
                  "w": 1400,
                  "h": 1400
                }
              }
            ],
            "attributes": [{
              "name": "upc",
              "value": "45235800483"
            }, {
              "name": "weight",
              "value": 0.6
            }]
          },
          "price": {
            "value": {
              "currencyCode": "USD",
              "centAmount": 7100
            }
          },
          "quantity": 5,
          "discountedPricePerQuantity": [],
          "state": [
            {
              "quantity": 5,
              "state": {
                "typeId": "state",
                "id": "912de77d-857b-4ee1-8e42-a6e4c9fd1435"
              }
            }
          ],
          "totalPrice": {
            "currencyCode": "USD",
            "centAmount": 35500
          }
        },
        {
          "id": "d12b5179-384c-4394-894d-e729d2b66929",
          "productId": "a3c1749d-44ec-4112-a104-c454b20634b0",
          "name": {
            "en": "Product-6400"
          },
          "productSlug": {
            "en": "Product-6400-slug"
          },
          "variant": {
            "id": 1,
            "sku": "Product-6400-sku",
            "prices": [
              {
                "value": {
                  "currencyCode": "USD",
                  "centAmount": 1600
                },
                "id": "68300372-9d6f-4688-8b96-6e6b9e2afbaf"
              }
            ],
            "images": [
              {
                "url": "https://splashbase.s3.amazonaws.com/newoldstock/regular/tumblr_nlsxggaPie1sfie3io1_1280.jpg",
                "dimensions": {
                  "w": 1400,
                  "h": 1400
                }
              }
            ],
            "attributes": []
          },
          "price": {
            "value": {
              "currencyCode": "USD",
              "centAmount": 1600
            }
          },
          "quantity": 4,
          "discountedPricePerQuantity": [],
          "state": [
            {
              "quantity": 4,
              "state": {
                "typeId": "state",
                "id": "912de77d-857b-4ee1-8e42-a6e4c9fd1435"
              }
            }
          ],
          "totalPrice": {
            "currencyCode": "USD",
            "centAmount": 6400
          }
        },
        {
          "id": "06b58450-e1f1-4aeb-b369-f240758f6661",
          "productId": "e3128815-b318-44d7-b6da-6778160cd852",
          "name": {
            "en": "MB PREMIUM TECH T"
          },
          "productSlug": {
            "en": "mb-premium-tech-t1442335679304"
          },
          "variant": {
            "id": 1,
            "sku": "sku_MB_PREMIUM_TECH_T_variant1_1442335679304",
            "prices": [
              {
                "value": {
                  "currencyCode": "USD",
                  "centAmount": 10000
                },
                "id": "819ba87b-c966-4019-94e6-f3d8d5e97713"
              }
            ],
            "images": [
              {
                "url": "https://www.commercetools.com/cli/data/253245821_1.jpg",
                "dimensions": {
                  "w": 1400,
                  "h": 1400
                }
              }
            ],
            "attributes": [
              {
                "name": "quickbooksId",
                "value": "22"
              }
            ]
          },
          "price": {
            "value": {
              "currencyCode": "USD",
              "centAmount": 10000
            }
          },
          "quantity": 2,
          "discountedPricePerQuantity": [],
          "state": [
            {
              "quantity": 2,
              "state": {
                "typeId": "state",
                "id": "912de77d-857b-4ee1-8e42-a6e4c9fd1435"
              }
            }
          ],
          "totalPrice": {
            "currencyCode": "USD",
            "centAmount": 20000
          }
        },
        {
          "id": "4053c2fe-69a4-4e5c-83c9-41eea57c0596",
          "productId": "1775bfee-0e76-4bff-8efc-0b95ea4aa4ef",
          "name": {
            "en": "GIRLS HARTBREAK CREW"
          },
          "productSlug": {
            "en": "girls-hartbreak-crew1442335679167"
          },
          "variant": {
            "id": 1,
            "sku": "sku_GIRLS_HARTBREAK_CREW_variant1_1442335679167",
            "prices": [
              {
                "value": {
                  "currencyCode": "USD",
                  "centAmount": 3400
                },
                "id": "26f207de-961b-4c5f-ad8c-f13d0daa33ed"
              }
            ],
            "images": [
              {
                "url": "https://www.commercetools.com/cli/data/253234387_1.jpg",
                "dimensions": {
                  "w": 1400,
                  "h": 1400
                }
              }
            ],
            "attributes": [
              {
                "name": "quickbooksId",
                "value": "23"
              }
            ]
          },
          "price": {
            "value": {
              "currencyCode": "USD",
              "centAmount": 3400
            }
          },
          "quantity": 2,
          "discountedPricePerQuantity": [],
          "state": [
            {
              "quantity": 2,
              "state": {
                "typeId": "state",
                "id": "912de77d-857b-4ee1-8e42-a6e4c9fd1435"
              }
            }
          ],
          "totalPrice": {
            "currencyCode": "USD",
            "centAmount": 6800
          }
        },
        {
          "id": "6b53ff21-7c3d-49bb-93a3-057cebab9104",
          "productId": "8163dd05-cd5d-4ad2-96a4-743b1b9ed686",
          "name": {
            "en": "WB ATHLETIC TANK"
          },
          "productSlug": {
            "en": "wb-athletic-tank1442335679214"
          },
          "variant": {
            "id": 1,
            "sku": "sku_WB_ATHLETIC_TANK_variant1_1442335679214",
            "prices": [
              {
                "value": {
                  "currencyCode": "USD",
                  "centAmount": 8400
                },
                "id": "d1b6fe06-8b42-4f38-a72a-dbe3f06effcf"
              }
            ],
            "images": [
              {
                "url": "https://www.commercetools.com/cli/data/253265444_1.jpg",
                "dimensions": {
                  "w": 1400,
                  "h": 1400
                }
              }
            ],
            "attributes": [
              {
                "name": "quickbooksId",
                "value": "24"
              }
            ]
          },
          "price": {
            "value": {
              "currencyCode": "USD",
              "centAmount": 8400
            }
          },
          "quantity": 5,
          "discountedPricePerQuantity": [],
          "state": [
            {
              "quantity": 5,
              "state": {
                "typeId": "state",
                "id": "912de77d-857b-4ee1-8e42-a6e4c9fd1435"
              }
            }
          ],
          "totalPrice": {
            "currencyCode": "USD",
            "centAmount": 42000
          }
        }
      ],
      "shippingInfo": {
        "shippingMethodName": "3DS-UPS Three-Day Select",
        "price": {
          "currencyCode": "USD",
          "centAmount": 946
        },
        "shippingRate": {
          "price": {
            "currencyCode": "USD",
            "centAmount": 946
          }
        },
        "taxRate": {
          "name": "US-NY",
          "amount": 0,
          "includedInPrice": false,
          "country": "US",
          "state": "NY",
          "id": "3WiwHm6I",
          "subRates": []
        },
        "taxCategory": {
          "typeId": "tax-category",
          "id": "366f7bd8-b6e0-4b40-9863-982cce37588d"
        },
        "deliveries": []
      },
      "shippingAddress": {
        "id": "DQY-Aj28",
        "salutation": "mr",
        "firstName": "Javier shipping",
        "lastName": "Ortiz Saorin",
        "streetName": "Calle Colon",
        "streetNumber": "20",
        "additionalStreetInfo": "",
        "postalCode": "46004",
        "city": "Valencia",
        "region": "Valencia",
        "state": "Valencia",
        "country": "ES",
        "company": "devgurus.io",
        "apartment": "14",
        "phone": "0034654174585",
        "email": "javi9@devgurus.io"
      },
      "billingAddress": {
        "id": "DQY-Aj28",
        "salutation": "mr",
        "firstName": "Javier billing",
        "lastName": "Ortiz Saorin",
        "streetName": "Calle Colon",
        "streetNumber": "20",
        "additionalStreetInfo": "",
        "postalCode": "46004",
        "city": "Valencia",
        "region": "Valencia",
        "state": "Valencia",
        "country": "ES",
        "company": "devgurus.io",
        "apartment": "14",
        "phone": "0034654174585",
        "email": "javi9@devgurus.io"
      },
      "customLineItems": [],
      "transactionFee": false,
      "discountCodes": [],
      "lastMessageSequenceNumber": 1,
      "custom": {
        "type": {
          "typeId": "type",
          "id": "f56bc468-542b-4cb0-962d-ccb303e368c4"
        },
        "fields": {
          "jirafeSyncDate": "2015-09-30T09:32:56.723Z"
        }
      }
    }
  }

  this.getCustomer = function () {
    return {
      "type": "Customer",
      "id": "93f9f4aa-dbd9-4ac0-b714-970d705c593e",
      "version": 5,
      "customerNumber": "quickbooks-4JxkGtWAC",
      "email": "javi1@devgurus.io",
      "firstName": "Javier",
      "middleName": "MiddleName",
      "lastName": "Ortiz Saorin1",
      "password": "OVeLlmPjZe+xDzKIat/CEanxjVDW6TLFT+7IW2aPODE=$4k4yEm6EVJ7OAIcgSuG/Y3iiDqJAtqOkDReh7cp4jVc=",
      "title": "Mr",
      "companyName": "devgurus.io",
      "addresses": [
        {
          "id": "DQY-Aj28",
          "salutation": "mr",
          "firstName": "Javier shipping",
          "lastName": "Ortiz Saorin",
          "streetName": "Calle Colon",
          "streetNumber": "20",
          "additionalStreetInfo": "",
          "postalCode": "46004",
          "city": "Valencia",
          "region": "Valencia",
          "state": "Valencia",
          "country": "ES",
          "company": "devgurus.io",
          "apartment": "14",
          "phone": "0034654174585",
          "email": "javi9@devgurus.io"
        },
        {
          "id": "WDT-3234",
          "salutation": "mr",
          "firstName": "Javier billing",
          "lastName": "Ortiz Saorin",
          "streetName": "Calle Colon",
          "streetNumber": "20",
          "additionalStreetInfo": "",
          "postalCode": "46004",
          "city": "Valencia",
          "region": "Valencia",
          "state": "Valencia",
          "country": "ES",
          "company": "devgurus.io",
          "apartment": "14",
          "phone": "0034654174585",
          "email": "javi9@devgurus.io"
        }
      ],
      "defaultShippingAddressId": "DQY-Aj28",
      "defaultBillingAddressId": "WDT-3234",
      "isEmailVerified": false,
      "custom": {
        "type": {
          "typeId": "type",
          "id": "8bd9b6e1-a63b-47eb-a53f-d001d3418493"
        },
        "fields": {
          "jirafeSyncDate": "2015-09-29T11:58:43.639Z"
        }
      },
      "createdAt": "2015-09-25T09:54:49.262Z",
      "lastModifiedAt": "2015-09-29T11:58:44.158Z"
    }
  }

  this.getProduct = function () {
    return {
      "id": "8848f8f5-6d13-47c6-ac11-732f5a609a2a",
      "version": 6,
      "productType": {
        "typeId": "product-type",
        "id": "f087b542-c38b-4fdc-b38a-1c2f8dc0f12b"
      },
      "catalogs": [],
      "masterData": {
        "current": {
          "name": {
            "en": "Product-6421"
          },
          "description": {
            "en": "Sample product from fixtures.js"
          },
          "categories": [],
          "categoryOrderHints": {},
          "slug": {
            "en": "Product-6421-slug"
          },
          "masterVariant": {
            "id": 1,
            "sku": "Product-6421-sku",
            "prices": [
              {
                "value": {
                  "currencyCode": "USD",
                  "centAmount": 7100
                },
                "id": "3d38fc85-73f1-4572-a2e3-5a73e0030b58"
              }
            ],
            "images": [
              {
                "url": "https://splashbase.s3.amazonaws.com/lifeofpix/regular/Life-of-Pix-free-stock-photos-plants-tall-weeds-light-leeroy-copie-1440x960.jpg",
                "dimensions": {
                  "w": 1400,
                  "h": 1400
                }
              }
            ],
            "attributes": []
          },
          "variants": [],
          "searchKeywords": {}
        },
        "staged": {
          "name": {
            "en": "Product-6421"
          },
          "description": {
            "en": "Sample product from fixtures.js"
          },
          "categories": [],
          "categoryOrderHints": {},
          "slug": {
            "en": "Product-6421-slug"
          },
          "masterVariant": {
            "id": 1,
            "sku": "Product-6421-sku",
            "prices": [
              {
                "value": {
                  "currencyCode": "USD",
                  "centAmount": 200
                },
                "id": "e3c97e0a-b692-4dec-a14b-3ef9c356e005"
              }
            ],
            "images": [
              {
                "url": "https://splashbase.s3.amazonaws.com/lifeofpix/regular/Life-of-Pix-free-stock-photos-plants-tall-weeds-light-leeroy-copie-1440x960.jpg",
                "dimensions": {
                  "w": 1400,
                  "h": 1400
                }
              }
            ],
            "attributes": [
              {
                "name": "jirafeSyncDate",
                "value": "2015-09-29T12:20:45.196Z"
              }
            ]
          },
          "variants": [],
          "searchKeywords": {}
        },
        "published": false,
        "hasStagedChanges": true
      },
      "catalogData": {},
      "lastVariantId": 1,
      "createdAt": "2015-09-29T10:14:33.049Z",
      "lastModifiedAt": "2015-10-28T16:04:58.382Z",
      "lastMessageSequenceNumber": 0
    }
  }

})


