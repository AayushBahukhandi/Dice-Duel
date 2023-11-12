'use strict';
const player1 = document.getElementById('score--0');
const player2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
let currentPlayer1 = document.getElementById('current--0');
let currentPlayer2 = document.getElementById('current--1');
let playerActive1 = document.querySelector('.player--0');
let playerActive2 = document.querySelector('.player--1');

let scores, currentScore, active, playing;
//Reset Function
const New = () => {
  player1.textContent = 0;
  player2.textContent = 0;
  dice.classList.add('hidden');
  currentScore = 0;
  active = 0;
  scores = [0, 0];
  playing = true;
  player1.textContent = 0;
  player2.textContent = 0;
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;
  playerActive1.classList.remove('player--winner');
  playerActive2.classList.remove('player--winner');
  playerActive1.classList.add('player--active');
  playerActive2.classList.remove('player--active');
};
New();

//switching player turn
const switchPlayer = () => {
  document.getElementById(`current--${active}`).textContent = 0;
  currentScore = 0;
  active = active === 0 ? 1 : 0;
  playerActive1.classList.toggle('player--active');
  playerActive2.classList.toggle('player--active');
};

//Roll Button
rollBtn.addEventListener('click', () => {
  if (playing) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    document.querySelector('.dice').style.display = 'block';

    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${active}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold Button For storing and updating the value
holdBtn.addEventListener('click', () => {
  if (playing) {
    scores[active] += currentScore;
    document.getElementById(`score--${active}`).textContent = scores[active];
    if (scores[active] > 100) {
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
      playing = false;
    }
    switchPlayer();
  }
});

//Reset Button
newBtn.addEventListener('click', New);
