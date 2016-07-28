const poker = require('../..');
const assert = require('chai').assert;

let firstGame = ['Joe, 3H, 4H, 5H, 6H, 8H', 'Bob, 3C, 3D, 3S, 8C, 10D', 'Sally, AC, 10C, 5C, 2S, 2C'];
let secondGame = ['Joe, 3H, 4H, 5H, 6H, 8H', 'Bob, 3C, 3D, 3S, 8C, 10D', 'Sally, AC, 10C, 5C, 2S, 2C', 'Nina, 3H, 4H, 5H, 6H, 8H'];
let thirdGame = ['Joe, 3H, 4H, 5H, 6H, 8H', 'Bob, 3C, 3D, 3S, 8C, 10D', 'Sally, AC, 10C, 5C, 2S, 2C', 'Nina, 3H, 4H, 5H, 6H, JH'];
let fourthGame = ['Joe, 3S, 4H, 5H, 6C, 8H', 'Bob, 3C, 3D, 3S, 8C, 10D', 'Sally, AC, 10C, 5C, 2S, 2C'];
let fifthGame = ['Joe, 3S, 4H, 5H, 6C, 8H', 'Bob, 3C, 3D, 3S, 8C, 10D', 'Sally, 3C, 8D, 8S, 8C, 10D'];
let sixthGame = ['Joe, 3S, 4H, 5H, 6C, 8H', 'Bob, 3C, 5D, 4S, 8C, 10D', 'Sally, 3C, 5D, 8S, 8C, 10D'];
let seventhGame = ['Joe, 3S, 4H, 5H, 6C, 8H', 'Bob, 3C, 5D, KS, 8C, 10D', 'Sally, 3C, 5D, QS, 8C, 10D'];

describe('Poker', () => {
  describe('validateInput', () => {
    it('should throw a RangeError - missing parameter', () => {
      assert.throws(poker.computeWinner, RangeError);
    });

    it('should throw a TypeError - invalid parameter type', () => {
      assert.throws(poker.computeWinner.bind(null, 'random'), TypeError);
    });

    it('should throw a RangeError - invalid parameter syntax/range', () => {
      assert.throws(poker.computeWinner.bind(null, []), RangeError);
    });

    it('should throw a TypeError - invalid parameter input', () => {
      assert.throws(poker.computeWinner.bind(null, ['3S, 4H, 5H, 6C, 8H', 'Bob, 3C, 5D, KS, 8C, 10D', 'Sally, 3C, 5D, QS, 8C, 10D']), TypeError);
    });

    it('should not throw errors', () => {
      assert.doesNotThrow(poker.computeWinner.bind(null, ['Joe, 3S, 4H, 5H, 6C, 8H', 'Bob, 3C, 5D, KS, 8C, 10D', 'Sally, 3C, 5D, QS, 8C, 10D']), TypeError);
    });
  });

  describe('computeWinner', () => {
    it('should detect that Joe is the winner with a flush', () => {
      assert.equal('Joe', poker.computeWinner(firstGame), 'Wrong winner');
    });

    it('should detect that Joe and Nina are the winners with a flush tie', () => {
      assert.equal('Joe, Nina', poker.computeWinner(secondGame), 'Wrong winner');
    });

    it('should detect that Nina is the winner with the highest flush', () => {
      assert.equal('Nina', poker.computeWinner(thirdGame), 'Wrong winner');
    });

    it('should detect that Bob is the winner with a three of a kind', () => {
      assert.equal('Bob', poker.computeWinner(fourthGame), 'Wrong winner');
    });

    it('should detect that Sally is the winner with the highest rank from a three of a kind', () => {
      assert.equal('Sally', poker.computeWinner(fifthGame), 'Wrong winner');
    });

    it('should detect that Sally is the winner with a pair', () => {
      assert.equal('Sally', poker.computeWinner(sixthGame), 'Wrong winner');
    });

    it('should detect that Bob is the winner with the highest ranked card', () => {
      assert.equal('Bob', poker.computeWinner(seventhGame), 'Wrong winner');
    });
  });
});
