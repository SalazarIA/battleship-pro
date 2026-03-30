const TAM = 10;
const NAVIO = 1;
const TAM_NAVIO = 3;

let playerBoard, enemyBoard;
let turno = true;
let alvoIA = null;
let jogadasIA = new Set();

function criarTabuleiro() {
    return Array.from({ length: TAM }, () => Array(TAM).fill(0));
}

function podePosicionar(board, l, c, dl, dc) {
    for (let i = 0; i < TAM_NAVIO; i++) {
        let nl = l + i * dl;
        let nc = c + i * dc;

        if (nl < 0 || nl >= TAM || nc < 0 || nc >= TAM) return false;
        if (board[nl][nc] !== 0) return false;
    }
    return true;
}

function posicionar(board, l, c, dl, dc) {
    for (let i = 0; i < TAM_NAVIO; i++) {
        board[l + i * dl][c + i * dc] = NAVIO;
    }
}

function gerarNavios(board) {
    let dirs = [[0,1],[1,0],[1,1],[1,-1]];
    let n = 0;

    while (n < 4) {
        let l = Math.floor(Math.random()*TAM);
        let c = Math.floor(Math.random()*TAM);
        let [dl,dc] = dirs[Math.floor(Math.random()*4)];

        if (podePosicionar(board,l,c,dl,dc)) {
            posicionar(board,l,c,dl,dc);
            n++;
        }
    }
}

function atacar(board, i, j, isPlayer=true) {
    if (board[i][j] === 2 || board[i][j] === 3) return;

    if (board[i][j] === NAVIO) {
        board[i][j] = 2;
        log(`${isPlayer ? "Você" : "IA"} acertou (${i},${j})`);

        if (!isPlayer) alvoIA = [i,j];

    } else {
        board[i][j] = 3;
        log(`${isPlayer ? "Você" : "IA"} errou (${i},${j})`);
        turno = isPlayer ? false : true;
    }
}

function turnoIA() {
    let i, j;

    do {
        i = Math.floor(Math.random() * TAM);
        j = Math.floor(Math.random() * TAM);
    } while (jogadasIA.has(`${i}-${j}`));

    jogadasIA.add(`${i}-${j}`);

    atacar(playerBoard, i, j, false);

    if (playerBoard[i][j] !== 3) {
        setTimeout(turnoIA, 500);
    } else {
        turno = true;
    }
}