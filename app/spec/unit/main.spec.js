'use strict';

var _index = require('../../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log('App %s', JSON.stringify(app, null, 2));
describe('Service', () => {
  describe('CT service', () => {
    it('should connect to Commerce Tools', done => {
      _index2.default.ctService.getOneProduct().then(res => {
        done();
      }).catch(err => {
        done.fail(err);
      });
    });
  });
});