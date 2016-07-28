#!/bin/node

let playerCount = 1;
const players = [];

const poker = require('./lib/poker');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `Enter player ${playerCount} hand -> `
});

rl.prompt();

rl.on('line', (line) => {
  line = line.trim();
  switch (poker.isValidInput(line)) {
    case true:
      players.push(line);
      ++playerCount <= 2 ? rl.setPrompt(`Enter player ${playerCount} hand -> `) : rl.setPrompt(`Enter player ${playerCount} hand (Crtl + C to compute winner) -> `);
      break;
    default:
      console.log('Wrong input value');
      console.log('Please input data in the following format: \'Joe, 3H, 4H, 5H, 6H, 8H\'');
      break;
  }

  rl.prompt();
})
.on('SIGINT', () => {
  readline.clearLine(rl, 0);
  readline.cursorTo(rl, 0);
  if (players.length >= 2){
    console.log(`Winner(s): ${poker.computeWinner(players)}`);
  } else {
    console.log('Not enough players');
  }

  rl.close();
});
