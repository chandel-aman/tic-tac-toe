var turn = '';
const winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var gameWon = false;
var count = 0;
var checkVs = false;

//function to hide the play div
function removeLayer(){
    document.getElementById('layer1').style.display = "none";
    document.getElementById('layer2').style.display = "block";
}

//function to check the opponent
function checkPlayer(){
    document.getElementById('computer').addEventListener('click', function(){
        console.log("Playing against AI")
        checkVs = true;
        document.getElementById('computer').style.backgroundColor = "rgb(65, 165, 179)";
        document.getElementById('layer2_1').style.pointerEvents = "none";
    });
    document.getElementById('friend').addEventListener('click', function(){
        console.log("Playing against friend")
        checkVs = false;
        document.getElementById('friend').style.backgroundColor = "rgb(65, 165, 179)";
        document.getElementById('layer2_1').style.pointerEvents = "none";
    });
}

//function to check the symbol of first player
function assignX(){
    turn = 'X';
    document.getElementById('x').style.backgroundColor = "rgb(65, 165, 179)";
    document.getElementById('layer2_2').style.pointerEvents = "none";
    start();
}
function assignO(){
    turn = 'O';
    document.getElementById('o').style.backgroundColor = "rgb(65, 165, 179)";
    document.getElementById('layer2_2').style.pointerEvents = "none";
    start();
}
start = () =>{
    document.getElementById('layer2').style.display = "none";
    document.getElementById('gameBoard').style.display = "block";
    document.getElementById('turn').style.display = "block";
    document.getElementById('turn').innerHTML = "Turn of " + turn;
    count = 0;
    console.log("Game starts");
}
//function to change the turn
changeTurn = () =>{
    return (turn === 'X')?'O':'X';
}

//function to check the winner
function checkWinner(){
    let cells = document.getElementsByClassName("cell");
    winCombinations.forEach(e =>{
        if((cells[e[0]].innerText !== "") && (cells[e[0]].innerText === cells[e[1]].innerText) && (cells[e[1]].innerText === cells[e[2]].innerText)){
            gameWon = true;
        }
    })
}

//draw function
draw = () =>{
    document.getElementsByClassName('endGame')[0].style.display = "block";
    document.getElementById('win').innerHTML = "Game Tied";
    document.getElementById('turn').style.display = "none";
}

//game logic
document.addEventListener('click', e => {
    if(e.target.innerHTML === '' && gameWon == false){
        console.log(e.target.id);
        document.getElementById(e.target.id).innerText = turn;
        count++;
        checkWinner();
        if(gameWon){
            document.getElementsByClassName('endGame')[0].style.display = "block";
            document.getElementById('win').innerHTML = turn + " WON";
            document.getElementById('turn').style.display = "none";
        }
        else if(count == 9){
            draw();
        }
        else{
            turn = changeTurn();
            document.getElementById('turn').innerHTML = "Turn for " + turn;
        }
    }
})

//function to restart the game
function restart(){
    let cells = document.querySelectorAll('.cell');
    Array.from(cells).forEach(Element =>{
        Element.innerHTML = "";
    });
    document.getElementsByClassName('endGame')[0].style.display ="none";
    document.getElementById('turn').style.display ="block";
    gameWon = false;
    document.getElementById('layer2').style.display = "block";
    document.getElementById('gameBoard').style.display = "none";
    document.getElementById('turn').style.display = "none";
    document.getElementById('layer2_1').style.pointerEvents = "auto";
    document.getElementById('layer2_2').style.pointerEvents = "auto";
    let ch = document.getElementsByClassName("choice");
    for(let i=0;i<ch.length;i++){
        ch[i].style.backgroundColor = "";
    }
}