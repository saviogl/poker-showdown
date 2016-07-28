const util = require('../../lib/util');
const assert = require('chai').assert;

describe('Util', () => {
  describe('extractRank', () => {
    it('should extract rank from card', () => {
      assert.equal('Q', util.extractRank('QC'), 'Rank invalid');
      assert.equal('2', util.extractRank('2S'), 'Rank invalid');
      assert.equal('J', util.extractRank('JD'), 'Rank invalid');
    });
  });

  describe('extractSuit', () => {
    it('should extract suite from card', () => {
      assert.equal('C', util.extractSuit('QC'), 'Rank invalid');
      assert.equal('S', util.extractSuit('2S'), 'Rank invalid');
      assert.equal('D', util.extractSuit('JD'), 'Rank invalid');
    });
  });

  describe('isValidInput', () => {
    it('should detect invalid input - missing card', () => {
      assert.isNotOk(util.isValidInput('Joe, 4S, 4S, 4S, 5H'), 'valid input detected');
    });

    it('should detect invalid input - wrong possibilities', () => {
      assert.isNotOk(util.isValidInput('Joe, 4S, 4S, 4S, 5H, 123H'), 'valid input detected');
    });

    it('should detect valid input', () => {
      assert.isOk(util.isValidInput('Joe, 4S, 4S, 4S, 5H, AH'), 'invalid input detected');
    });
  });

  describe('sortByRank', () => {
    it('should sort hand by rank lowest to highest', () => {
      assert.equal(['2C', '2C', '5C', '10C', 'AS'].join(), ['AS', '10C', '5C', '2C', '2C'].sort(util.sortByRank).join(), 'Sort not equal');
    });
  });

  describe('sortBySuit', () => {
    it('should sort hand by suit lowest to highest', () => {
      assert.equal(['5C', '2C', '2D', '10H', 'AS'].join(), ['AS', '10H', '5C', '2D', '2C'].sort(util.sortBySuit).join(), 'Sort not equal');
    });
  });

  describe('aggregate', () => {
    it('should aggragate an array to a object', () => {
      assert.equal(4, Object.keys([ 'A', '10', '5', '2', '2' ].reduce(util.aggregate, {})).length, 'Object keys does not match');
      assert.equal(3, Object.keys([ 'A', '10', '2', '2', '2' ].reduce(util.aggregate, {})).length, 'Object keys does not match');
      assert.equal(5, Object.keys([ 'A', '10', '2', '4', '6' ].reduce(util.aggregate, {})).length, 'Object keys does not match');
    });
  });

  describe('getRankIndex', () => {
    it('should return arra\'s index from card rank', () => {
      assert.equal(12, util.getRankIndex('A'), 'Wrong rank index');
      assert.equal(11, util.getRankIndex('K'), 'Wrong rank index');
      assert.equal(0, util.getRankIndex('2'), 'Wrong rank index');
    });
  });
});