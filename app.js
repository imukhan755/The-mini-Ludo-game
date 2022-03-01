"use strict";
//selecting element

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let score0EL = document.querySelector(".score--0");
let score1EL = document.getElementById("score--1");
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
diceEl.classList.add("hidden");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const SwitchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//rolling dice function
btnRoll.addEventListener("click", function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    console.log(dice);
    diceEl.classList.remove("hidden");
    diceEl.src = `./dice-${dice}.png`;

    //check dice oputput
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = dice;
      //add currentscore in total score
      scores[activePlayer] += dice;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      if (scores[activePlayer] >= 100) {
        diceEl.classList.add("hidden");
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        document.getElementById("score--0").textContent = 0;
        document.getElementById("score--1").textContent = 0;
        document.getElementById("current--0").textContent = 0;
        document.getElementById("current--1").textContent = 0;
      }
    } else {
      SwitchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  //storing currentscore to score

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //winning the game
  if (scores[activePlayer] >= 100) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else {
    SwitchPlayer();
  }
});
console.log(scores);

btnNew.addEventListener("click", init);
