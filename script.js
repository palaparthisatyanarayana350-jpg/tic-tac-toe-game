const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let mode="";
let difficulty="";
let playerSymbol="X";
let computerSymbol="O";
let currentPlayer="X";

let gameActive=false;

let playerScore=0;
let computerScore=0;

const winPatterns=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

function selectMode(selected){
mode=selected;

document.getElementById("modeSelect").style.display="none";
document.getElementById("symbolSelect").style.display="block";
}

function setSymbol(symbol){

playerSymbol=symbol;
computerSymbol=symbol==="X"?"O":"X";

document.getElementById("symbolSelect").style.display="none";

if(mode==="pvc"){
document.getElementById("difficultySelect").style.display="block";
}else{
startGame();
}

}

function setDifficulty(level){
difficulty=level;

document.getElementById("difficultySelect").style.display="none";

startGame();
}

function startGame(){

document.getElementById("gameArea").style.display="block";

gameActive=true;
currentPlayer="X";

statusText.innerHTML="Game Started";

cells.forEach((cell,index)=>{
cell.innerHTML="";
cell.classList.remove("win");

cell.addEventListener("click",()=>playerMove(index));
});

}

function playerMove(index){

if(!gameActive) return;
if(cells[index].innerHTML!=="") return;

cells[index].innerHTML=currentPlayer;

if(checkWinner(currentPlayer)){

handleWin(currentPlayer);
return;

}

if(checkDraw()){
statusText.innerHTML="Game Draw 🤝";
gameActive=false;
return;
}

currentPlayer=currentPlayer==="X"?"O":"X";

if(mode==="pvc" && currentPlayer===computerSymbol){
setTimeout(computerMove,500);
}

}

function computerMove(){

let move;

if(difficulty==="easy"){
move=randomMove();
}

else if(difficulty==="medium"){
move=findWinningMove(computerSymbol);
if(move===-1) move=findWinningMove(playerSymbol);
if(move===-1) move=randomMove();
}

else{
move=minimaxMove();
}

cells[move].innerHTML=computerSymbol;

if(checkWinner(computerSymbol)){
handleWin(computerSymbol);
return;
}

if(checkDraw()){
statusText.innerHTML="Game Draw 🤝";
gameActive=false;
return;
}

currentPlayer=playerSymbol;

}

function randomMove(){

let empty=[];

cells.forEach((cell,i)=>{
if(cell.innerHTML==="") empty.push(i);
});

return empty[Math.floor(Math.random()*empty.length)];

}

function findWinningMove(symbol){

for(let pattern of winPatterns){

let values=pattern.map(i=>cells[i].innerHTML);

if(values.filter(v=>v===symbol).length===2 && values.includes("")){
return pattern[values.indexOf("")];
}

}

return -1;

}

function minimaxMove(){

let bestScore=-Infinity;
let move;

cells.forEach((cell,i)=>{

if(cell.innerHTML===""){

cell.innerHTML=computerSymbol;

let score=minimax(false);

cell.innerHTML="";

if(score>bestScore){
bestScore=score;
move=i;
}

}

});

return move;

}

function minimax(isMax){

if(checkWinner(computerSymbol)) return 10;
if(checkWinner(playerSymbol)) return -10;
if(checkDraw()) return 0;

if(isMax){

let best=-Infinity;

cells.forEach(cell=>{
if(cell.innerHTML===""){
cell.innerHTML=computerSymbol;
best=Math.max(best,minimax(false));
cell.innerHTML="";
}
});

return best;

}else{

let best=Infinity;

cells.forEach(cell=>{
if(cell.innerHTML===""){
cell.innerHTML=playerSymbol;
best=Math.min(best,minimax(true));
cell.innerHTML="";
}
});

return best;

}

}

function checkWinner(player){

for(let pattern of winPatterns){

if(pattern.every(i=>cells[i].innerHTML===player)){

pattern.forEach(i=>{
cells[i].classList.add("win");
});

return true;

}

}

return false;

}

function checkDraw(){
return [...cells].every(cell=>cell.innerHTML!=="");
}

function handleWin(player){

gameActive=false;

if(mode==="pvc"){

if(player===playerSymbol){
playerScore++;
document.getElementById("playerScore").innerText=playerScore;
statusText.innerHTML="Player Wins 🏆";
}

else{
computerScore++;
document.getElementById("computerScore").innerText=computerScore;
statusText.innerHTML="Computer Wins 🤖";
}

}else{

statusText.innerHTML=player+" Wins 🏆";

}

}

function restartGame(){

cells.forEach(cell=>{
cell.innerHTML="";
cell.classList.remove("win");
});

gameActive=true;
currentPlayer="X";

statusText.innerHTML="New Game";

}
