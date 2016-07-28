/*
 * These two object Ranks, and Suits determine which are the possible entries from weakest to strongest
 */
const ranks = exports.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = exports.suits = ['C', 'D', 'H', 'S'];

exports.isValidInput = function(hand) {
  hand = hand.split(',');
  if (hand.length != 6) {
    return false;
  }

  hand = hand.map(h => h.trim());
  let player = hand.splice(0, 1);

  let len = hand.length;

  for (i = 0; i < len; i++) {
    let suit = extractSuit(hand[i]), rank = extractRank(hand[i]);

    if (ranks.indexOf(rank) === -1 || suits.indexOf(suit) === -1) {
      return false;
    }
  }

  return true;
};

exports.sortByRank = function(a, b) {
  let aRank = extractRank(a);
  let bRank = extractRank(b);

  if (ranks.indexOf(aRank) < ranks.indexOf(bRank)) {
    return -1;
  } else if (ranks.indexOf(aRank) > ranks.indexOf(bRank)) {
    return 1;
  }

  return 0;
};

exports.sortBySuit = function(a, b) {
  let aSuite = extractSuit(a);
  let bSuite = extractSuit(b);

  if (aSuite < bSuite) {
    return -1;
  } else if (aSuite > bSuite) {
    return 1;
  }

  return 0;
}

exports.aggregate = function(p, c) {
  p[c] = p[c] || 0;
  p[c]++;
  return p;
};

exports.aggregateBy = function(attr) {
  return function(p, c) {
    p[c[attr]] = p[c[attr]] || [];
    p[c[attr]].push(c);
    return p;
  }
};

exports.getRankIndex = function(rank) {
  return ranks.indexOf(rank);
};

const extractRank = exports.extractRank = function(card) {
  let cardArr = card.split('');
  cardArr.pop();
  return cardArr.join('');
};

const extractSuit = exports.extractSuit = function(card) {
  let cardArr = card.split('');
  return cardArr.pop();
}
