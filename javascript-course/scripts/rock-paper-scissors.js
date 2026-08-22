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

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    resetScore();
  }
});

let isAutoPlaying = false;
let intervalId;
document.querySelector(".js-auto-play-btn").addEventListener("click", () => {
  autoPlay();
});

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      playGame(pickComputerMove());
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".js-auto-play-btn").innerHTML = "Stop Playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-auto-play-btn").innerHTML = "Auto Play";
  }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  displayScoreElement();
}
document.querySelector(".js-reset-button").addEventListener("click", () => {
  confirmReset();
});

/*function confirmReset() {
  return confirm("Are you sure you want to reset the score?");
}*/
function confirmReset() {
  document.querySelector(".js-reset-confirmation-msg").innerHTML =
    `Are you sure you want to reset the score?  <button class="js-yes-reset reset-btn">Yes</button><button class="js-no-reset reset-btn">No</button>`;
  document.querySelector(".js-yes-reset").addEventListener("click", () => {
    resetScore();
    document.querySelector(".js-reset-confirmation-msg").innerHTML = "";
  });
  document.querySelector(".js-no-reset").addEventListener("click", () => {
    document.querySelector(".js-reset-confirmation-msg").innerHTML = "";
  });
}
