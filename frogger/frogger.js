const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const larguraDaGrade = 16;
const alturaDaGrade = 16;

const tamanhoDoTile = canvas.width / larguraDaGrade;

const mapa = `
................
................
################
>>>..>>>..>>>...
################
<...<...<...<...
################
<<<<........<<<<
################
>...>...>...>...
################
...<<<....<<<...
################
>>.....>>.....>>
################
................
`;

let grade;

function iniciaGrade(){
    grade = mapa.trim().split("\n").map(linha => linha.trim().split(""));
    setInterval(atualizaGrade, 1000);
}

function atualizaGrade(){
    grade.forEach((linha, i) => {
	if (linha[0] !== "#"){
	    rotacionaLinha(linha);
	}
    });
}

function rotacionaLinha(linha){
    let direcao = direcaoDaLinha(linha);
    if (direcao === "direita") linha.unshift(linha.pop());
    else if (direcao === "esquerda") linha.push(linha.shift());
}

function direcaoDaLinha(linha){
    for(let v of linha){
	switch (v){
	case ">": return "direita"; break;
	case "<": return "esquerda"; break;
	}
    }
    return false;
}

function desenhaGrade(){
    for(let i = 0; i < alturaDaGrade; i++){
	for(let j = 0; j < larguraDaGrade; j++){
	    let x = j * tamanhoDoTile;
	    let y = i * tamanhoDoTile;
	    switch (grade[i][j]){
	    case ".": ctx.fillStyle = "#3a3141"; break;
	    case "#": ctx.fillStyle = "#9c5b3e"; break;
	    case ">": case "<": ctx.fillStyle = "#9b3644"; break;
	    }
	    ctx.fillRect(x, y, tamanhoDoTile, tamanhoDoTile);
	}
    }
}

let sapo = {};

function iniciaSapo(){
    sapo.linha = 15;
    sapo.coluna = 7;
}

function moveSapo(direcao){
    switch (direcao){
    case "direita": sapo.coluna++; break;
    case "esquerda": sapo.coluna--; break;
    case "cima": sapo.linha -= 2; break;
    case "baixo": sapo.linha += 2; break;
    }
}

function limitaPosicaoSapo(){
    sapo.linha = Math.max(0, Math.min(sapo.linha, alturaDaGrade-1));
    sapo.coluna = Math.max(0, Math.min(sapo.coluna, larguraDaGrade-1));
}

function desenhaSapo(){
    ctx.fillStyle = "#7e975b";
    ctx.fillRect(sapo.coluna * tamanhoDoTile, sapo.linha * tamanhoDoTile, tamanhoDoTile, tamanhoDoTile);
}

function rodaJogo(){
    iniciaGrade();
    iniciaSapo();
    configuraControles();
    window.requestAnimationFrame(loop);
}

function configuraControles(){
    addEventListener("keydown", function (evento){
	switch (evento.key){
	case "ArrowRight": moveSapo("direita"); break;
	case "ArrowLeft": moveSapo("esquerda"); break;
	case "ArrowUp": moveSapo("cima"); break;
	case "ArrowDown": moveSapo("baixo"); break;
	}
	limitaPosicaoSapo();
    });
}

function loop(t){
    // atualizaGrade();
    desenhaGrade();
    desenhaSapo();
    window.requestAnimationFrame(loop);
}

window.onload = rodaJogo;
