const util = require('./util');

/*
 * The sequence of games being exported determine the strengh of the game
 * i.e: flush > three > pair > high
 */

/*
 * Determine whether or not it's a flush hand. If positive return the highest ranked card 
 * @param {Array[String]} hand - Ex: [ 'AC', '10C', '5C', '2S', '2C' ]
 * 
 * Compute flush game by sorting tha player's hand array by suit and checking if first index's suit equals the last
 * If it does return the highest rank
 * 
 * @return {Boolean} || {String}
 */
exports.flush = function(hand) {
  hand = hand.sort(util.sortBySuit);
  if (util.extractSuit(hand[0]) === util.extractSuit(hand[4])) {
    return util.extractRank(hand.sort(util.sortByRank)[4]);
  } else {
    return false;
  }
}

/*
 * Determine whether or not it's a three of a kind hand. If positive return the rank of the three
 * @param {Array[String]} hand - Ex: [ 'AC', '10C', '5C', '2S', '2C' ]
 * 
 * Compute three of a kind game by aggregating ranks and count its occurrences. If the resulting object contains 3 keys
 * it's a three of a kind.
 * 
 * @return {Boolean} || {String}
 */
exports.three = function(hand) {
  hand = hand.map(h => util.extractRank(h)).reduce(util.aggregate, {});
  
  if (Object.keys(hand).length === 3) {
    for (key in hand) {
      if (hand[key] === 3) {
        return key;
      }
    }
  } else {
    return false;
  }
}

/*
 * Determine whether or not it's a pair hand. If positive return the rank of the pair
 * @param {Array[String]} hand - Ex: [ 'AC', '10C', '5C', '2S', '2C' ]
 * 
 * Compute pair game by aggregating ranks and count its occurrences. If the resulting object contains 4 keys
 * it's a pair.
 * 
 * @return {Boolean} || {String}
 */
exports.pair = function(hand) {
  hand = hand.map(h => util.extractRank(h)).reduce(util.aggregate, {});

  if (Object.keys(hand).length === 4) {
    for (key in hand) {
      if (hand[key] === 2) {
        return key;
      }
    }
  } else {
    return false;
  }
}

/*
 * Determine the highest rank in hand
 * @param {Array[String]} hand - Ex: [ 'AC', '10C', '5C', '2S', '2C' ]
 * 
 * Sort the array by rank and return highest rank
 * 
 * @return {Boolean} || {String}
 */
exports.high = function(hand) {
  hand = hand.sort(util.sortByRank);
  return util.extractRank(hand.pop());
}
