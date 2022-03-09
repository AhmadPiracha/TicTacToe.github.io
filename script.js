const winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn;
const XClass = 'x';
const CircleClass = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winMessageElement = document.getElementById('win-msg');
const winMessage = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restart-button')

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(XClass);
        cell.classList.remove(CircleClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {
            once: true
        });
    });
    setBoardHover();
    winMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CircleClass : XClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHover();
    }
}

function endGame(draw) {
    if (draw) {
        winMessage.innerText = 'Draw';
    } else {
        winMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(XClass) || cell.classList.contains(CircleClass);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHover(params) {
    board.classList.remove(XClass);
    board.classList.remove(CircleClass);
    if (circleTurn) {
        board.classList.add(CircleClass);
    } else {
        board.classList.add(XClass);

    }
}

function checkWin(currentClass) {
    return winArray.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}