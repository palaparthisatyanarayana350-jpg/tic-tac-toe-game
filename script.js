const cells=document.querySelectorAll(".cell")
const status=document.getElementById("status")

let mode=""
let difficulty="easy"

let playerSymbol="X"
let aiSymbol="O"

let currentPlayer="X"

let player1="Player1"
let player2="Player2"

let score1=0
let score2=0

let gameActive=false

const winPatterns=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

function selectMode(m){

mode=m
document.getElementById("menu").style.display="none"

if(m==="pvp")
document.getElementById("names").style.display="block"
else
document.getElementById("symbolChoice").style.display="block"

}

function startPVP(){

player1=document.getElementById("p1").value||"Player1"
player2=document.getElementById("p2").value||"Player2"

document.getElementById("player1").innerText=player1
document.getElementById("player2").innerText=player2

document.getElementById("names").style.display="none"

startGame()

}

function chooseSymbol(s){

playerSymbol=s
aiSymbol=s==="X"?"O":"X"

document.getElementById("symbolChoice").style.display="none"
document.getElementById("difficulty").style.display="block"

}

function setDifficulty(d){

difficulty=d

document.getElementById("difficulty").style.display="none"
document.getElementById("player2").innerText="Computer"

startGame()

}

function startGame(){

gameActive=true
currentPlayer="X"

cells.forEach((cell,i)=>{

cell.innerHTML=""
cell.classList.remove("win")

cell.onclick=()=>move(i)

})

}

function move(i){

if(!gameActive) return
if(cells[i].innerHTML!=="") return

cells[i].innerHTML=currentPlayer

if(checkWinner(currentPlayer)) return

if(checkDraw()){
status.innerText="Draw 🤝"
gameActive=false
return
}

currentPlayer=currentPlayer==="X"?"O":"X"

if(mode==="pvc" && currentPlayer===aiSymbol)
setTimeout(aiMove,400)

}

function aiMove(){

if(!gameActive) return

let move

if(difficulty==="easy") move=randomMove()

else if(difficulty==="medium"){

move=findWin(aiSymbol)

if(move===-1)
move=findWin(playerSymbol)

if(move===-1)
move=randomMove()

}

else move=minimaxMove()

cells[move].innerHTML=aiSymbol

if(checkWinner(aiSymbol)) return

if(checkDraw()){
status.innerText="Draw 🤝"
gameActive=false
return
}

currentPlayer=playerSymbol

}

function randomMove(){

let empty=[]

cells.forEach((c,i)=>{
if(c.innerHTML==="") empty.push(i)
})

return empty[Math.floor(Math.random()*empty.length)]

}

function findWin(symbol){

for(let p of winPatterns){

let values=p.map(i=>cells[i].innerHTML)

if(values.filter(v=>v===symbol).length===2 && values.includes(""))
return p[values.indexOf("")]

}

return -1

}

function minimaxMove(){

let bestScore=-Infinity
let move

cells.forEach((cell,i)=>{

if(cell.innerHTML===""){

cell.innerHTML=aiSymbol

let score=minimax(false)

cell.innerHTML=""

if(score>bestScore){
bestScore=score
move=i
}

}

})

return move

}

function minimax(isMax){

if(simpleWinner(aiSymbol)) return 1
if(simpleWinner(playerSymbol)) return -1
if(checkDraw()) return 0

if(isMax){

let best=-Infinity

cells.forEach(cell=>{

if(cell.innerHTML===""){

cell.innerHTML=aiSymbol
best=Math.max(best,minimax(false))
cell.innerHTML=""

}

})

return best

}else{

let best=Infinity

cells.forEach(cell=>{

if(cell.innerHTML===""){

cell.innerHTML=playerSymbol
best=Math.min(best,minimax(true))
cell.innerHTML=""

}

})

return best

}

}

function simpleWinner(player){

for(let pattern of winPatterns){
if(pattern.every(i=>cells[i].innerHTML===player))
return true
}

return false

}

function checkWinner(player){

for(let pattern of winPatterns){

if(pattern.every(i=>cells[i].innerHTML===player)){

pattern.forEach(i=>cells[i].classList.add("win"))

status.innerText=player+" Wins 🏆"

gameActive=false

if(player==="X"){
score1++
document.getElementById("score1").innerText=score1
}else{
score2++
document.getElementById("score2").innerText=score2
}

return true

}

}

return false

}

function checkDraw(){

return [...cells].every(c=>c.innerHTML!=="")

}

function restart(){

cells.forEach(c=>{
c.innerHTML=""
c.classList.remove("win")
})

gameActive=true
currentPlayer="X"
status.innerText=""

}

function goHome(){

location.reload()

}
