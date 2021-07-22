
const gamesToPlay = 5;
let gamesPlayed = 0;
let computerScore = 0;
let playerScore = 0;

while (gamesPlayed < gamesToPlay) {
  let computerSelection = askComputer();
  let playerSelection = askPlayer();
  let result = checkResult(playerSelection, computerSelection);
  if (result === 1) {
    playerScore++;
  } else if (result === -1) {
    computerScore++;
  }
  gamesPlayed++;
  alert(`Ya jugamos ${gamesPlayed} partidas de ${gamesToPlay}
  Puntaje Jugador = ${playerScore}
  Puntaje Computadora = ${computerScore}`);
}

// Returns a random integer between min (included) and max (excluded).
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Picks a random integer between 1 and 3, and according to the number picked
// returns "piedra" (rock) for 1, "papel" (paper) for 2 or "tijeras" (scisorss) for 3.
function askComputer() {
  let selection = getRandomInt(1, 4);
  if (selection === 1) {
    return "piedra";
  } else if (selection === 2) {
    return "papel";
  } else {
    return "tijeras";
  }
}

// Ask player for a selection and check if it is valid; if it is, return selection, if not, ask again.
function askPlayer() {
  let selection = prompt("Piedra, papel o tijeras ?").toLowerCase();
  if (
    selection === "piedra" ||
    selection === "papel" ||
    selection === "tijeras"
  ) {
    return selection;
  } else {
    alert("Opción inválida. Elija de nuevo");
    return askPlayer();
  }
}

// Check who won or if it was a tie. If it was a tie return 0, if player won return 1, if computer won return -1;
function checkResult(playerSelection, computerSelection) {
  switch (true) {
    case playerSelection === computerSelection:
      alert(`La computadora eligió ${computerSelection}.
      ¡Empate! Los dos eligieron ${playerSelection}.`);
      return 0;
    case playerSelection === "papel" && computerSelection === "piedra":
    case playerSelection === "piedra" && computerSelection === "tijeras":
    case playerSelection === "tijeras" && computerSelection === "papel":
      alert(`La computadora eligió ${computerSelection}.
      ¡Ganaste! ${playerSelection} le gana a ${computerSelection}`);
      return 1;
    default:
      alert(`La computadora eligió ${computerSelection}.
      ¡Perdiste! ${playerSelection} pìerde con ${computerSelection}`);
      return -1;
  }
}
