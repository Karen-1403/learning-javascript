const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
displayScoreElement();

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
      score.ties++;
    } else if (computerMove === "Paper") {
      result = "You lose.";
      score.losses++;
    } else if (computerMove === "Scissors") {
      result = "You win.";
      score.wins++;
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win.";
      score.wins++;
    } else if (computerMove === "Paper") {
      result = "Tie.";
      score.ties++;
    } else if (computerMove === "Scissors") {
      result = "You lose.";
      score.losses++;
    }
  } else if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You win.";
      score.wins++;
    } else if (computerMove === "Paper") {
      result = "Tie.";
      score.ties++;
    } else if (computerMove === "Scissors") {
      result = "You lose.";
      score.losses++;
    }
  }
  localStorage.setItem("score", JSON.stringify(score));
  displayScoreElement();
  document.querySelector(".js-result").innerText = result;
  document.querySelector(".js-moves").innerHTML =
    `You  <img class="move-icon" src="images/${playerMove.toLowerCase()}-emoji.png">   <img class="move-icon" src="images/${computerMove.toLowerCase()}-emoji.png"> Computer`;
}

function displayScoreElement() {
  document.querySelector(".js-score").innerText =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
