/*--- constants ---*/

const colorLookup = {
    '0': 'white',
    '1': 'Black',
    '-1': 'Red',
};

const winIndexTriples = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


/*--- app's state (variables) ---*/
let board; // an array of col arrays
let turn; // 1 or -1
let winner; // null = no winner; 1 or -1 if there is a winner; 'T' = tie. 

/*--- cached element references ---*/
const cellEls = Array.from([...document.querySelectorAll('#board div')]);
const msgEl = document.querySelector('h1');


/*--- event listeners ---*/
document.getElementById('board').addEventListener('click', handlePlay)

/*--- functions ---*/
init();

//Initialize all states, then call render
function init() {
    //this should be the board
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // cells 0, 1, 2, 3, 4, 5, 6, 7, 8
    turn = 1;
    winner = null;
    render();
}

//Update all impacted states, then call render. 
function handlePlay(evt) {
    const idx = cellEls.indexOf(evt.target);
    if (winner === 0 || board[idx] === -1 || board[idx] === 1) return; //break here if already taken
    console.log(idx);
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    console.log(board);
    render();
}

function getWinner() {
    let winner = null;
    winIndexTriples.forEach(function (winCombo) {
        let total = board[winCombo[0]] + board[winCombo[1]] + board[winCombo[2]]; //With acknowledgements to Ripley
        if (total === 3) {
            winner = turn *= -1;
            //return 
        } else if (total === -3) {
            winner = turn *= -1;
            //return
        } else { //Tie logic
            //return
        }
    })
    return winner;
}

function renderMsg() {
    if (winner) {
        msgEl.innerHTML = `<span style="color: ${colorLookup[winner]}">${colorLookup[winner].toUpperCase()}</span> Wins!`;
    } else {
        msgEl.innerHTML = `<span style="color: ${colorLookup[turn]}">${colorLookup[turn].toUpperCase()}</span>'s Turn`;
    }
}

//Transfer (visualize) all states in the DOM
function render() {
    renderBoard();
    renderMsg();
}

function renderBoard() {
    board.forEach(function (cell, idx) {
        cellEls[idx].style.backgroundColor = colorLookup[cell];
    })
}