let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

let winPatterns = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

cells.forEach((cell,index)=>{
    cell.addEventListener("click",()=>playerMove(index));
});

function playerMove(index){

    if(cells[index].innerHTML !== "" || !gameActive) return;

    cells[index].innerHTML = "X";

    if(checkWinner("X")){
        statusText.innerHTML="Player X Wins 🏆";
        gameActive=false;
        return;
    }

    computerMove();
}

function computerMove(){

    let emptyCells=[];

    cells.forEach((cell,i)=>{
        if(cell.innerHTML===""){
            emptyCells.push(i);
        }
    });

    if(emptyCells.length===0){
        statusText.innerHTML="Draw Game";
        return;
    }

    let randomIndex=emptyCells[Math.floor(Math.random()*emptyCells.length)];

    cells[randomIndex].innerHTML="O";

    if(checkWinner("O")){
        statusText.innerHTML="Computer Wins 🤖";
        gameActive=false;
        return;
    }
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
    statusText.innerHTML="Player X Turn";
}