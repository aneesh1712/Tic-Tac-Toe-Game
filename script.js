const cells = document.querySelectorAll(".cell")
const status = document.querySelector("#status")
const restart = document.querySelector("#button")
const winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let options =["","","","","","","","",""]
let currentPlayer = "X"
let running = false
intialiseGame()

function intialiseGame(){
    cells.forEach(cell=> cell.addEventListener("click",cellClicked))
    restart.addEventListener("click",restartGame)
    status.textContent = `${currentPlayer}'s turn`
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")
    if(options[cellIndex] != "" || !running){
        return
    }
    updateCell(this,cellIndex)
    checkWinner()
}
function updateCell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X" ) ? "O" : "X"
    status.textContent = `${currentPlayer}'s turn`

}
function checkWinner(){
    let won = false
    for(let i = 0; i< winConditions.length; i++){
        const condition = winConditions[i]
        const cellA =options[condition[0]]
        const cellB =options[condition[1]]
        const cellC =options[condition[2]]
        if(cellA =="" || cellB == "" || cellC == ""){
            continue
         }
         if(cellA == cellB && cellB == cellC){
            won = true
            break;
         }
}
if(won){
    status.textContent = `${currentPlayer} wins!`
    running = false
}
else if(!options.includes("")){
    status.textContent= `DRAW!`
    running = false
}
else{
    changePlayer()
}
}

function restartGame(){
    currentPlayer = "X"
    options =["","","","","","","","",""]
    status.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent ="")
    running = true
}
