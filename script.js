'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let tempScore, activePlayer, playFlag, scores;

const init = function () {
  tempScore = 0;
  playFlag = true;
  scores = [0, 0];

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  activePlayer = 0;

  dice.classList.add('hidden');
  player0.classList.add('player--active');
  // player0.classList.contains('player--winner')
  //   ? player0.classList.remove('player--winner')
  //   : player1.classList.remove('player-winner');
};

init();
const changeActivePlayer = function () {
  tempScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = tempScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playFlag) {
    const randNum = Math.trunc(Math.random() * 6) + 1;
    dice.src = `./dice-${randNum}.png`;
    dice.classList.remove('hidden');

    if (randNum !== 1) {
      tempScore += randNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        tempScore;
    } else {
      changeActivePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playFlag) {
    scores[`${activePlayer}`] += tempScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[`${activePlayer}`];
    // console.log(scores);
    if (scores[`${activePlayer}`] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playFlag = false;
      dice.classList.add('hidden');
    } else {
      changeActivePlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  init();
});
