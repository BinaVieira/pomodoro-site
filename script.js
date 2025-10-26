
const tempos = {
  pomodoro: 25 * 60,
  pausaCurta: 5 * 60,
  pausaLonga: 15 * 60,
};

let tipoAtual = "pomodoro";
let tempoRestante = tempos[tipoAtual];
let intervalo = null;
let ativo = false;

const display = document.getElementById("displayTime");
const btnPomodoro = document.getElementById("btnPomodoro");
const btnPausaCurta = document.getElementById("btnPausaCurta");
const btnPausaLonga = document.getElementById("btnPausaLonga");
const btnStart = document.getElementById("btnStart");
const btnReiniciar = document.getElementById("btnReiniciar");
const botoesModo = [btnPomodoro, btnPausaCurta, btnPausaLonga];


function atualizarDisplay() {
  const minutos = Math.floor(tempoRestante / 60)
    .toString()
    .padStart(2, "0");
  const segundos = (tempoRestante % 60).toString().padStart(2, "0");
  display.textContent = `${minutos}:${segundos}`;
}

function trocarModo(tipo) {
  tipoAtual = tipo;
  tempoRestante = tempos[tipo];
  atualizarDisplay();

  botoesModo.forEach((btn) => btn.classList.remove("active"));
  document.getElementById(`btn${capitalize(tipo)}`).classList.add("active");
}

function capitalize(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function iniciarTimer() {
  if (ativo) return;
  ativo = true;
  btnStart.textContent = "Pausar";

  intervalo = setInterval(() => {
    tempoRestante--;
    atualizarDisplay();

    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      ativo = false;
      btnStart.textContent = "Iniciar";
      tocarSom();

      if (tipoAtual === "pomodoro") trocarModo("pausaCurta");
      else trocarModo("pomodoro");
    }
  }, 1000);
}

function pausarTimer() {
  ativo = false;
  clearInterval(intervalo);
  btnStart.textContent = "Iniciar";
}

function reiniciarTimer() {
  pausarTimer();
  tempoRestante = tempos[tipoAtual];
  atualizarDisplay();
}

function tocarSom() {
  const audio = new Audio(
    "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
  );
  audio.play();
}

btnPomodoro.addEventListener("click", () => trocarModo("pomodoro"));
btnPausaCurta.addEventListener("click", () => trocarModo("pausaCurta"));
btnPausaLonga.addEventListener("click", () => trocarModo("pausaLonga"));

btnStart.addEventListener("click", () => {
  ativo ? pausarTimer() : iniciarTimer();
});

btnReiniciar.addEventListener("click", reiniciarTimer);

trocarModo("pomodoro");
atualizarDisplay();
