function iniciarJogo() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    audioBg.play();
    reiniciarJogo();
}

function render(board, el, esconder=false) {
    el.innerHTML = "";

    for (let i=0;i<10;i++){
        for (let j=0;j<10;j++){

            let cell = document.createElement("div");
            cell.classList.add("celula");

            if (board[i][j] === 2) cell.classList.add("hit");
            if (board[i][j] === 3) cell.classList.add("miss");

            cell.onclick = () => {
                if (!turno || esconder === false) return;

                atacar(enemyBoard, i, j, true);
                atualizar();

                setTimeout(() => turnoIA(), 600);
            };

            el.appendChild(cell);
        }
    }
}

function atualizar() {
    render(playerBoard, document.getElementById("playerBoard"));
    render(enemyBoard, document.getElementById("enemyBoard"), true);
    verificarFim();
}

function verificarFim() {
    let player = contarRestantes(playerBoard);
    let enemy = contarRestantes(enemyBoard);

    if (enemy === 0) {
        document.getElementById("status").textContent = "👑 Vitória!";
        turno = false;
    }

    if (player === 0) {
        document.getElementById("status").textContent = "💀 Derrota...";
        turno = false;
    }
}

function log(msg) {
    let li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("logList").appendChild(li);
}

function toggleSom() {
    somLigado = !somLigado;
    if (!somLigado) audioBg.pause();
    else audioBg.play();
}

function reiniciarJogo() {
    playerBoard = criarTabuleiro();
    enemyBoard = criarTabuleiro();

    gerarNavios(playerBoard);
    gerarNavios(enemyBoard);

    turno = true;
    jogadasIA.clear();

    document.getElementById("logList").innerHTML = "";
    document.getElementById("status").textContent = "👑 Seu turno";

    atualizar();
}