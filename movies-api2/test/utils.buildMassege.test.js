const assert = require('assert'); //permite verificar si el test es correcto o no.
const buildMessage = require('../utils/buildMassage');

//un truco para que corra solo una suit de test con con .only
describe.only('utils - buildMessage', function() {
  describe('when receives na entity and an action', function() {
    it('should return the respective message', function() {
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    });
  });

  describe('when receives an entity and an action and is a list', function() {
    it('should return the respective message with the entity in plural', function() {
      const result = buildMessage('movie', 'list');
      const expected = 'movies listed';
      assert.strictEqual(result, expected);
    });
  });
});

//si quieres que se ejecuten todos los test simplemente quita .only
