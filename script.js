document.getElementById("reset").onclick = function () { defaultGameBoard() }
let player = "X"
let boardArray = [...document.getElementsByClassName("board")]
playerTurn = document.getElementById("playerTurn")
difficulty = document.getElementById("AISelect")

// Allows board locations to be clicked for placement
function startUpBoard() {
    for (let i = 0; i < boardArray.length; i++) {
        boardArray[i].onclick = function () {
            pickSelection(this)
        }
    }
}

// Disallows board locations to be clicked for placement
function turnOffBoard() {
    for (let i = 0; i < boardArray.length; i++) {
        boardArray[i].onclick = ''
    }
}

startUpBoard()

function aiSelection() {
    // Selects placement on gameBoard based on difficulty selected

    if (difficulty.value == 'smart') {
        aiSmartSelection()
    } else if (difficulty.value == 'random') {
        aiRandomSelection()
    } else {

        // Randomly determines if placement will be "smart" or random

        let rando = Math.random()
        if (rando > .5) {
            aiSmartSelection()
        } else {
            aiRandomSelection()
        }
    }

    startUpBoard()
}

// Takes selected location on the game board and decides if turn is legal or not, then
// checks for winning conditions before switching player. Also returns a message directing
// the player to pick another spot if they selected an occupied spot.
function pickSelection(element) {
    turnOffBoard()
    if (element.innerText == "") {
        element.innerText = player
        let result = checkConditions(player)
        if (result == 2) {
            player = setPlayer(player)
            playerTurn.innerText = `Player ${player}'s turn.`
            if (player == 'O') {
                aiSelection()
            }

            // Turns the board off if a player wins

        } else if ((result == 1) || (result == -1)) {
            playerTurn.innerText = `Player ${player} wins!`
            turnOffBoard()
            player = setPlayer(player)
        } else {
            playerTurn.innerText = `You tied.`
            turnOffBoard()
            player = setPlayer(player)
        }
    } else {
        if (player == 'X') {
            playerTurn.innerText = `Pick another spot, ${player}`
        } else {
            aiSelection()
        }
    }
}

// Erases the game board and sets the player back to X
function defaultGameBoard() {
    boardArray.forEach(element => {
        element.innerText = ""
    })
    startUpBoard()
    player = "X"
    playerTurn.innerText = `Player ${player}'s turn.`
}

// Switches player turn
function setPlayer(player) {
    if (player == "X") return "O"
    return "X"
}

// Checks to see if the most recent move resulted in a win or tie and if not, 
// returns a value to pickSelection that changes which player goes next
function checkConditions() {
    let checkBoard = []
    let tied = false
    boardArray.forEach(element => {
        checkBoard.push(element.innerText)
    })
    if ( //checks rows for winning condition
        ((checkBoard[0] == 'X') && (checkBoard[1] == 'X') && (checkBoard[2] == 'X')) ||
        ((checkBoard[3] == 'X') && (checkBoard[4] == 'X') && (checkBoard[5] == 'X')) ||
        ((checkBoard[6] == 'X') && (checkBoard[7] == 'X') && (checkBoard[8] == 'X')) ||
        //checks columns for winning condition
        ((checkBoard[0] == 'X') && (checkBoard[3] == 'X') && (checkBoard[6] == 'X')) ||
        ((checkBoard[1] == 'X') && (checkBoard[4] == 'X') && (checkBoard[7] == 'X')) ||
        ((checkBoard[2] == 'X') && (checkBoard[5] == 'X') && (checkBoard[8] == 'X')) ||
        //checks diagonals for winning condition
        ((checkBoard[0] == 'X') && (checkBoard[4] == 'X') && (checkBoard[8] == 'X')) ||
        ((checkBoard[2] == 'X') && (checkBoard[4] == 'X') && (checkBoard[6] == 'X'))) {
        return 1
    } else if ( //checks rows for winning condition
        ((checkBoard[0] == 'O') && (checkBoard[1] == 'O') && (checkBoard[2] == 'O')) ||
        ((checkBoard[3] == 'O') && (checkBoard[4] == 'O') && (checkBoard[5] == 'O')) ||
        ((checkBoard[6] == 'O') && (checkBoard[7] == 'O') && (checkBoard[8] == 'O')) ||
        //checks columns for winning condition
        ((checkBoard[0] == 'O') && (checkBoard[3] == 'O') && (checkBoard[6] == 'O')) ||
        ((checkBoard[1] == 'O') && (checkBoard[4] == 'O') && (checkBoard[7] == 'O')) ||
        ((checkBoard[2] == 'O') && (checkBoard[5] == 'O') && (checkBoard[8] == 'O')) ||
        //checks diagonals for winning condition
        ((checkBoard[0] == 'O') && (checkBoard[4] == 'O') && (checkBoard[8] == 'O')) ||
        ((checkBoard[2] == 'O') && (checkBoard[4] == 'O') && (checkBoard[6] == 'O'))) {
        return -1
    }

    for (let i = 0; i < 9; i++) {
        if (checkBoard[i] == '') {
            return 2
        } else {
            tied = true
        }
    }
    if (tied) {
        return 0
    }
}

// Rudimentary AI selection
// will add more intelligent functionality
function aiRandomSelection() {
    playerTurn.innerText = `Player ${player} is thinking.`
    randomPlacement = Math.floor(Math.random() * 9)
    // setTimeout(() => {
    pickSelection(boardArray[randomPlacement])
    // }, 1000)
}

// AI selection based on minimax
function aiSmartSelection() {
    console.log('xxx')
    let bestScore = Infinity
    let bestMove
    console.log('xxx2')
    playerTurn.innerText = `Player ${player} is thinking.`
    for (let i = 0; i < 9; i++) {
        if (boardArray[i].innerText == '') {
            boardArray[i].innerText = 'O'
            let score = minimax(boardArray, 0, true)
            boardArray[i].innerText = ''
            if (score < bestScore) {
                bestScore = score
                bestMove = i
            }
        }
    }
    setTimeout(() => {
        pickSelection(boardArray[bestMove])
    }, 1000)

}


function minimax(gameBoard, depth, isMaximizer) {
    let result = checkConditions()
    if (result !== 2) {
        return result
    }

    if (isMaximizer) {
        let bestScore = -Infinity
        for (let i = 0; i < 9; i++) {
            if (gameBoard[i].innerText == '') {
                gameBoard[i].innerText = 'X'
                let score = minimax(gameBoard, depth + 1, false)
                gameBoard[i].innerText = ''
                bestScore = Math.max(score, bestScore)
            }
        }
        return bestScore
    }
    else {
        let bestScore = Infinity
        for (let j = 0; j < 9; j++) {
            if (gameBoard[j].innerText == '') {
                gameBoard[j].innerText = 'O'
                let score = minimax(gameBoard, depth + 1, true)
                gameBoard[j].innerText = ''
                bestScore = Math.min(score, bestScore)
            }
        }
        return bestScore
    }
}