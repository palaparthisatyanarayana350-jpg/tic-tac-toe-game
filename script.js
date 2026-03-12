let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");

let player1Name="";
let player2Name="";

let currentPlayer="X";
let gameActive=false;

let winPatterns=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

function showNameInput(){

document.getElementById("modeSelect").style.display="none";
document.getElementById("nameInput").style.display="block";

}

function startGame(){

player1Name=document.getElementById("player1").value || "Player 1";
player2Name=document.getElementById("player2").value || "Player 2";

document.getElementById("nameInput").style.display="none";
document.getElementById("gameArea").style.display="block";

statusText.innerHTML=player1Name+"'s Turn (X)";

gameActive=true;

cells.forEach((cell,index)=>{
cell.addEventListener("click",()=>playerMove(index));
});

}

function playerMove(index){

if(cells[index].innerHTML!=="" || !gameActive) return;

cells[index].innerHTML=currentPlayer;

if(checkWinner(currentPlayer)){

let winner=currentPlayer==="X"?player1Name:player2Name;

statusText.innerHTML=winner+" Wins 🏆";
gameActive=false;
return;

}

currentPlayer=currentPlayer==="X"?"O":"X";

statusText.innerHTML=(currentPlayer==="X"?player1Name:player2Name)+"'s Turn";

}

function checkWinner(player){

return winPatterns.some(pattern=>{
return pattern.every(index=>{
return cells[index].innerHTML===player;
});
});

}

function restartGame(){

cells.forEach(cell=>cell.innerHTML="");

currentPlayer="X";
gameActive=true;

statusText.innerHTML=player1Name+"'s Turn (X)";

}
