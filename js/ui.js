function render(board, el, esconder=false) {
    el.innerHTML = "";

    for (let i=0;i<10;i++){
        for (let j=0;j<10;j++){

            let cell = document.createElement("div");
            cell.classList.add("celula");

            if (board[i][j] === NAVIO && !esconder) cell.classList.add("navio");
            if (board[i][j] === 2) cell.classList.add("hit");
            if (board[i][j] === 3) cell.classList.add("miss");

            cell.onclick = () => {
                if (!turno || esconder === false) return;

                atacar(enemyBoard, i, j, true);
                atualizar();

                setTimeout(() => {
                    turnoIA();
                    atualizar();
                }, 600);
            };

            el.appendChild(cell);
        }
    }
}

function atualizar() {
    render(playerBoard, document.getElementById("playerBoard"));
    render(enemyBoard, document.getElementById("enemyBoard"), true);
}

function log(msg) {
    let li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("logList").appendChild(li);
}

function reiniciarJogo() {
    playerBoard = criarTabuleiro();
    enemyBoard = criarTabuleiro();

    gerarNavios(playerBoard);
    gerarNavios(enemyBoard);

    turno = true;
    alvoIA = null;
    jogadasIA.clear();

    document.getElementById("logList").innerHTML = "";

    atualizar();
}

reiniciarJogo();