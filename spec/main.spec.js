var app = require("../index.js");

describe("Service", () => {

  describe("CT service", () => {
    it("should connect to Commerce Tools", (done) => {
      app.ctService.client.products
        .page(1)
        .perPage(1)
        .fetch().then(function () {
          done();
        }).catch(function (err) {
          done.fail(err);
        });
    });
  })

});