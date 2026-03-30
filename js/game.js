const TAM = 10;
const NAVIO = 1;
const TAM_NAVIO = 3;

let playerBoard, enemyBoard;
let turno = true;
let jogadasIA = new Set();
let somLigado = true;

const hitSound = new Audio("assets/hit.mp3");
const missSound = new Audio("assets/miss.mp3");
const bg = new Audio("assets/bg.mp3");
bg.loop = true;

function criarTabuleiro() {
    return Array.from({ length: TAM }, () => Array(TAM).fill(0));
}

function podePosicionar(b,l,c,dl,dc){
    for(let i=0;i<3;i++){
        let nl=l+i*dl, nc=c+i*dc;
        if(nl<0||nc<0||nl>=TAM||nc>=TAM||b[nl][nc]!=0) return false;
    }
    return true;
}

function posicionar(b,l,c,dl,dc){
    for(let i=0;i<3;i++) b[l+i*dl][c+i*dc]=NAVIO;
}

function gerarNavios(b){
    let d=[[0,1],[1,0],[1,1],[1,-1]];
    let n=0;
    while(n<4){
        let l=Math.random()*10|0;
        let c=Math.random()*10|0;
        let [dl,dc]=d[Math.random()*4|0];
        if(podePosicionar(b,l,c,dl,dc)){
            posicionar(b,l,c,dl,dc);
            n++;
        }
    }
}

function atacar(b,i,j,isPlayer=true){
    if(b[i][j]==2||b[i][j]==3) return;

    if(b[i][j]==NAVIO){
        b[i][j]=2;
        if(somLigado) hitSound.play().catch(()=>{});
        document.body.classList.add("shake");
        setTimeout(()=>document.body.classList.remove("shake"),200);
    } else {
        b[i][j]=3;
        if(somLigado) missSound.play().catch(()=>{});
        turno = isPlayer ? false : true;
    }
}

function turnoIA(){
    let i,j;
    do{
        i=Math.random()*10|0;
        j=Math.random()*10|0;
    }while(jogadasIA.has(i+"-"+j));

    jogadasIA.add(i+"-"+j);
    atacar(playerBoard,i,j,false);

    if(playerBoard[i][j]!=3) setTimeout(turnoIA,400);
    else turno=true;

    atualizar();
}

function contarRestantes(b){
    return b.flat().filter(x=>x==NAVIO).length;
}