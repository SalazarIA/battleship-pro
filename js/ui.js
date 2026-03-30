function iniciarJogo(){
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    bg.play().catch(()=>{});
    reiniciarJogo();
}

function efeito(tipo, el){
    let e=document.createElement("div");
    e.className=tipo;
    let r=el.getBoundingClientRect();
    e.style.left=r.left+"px";
    e.style.top=r.top+"px";
    document.body.appendChild(e);
    setTimeout(()=>e.remove(),500);
}

function render(b,el,hide=false){
    el.innerHTML="";
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            let c=document.createElement("div");
            c.classList.add("celula");

            if(b[i][j]==NAVIO&&!hide) c.classList.add("navio");
            if(b[i][j]==2) c.classList.add("hit");
            if(b[i][j]==3) c.classList.add("miss");

            c.onclick=()=>{
                if(!turno||!hide) return;

                let before=b[i][j];
                atacar(enemyBoard,i,j,true);
                atualizar();

                efeito(before==NAVIO?"explosion":"splash",c);
                setTimeout(turnoIA,600);
            };

            el.appendChild(c);
        }
    }
}

function atualizar(){
    render(playerBoard,playerBoardEl);
    render(enemyBoard,enemyBoardEl,true);
    fim();
}

function fim(){
    if(contarRestantes(enemyBoard)==0){
        tela("👑 VITÓRIA");
    }
    if(contarRestantes(playerBoard)==0){
        tela("💀 DERROTA");
    }
}

function tela(txt){
    let t=document.createElement("div");
    t.className="end";
    t.textContent=txt;
    document.body.appendChild(t);
}

function toggleSom(){
    somLigado=!somLigado;
    if(!somLigado) bg.pause();
    else bg.play().catch(()=>{});
}

function reiniciarJogo(){
    playerBoard=criarTabuleiro();
    enemyBoard=criarTabuleiro();

    gerarNavios(playerBoard);
    gerarNavios(enemyBoard);

    turno=true;
    jogadasIA.clear();

    atualizar();
}

const playerBoardEl=document.getElementById("playerBoard");
const enemyBoardEl=document.getElementById("enemyBoard");