import app from '../../index.js';

describe('Service', () => {
  describe('CT service', () => {
    it('should connect to Commerce Tools', (done) => {
      app.ctService.getOneProduct().then((res) => {
        done();
      }).catch((err) => {
        done.fail(err);
      });
    });
  });
});
