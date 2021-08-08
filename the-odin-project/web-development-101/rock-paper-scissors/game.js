const gamesToWin = 5;
let computerScore = 0;
let playerScore = 0;

const rockBtn = document.querySelector('#rock');
const paperBtn = document.querySelector('#paper');
const scissorsBtn = document.querySelector('#scissors');
const playerImage = document.querySelector('#playerImage');
const changeToBoyBtn = document.querySelector('#boy');
const changeToGirlBtn = document.querySelector('#girl');
const playerWeapon = document.querySelector('#playerWeapon');
const computerWeapon = document.querySelector('#computerWeapon');
const resultScreen = document.querySelector('#result');
const scoreScreen = document.querySelector('#score');
const containerPlay = document.querySelector('#container-play');
const containerFinal = document.querySelector('#container-final');
const whoWon = document.querySelector('#whoWon');
const playAgain = document.querySelector('#playAgain');
const wonImage = document.querySelector('#won-img');

changeToBoyBtn.addEventListener('click', () => {
  playerImage.setAttribute('src', "./images/boy.png")
});

changeToGirlBtn.addEventListener('click', () => {
  playerImage.setAttribute('src', "./images/girl.png")
});

rockBtn.addEventListener('click', () => { play('rock'); });

paperBtn.addEventListener('click', () => { play('paper'); });

scissorsBtn.addEventListener('click', () => { play('scissors'); });

playAgain.addEventListener('click', () => {
  computerScore = 0;
  playerScore = 0;
  playerWeapon.setAttribute('src', "./images/none.png");
  computerWeapon.setAttribute('src', "./images/none.png");
  scoreScreen.textContent = `${playerScore} - ${computerScore}`;
  containerPlay.classList.toggle('hide');
  containerFinal.classList.toggle('hide');
})

function play(playerSelection) {
  checkResult(playerSelection, askComputer());
  scoreScreen.textContent = `${playerScore} - ${computerScore}`;
  if (playerScore >= 5) {
    whoWon.textContent = "You won!";
    wonImage.setAttribute('src', "./images/happy-player.png");
    containerPlay.classList.toggle('hide');
    containerFinal.classList.toggle('hide');
  } else if (computerScore >= 5) {
    whoWon.textContent = "You lost!";
    wonImage.setAttribute('src', "./images/happy-computer.png");
    containerPlay.classList.toggle('hide');
    containerFinal.classList.toggle('hide');
  }
}

function askComputer() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function checkResult(playerSelection, computerSelection) {
  playerWeapon.setAttribute('src', `./images/hand-${playerSelection}.png`);
  computerWeapon.setAttribute('src', `./images/hand-${computerSelection}.png`);
  switch (true) {
    case playerSelection === computerSelection:
      resultScreen.textContent = "It's a tie";
      break;
    case playerSelection === "paper" && computerSelection === "rock":
    case playerSelection === "rock" && computerSelection === "scissors":
    case playerSelection === "scissors" && computerSelection === "paper":
      resultScreen.textContent = "Player wins!";
      playerScore += 1;
      break;
    default:
      resultScreen.textContent = "Computer wins!";
      computerScore += 1;
  }
}
