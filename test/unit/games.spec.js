const games = require('../../lib/games');
const assert = require('chai').assert;

describe('Games', () => {
  describe('Flush', () => {
    it('should not detect flush game', () => {
      assert.isNotOk(games.flush([ 'AS', '10C', '5C', '2C', '2C' ]), 'Flush game detected');
    });

    it('should detect flush game', () => {
      assert.isOk(games.flush([ 'AC', '10C', '5C', '2C', '2C' ]), 'Flush game not detected');
    });

    it('should return highest rank flush game', () => {
      assert.equal('A', games.flush([ 'AC', '10C', '5C', '2C', '2C' ]), 'Flush game higher rank not detected');
    });
  });

  describe('Three of a Kind', () => {
    it('should not detect three of a kind game', () => {
      assert.isNotOk(games.three([ 'AS', '10C', '5C', '2C', '2C' ]), 'Three of a kind game detected');
    });

    it('should detect three of a kind', () => {
      assert.isOk(games.three([ 'AC', '10C', '2C', '2D', '2C' ]), 'Three of a kind not detected');
    });

    it('should return rank from three of a kind game', () => {
      assert.equal('2', games.three([ 'AC', '10C', '2C', '2D', '2C' ]), 'Three of a kind rank not detected');
    });
  });

  describe('Pair', () => {
    it('should not detect pair game', () => {
      assert.isNotOk(games.pair([ 'AS', '10S', '5C', '6C', '2C' ]), 'Pair game detected');
    });

    it('should detect pair game', () => {
      assert.isOk(games.pair([ 'AC', '10S', '5C', '2C', '2C' ]), 'Pair game not detected');
    });

    it('should return rank from pair game', () => {
      assert.equal('2', games.pair([ 'AC', '10C', '5C', '2C', '2S' ]), 'Pair game rank not detected');
    });
  });

  describe('High', () => {
    it('should return highest rank card', () => {
      assert.equal('A', games.high([ 'QC', '10C', 'AC', '2C', '6S' ]), 'Flush game higher rank not detected');
    });
  });
});