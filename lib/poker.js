const games = require('./games');
const aggregateBy = require('./util').aggregateBy;
const getRankIndex = require('./util').getRankIndex;
const isValidInput = require('./util').isValidInput

/*
 * Expose util.isValidInput to allow validation of data input
 * @param {String} hand - Ex: Joe, 3H, 4H, 5H, 6H, 8H
 * 
 * @return {Boolean}
 */
exports.isValidInput = isValidInput;

/*
 * Expose util.isValidInput to allow validation of data input
 * @param {Array[Strings]} players - Ex: ['Joe, 3H, 4H, 5H, 6H, 8H', 'Bob, 3C, 3D, 3S, 8C, 10D']
 * 
 * @return {String} winner(s) - Ex: Joe
 */
exports.computeWinner = function(players) {
  // Validate argument presence
  if (!players) {
    throw new RangeError('Invalid argument range. Ex: [\'Joe, 3H, 4H, 5H, 6H, 8H\']');
  }

  // Validate argument type
  if (!Array.isArray(players)) {
    throw new TypeError('Invalid argument type. Ex: [\'Joe, 3H, 4H, 5H, 6H, 8H\']');
  }

  // Validate argument size
  if (players.length === 0) {
    throw new RangeError('Invalid argument range. Ex: [\'Joe, 3H, 4H, 5H, 6H, 8H\']');
  }

  // Validate hand input content
  players.forEach((p) => {
    if (!isValidInput(p)) {
      throw TypeError('Invalid argument type. Ex: \'Joe, 3H, 4H, 5H, 6H, 8H\'');
    }
  });

  players = players.map(structurePlayer).map(computeHighestPlayerHand);
  return compareGames(players);
};

/*
 * Split player info into Player's name and hand
 * @param {String} player - Ex: ['Joe, 3H, 4H, 5H, 6H, 8H', 'Bob, 3C, 3D, 3S, 8C, 10D']
 * 
 * @return {Object} player - Ex: [{ name: 'Sally', hand: '3H, 4H, 5H, 6H, 8H'}]
 */
function structurePlayer(player) {
  player = player.split(',').map(h => h.trim());
  return {
    name: player.splice(0, 1)[0],
    hand: player
  };
}

/*
 * Compute and assign highest hand for each player
 * @param {Object} players - Ex: { name: 'Sally', hand: [ 'AC', '10C', '5C', '2S', '2C' ] }
 * 
 * @return {Object} player - Ex: { name: 'Sally', hand: 'pair', value: 2, rank: 1 }
 */
function computeHighestPlayerHand(player) {
  let gameRank = Object.keys(games).length;
  for (game in games) {
    let r = games[game](player.hand);
    if (!r) {
      gameRank--;
      continue;
    }

    return Object.assign(player, {
      hand: game,
      value: gameRank,
      rank: getRankIndex(r)
    });
  }
};

/*
 * Compare and determine the winner(s)
 * @param {Array[Objects]} players - Ex: [{ name: 'Sally', hand: 'pair', value: 2, rank: 1 }]
 * 
 * @return {String} player - Ex: 'Joe'
 */
function compareGames(games) {
  let aggregatedGamesByHand = games.reduce(aggregateBy('value'), {});

  let highestHandsValue = Math.max(...Object.keys(aggregatedGamesByHand));
  let highestHands = aggregatedGamesByHand[highestHandsValue];

  if (highestHands.length === 1) {
    return highestHands[0].name;
  }


  let aggregatedGamesByRank = highestHands.reduce(aggregateBy('rank'), {});
  let highestHandsRank = Math.max(...Object.keys(aggregatedGamesByRank));

  return aggregatedGamesByRank[highestHandsRank].map(h => h.name).join(', ');
}
