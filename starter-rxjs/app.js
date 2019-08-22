/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
(() => {

  const LOSING_VALUE = 1;
  const TARGET_VALUE = 100;

  let gameIsActive = false;
  let activePlayer = 0;
  let board = [];

  const dice = document.getElementsByClassName('dice')[0];

  const rollDice = () => {
    let diceValue = Math.floor(1 + Math.random() * 6);
    dice.classList.remove(dice.classList[1]);
    dice.classList.add('roll-' + diceValue);

    return diceValue;
  };

  const getPlayerBoardElement = (id) => {
    return document.getElementsByClassName(`player-${id}-panel`)[0];
  };

  const getPlayerNameElement = (id) => {
    return document.getElementById('name-' + id);
  };

  const getPlayerScoreElement = (id) => {
    return document.getElementById('score-' + id);
  };

  const getPlayerCurrentScoreElement = (id) => {
    return document.getElementById('current-' + id);
  };

  const createPlayer = (id) => {
    return {
      boardElement: getPlayerBoardElement(id),
      nameElement: getPlayerNameElement(id),
      roundScoreElement: getPlayerScoreElement(id),
      currentScoreElement: getPlayerCurrentScoreElement(id),
      score: 0,
      roundScore: 0,
    };
  };

  const switchPlayer = () => {
    board[activePlayer].boardElement.classList.remove('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    board[activePlayer].boardElement.classList.add('active');
  };

  const updateRoundTotal = (value) => {
    board[activePlayer].roundScore += value;
    board[activePlayer].roundScoreElement.innerText = board[activePlayer].roundScore;
  };

  const resetPlayerRound = () => {
    board[activePlayer].roundScore = 0;
    board[activePlayer].roundScoreElement.innerText = board[activePlayer].roundScore;
  };

  const init = () => {
    [0, 1].map(function(playerId) {
      let player = createPlayer(playerId);
      player.roundScoreElement.innerText = 0;
      player.currentScoreElement.innerText = 0;
      player.nameElement.innerText = 'Player ' + playerId;
      board.push(player);
    });
    gameIsActive = true;
    document.getElementsByClassName('btn-roll')[0].addEventListener('click', playerRoleDice);
    document.getElementsByClassName('btn-hold')[0].addEventListener('click', holdDiceValues);
  };

  const playerRoleDice = () => {
    if (!gameIsActive) {
      return;
    }

    let value = rollDice();
    if (value === LOSING_VALUE) {
      resetPlayerRound();
      switchPlayer();
      return;
    }

    updateRoundTotal(value);
  };

  const holdDiceValues = () => {
    if (!gameIsActive) {
      return;
    }

    board[activePlayer].score += board[activePlayer].roundScore;
    board[activePlayer].currentScoreElement.innerText = board[activePlayer].score;
    resetPlayerRound();
    if (board[activePlayer].score >= TARGET_VALUE) {
      board[activePlayer].nameElement.innerText = 'Winner';
      gameIsActive = false;
      return;
    }
    switchPlayer();
  };

  document.getElementsByClassName('btn-new')[0].addEventListener('click', init);
})();
