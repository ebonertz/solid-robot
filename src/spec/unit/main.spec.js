import app from '../../index.js';

// console.log('App %s', JSON.stringify(app, null, 2));
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
