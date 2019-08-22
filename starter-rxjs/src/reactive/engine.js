import { loop, input } from '../reactive/observables';
import { withLatestFrom, scan, filter } from 'rxjs/operators';

const LOSING_VALUE = 1;
const TARGET_VALUE = 100;

function createGameLoop (defaultValues = {}) {
  return loop.pipe(
    withLatestFrom(input),
    scan(calculateNextState, initGame(defaultValues)),
    filter(isGameRunning),
  );
}

function calculateNextState (state, [ticker, event]) {
  if (isResetPressed(event)) {
    return initGame();
  }

  if (isHoldValuesPressed(event)) {
    return holdDiceValues(state);
  }

  if (isRolDicePressed(event)) {
    return playerRolDice(state);
  }

  if (!state.isGameOver) {
    if (checkGameOver(state.board[state.activePlayer])) {
      return gameOver(state);
    }
  }
  else {
    state.isGameRunning = false;
  }

  return state;
}

const switchPlayer = state => {
  state.board[state.activePlayer].boardElement.classList.remove('active');
  state.activePlayer = state.activePlayer === 0 ? 1 : 0;
  state.board[state.activePlayer].boardElement.classList.add('active');
  return state;
};

const updateRoundTotal = state => {
  state.board[state.activePlayer].roundScore += state.diceValue;
  state.board[state.activePlayer].roundScoreElement.innerText = state.board[state.activePlayer].roundScore;
  return state;
};

const resetPlayerRound = state => {
  state.board[state.activePlayer].roundScore = 0;
  state.board[state.activePlayer].roundScoreElement.innerText = state.board[state.activePlayer].roundScore;
  return state;
};

function checkGameOver (board) {
  return board.roundScore >= TARGET_VALUE;
}

function isResetPressed (event, isGameOver) {
  return isGameOver && (event.target && event.target.className === 'btn-new');
}

function isHoldValuesPressed(event) {
  return (event.target && event.target.className === 'btn-hold');
}

function isRolDicePressed(event) {
  return (event.target && event.target.className === 'btn-roll');
}

function gameOver (state) {
  state.isGameOver = true;
  return state;
}

function isGameRunning (state) {
  return state.isGameRunning;
}

function initGame (defaultValues = {}) {
  let objects = initPrintableObjects();

  return Object.assign({}, {
    isGameOver: false,
    isGameRunning: true,
    activePlayer: 0,
  }, objects, defaultValues);
}

function initPrintableObjects () {
  let board = [];

  [0, 1].map(function(playerId) {
    let player = createPlayer(playerId);
    player.roundScoreElement.innerText = 0;
    player.currentScoreElement.innerText = 0;
    player.nameElement.innerText = 'Player ' + playerId;
    board.push(player);
  });

  return {
    board: board,
    dice: document.getElementsByClassName('dice')[0],
    diceValue: 1,
  };
}

const playerRolDice = state => {
  if (state.isGameOver) {
    return state;
  }

  state = rollDice(state);
  if (state.diceValue === LOSING_VALUE) {
    state = resetPlayerRound(state);
    state = switchPlayer(state);
  }

  return updateRoundTotal(state);
};

const holdDiceValues = state => {
  if (!state.isGameRunning) {
    return state;
  }

  state.board[state.activePlayer].score += state.board[state.activePlayer].roundScore;
  state.board[state.activePlayer].currentScoreElement.innerText = state.board[state.activePlayer].score;
  resetPlayerRound(state);
  if (state.board[state.activePlayer].score >= TARGET_VALUE) {
    state.board[state.activePlayer].nameElement.innerText = 'Winner';
    state.isGameRunning = false;
    return state;
  }

  return switchPlayer(state);
};

const rollDice = state => {
  state.diceValue = Math.floor(1 + Math.random() * 6);
  state.dice.classList.remove(state.dice.classList[1]);
  state.dice.classList.add('roll-' + state.diceValue);
  return state;
};

const getPlayerBoardElement = id => {
  return document.getElementsByClassName(`player-${id}-panel`)[0];
};

const getPlayerNameElement = id => {
  return document.getElementById('name-' + id);
};

const getPlayerScoreElement = id => {
  return document.getElementById('score-' + id);
};

const getPlayerCurrentScoreElement = id => {
  return document.getElementById('current-' + id);
};

const createPlayer = id => {
  return {
    boardElement: getPlayerBoardElement(id),
    nameElement: getPlayerNameElement(id),
    roundScoreElement: getPlayerScoreElement(id),
    currentScoreElement: getPlayerCurrentScoreElement(id),
    score: 0,
    roundScore: 0,
  };
};

export {
  createGameLoop,
};
