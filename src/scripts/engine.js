// Esse objeto guarda todos os estados que precisamos durante esse o processo.
const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
    timerId: setInterval(randomSquare, 1000),
  },
};

// Implementação de áudio ao acertar o inimigo
function playSound() {
  let audio = new Audio("./src/audios/hit.m4a");
  audio.volume = 0.1;
  audio.play();
}

// Implementação do tempo decrescente para início e término do jogo.
function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}

// Implementação de um valor randomico, onde o inimigo é inserido no quadrado.
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomSquare = Math.floor(Math.random() * 9);
  let randomEnemySquare = state.view.squares[randomSquare];
  randomEnemySquare.classList.add("enemy");
  state.values.hitPosition = randomEnemySquare.id;
}

// Implementação de ações quando o quadrado correto é acertado.
function hitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();

        console.log("Fez 1 ponto");
      }
    });
  });
}

// Função que gerencia e dá o start as outras funções.
function main() {
  hitBox();
}

main();
