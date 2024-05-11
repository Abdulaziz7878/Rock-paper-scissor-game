let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

scoreElement();

function computerMove() {
  let computer = "";

  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) {
    computer = "✊";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computer = "✋";
  } else {
    computer = "✌️";
  }
  return computer;
}

function playGame(playerMove) {
  const computer = computerMove();
  let result = "";
  if (playerMove === "✌️") {
    if (computer === "✊") {
      result = "You lose.";
    } else if (computer === "✋") {
      result = "You win.";
    } else {
      result = "Tie.";
    }
  } else if (playerMove === "✋") {
    if (computer === "✊") {
      result = "You win.";
    } else if (computer === "✋") {
      result = "Tie.";
    } else {
      result = "You lose.";
    }
  } else if (playerMove === "✊") {
    if (computer === "✊") {
      result = "Tie.";
    } else if (computer === "✋") {
      result = "You lose.";
    } else {
      result = "You win.";
    }
  }
  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result-element").innerHTML = `${result}`;

  document.querySelector(
    ".js-move-element"
  ).innerHTML = `You <span class="moves"> ${playerMove}   ${computer} </span> computer.`;

  scoreElement();
}

function conformation() {
  let conformationHtml = `<br>Are you sure you want to reset the score?<br><br>
                  <button class="yes-button js-yes-button">Yes</button>
                  <button class="no-button js-no-button">No</button>`;

  document.querySelector(".conformation").innerHTML = conformationHtml;

  document.querySelector(".js-yes-button").addEventListener("click", () => {
    resetScore();
    document.querySelector(".conformation").innerHTML = "";
  });

  document.querySelector(".js-no-button").addEventListener("click", () => {
    document.querySelector(".conformation").innerHTML = "";
  });
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  scoreElement();
  document.querySelector(".js-result-element").innerHTML = "";

  document.querySelector(".js-move-element").innerHTML = "";
}

function scoreElement() {
  document.querySelector(
    ".js-score-element"
  ).innerText = `Wins: ${score.wins} ,       Losses: ${score.losses} ,       Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      let playerMove = computerMove();
      playGame(playerMove);
    }, 1000);
    document.querySelector(".js-auto-button").innerText = "Stop playing";
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    document.querySelector(".js-auto-button").innerText = "Auto Play";
    isAutoPlaying = false;
  }
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r" || event.key === "R") {
    playGame("✊");
  } else if (event.key === "p" || event.key === "P") {
    playGame("✋");
  } else if (event.key === "s" || event.key === "S") {
    playGame("✌️");
  } else if (event.key === "a" || event.key === "A") {
    autoPlay();
  } else if (event.key === "Backspace") {
    conformation();
  }
});

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("✊");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("✋");
});

document.querySelector(".js-scissor-button").addEventListener("click", () => {
  playGame("✌️");
});

document.querySelector(".js-reset-button").addEventListener("click", () => {
  conformation();
});

document.querySelector(".js-auto-button").addEventListener("click", () => {
  autoPlay();
});
