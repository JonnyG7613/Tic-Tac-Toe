document.getElementById("reset").onclick = function () { defaultGameBoard() }
let player = "X"
let boardArray = [...document.getElementsByClassName("board")]
playerTurn = document.getElementById("playerTurn")

// Allows board locations to be clicked for placement
function startUpBoard() {
    for (let i = 0; i < boardArray.length; i++) {
        boardArray[i].onclick = function () { pickSelection(this) }
    }
}

// Disallows board locations to be clicked for placement
function turnOffBoard() {
    for (let i = 0; i < boardArray.length; i++) {
        boardArray[i].onclick = ''
    }
}

startUpBoard()

// Takes selected location on the game board and decides if turn is legal or not, then
// checks for winning conditions before switching player. Also returns a message directing
// the player to pick another spot if they selected an occupied spot.
function pickSelection(element) {
    if (element.innerText == "") {
        element.innerText = player
        let result = checkConditions(player)
        if (result == 2) {
            player = setPlayer(player)
            playerTurn.innerText = `Player ${player}'s turn.`
            if (player == 'O') { aiSmartSelection() }
        } else if ((result == 1) || (result == -1)) {
            playerTurn.innerText = `Player ${player} wins!`
            turnOffBoard()
            player = setPlayer(player)
        } else {
            playerTurn.innerText = `You tied.`
            player = setPlayer(player)
        }
    } else {
        if (player == 'X') {
            playerTurn.innerText = `Pick another spot, ${player}`
        } else {
            aiSmartSelection()
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
    // console.log(`gameBoard is ${checkBoard}`)
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
        // console.log('X wins -- 1')
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
        // console.log('O wins -- -1')
        return -1
    }

    for (let i = 0; i < 9; i++) {
        // console.log(`checking square ${i}`)
        if (checkBoard[i] == '') {
            // console.log(`found a blank square at square ${i} and returning 2`)
            return 2
        } else {
            // console.log('setting tied to true for now and moving to checking next square')
            tied = true
        }
    }

    if (tied) {
        // console.log('returning tied')
        return 0
    }
}

// Rudimentary AI selection
// will add more intelligent functionality
function aiRandomSelection() {
    playerTurn.innerText = `Player ${player} is thinking.`
    randomPlacement = Math.floor(Math.random() * 9)
    console.log(randomPlacement)
    setTimeout(() => {
        pickSelection(boardArray[randomPlacement])
    }, 1000)
}

// AI selection based on minimax
function aiSmartSelection() {
    let bestScore = -Infinity
    let bestMove
    for (let i = 0; i < 9; i++) {
        // console.log(`${i}`)
        if (boardArray[i].innerText == '') {
            boardArray[i].innerText = 'O'
            // console.log(`calling minimax at depth 0`)
            let score = minimax(boardArray, 0, false)
            boardArray[i].innerText = ''
            // console.log(`score: ${score} -- bestScore: ${bestScore}`)
            if (score > bestScore) {
                bestScore = score
                // console.log(`bestMove is currently ${i} and bestScore is ${bestScore}`)
                bestMove = i
            }
        }
    }
    // console.log(`hitting pickSelection next with bestMove being ${bestMove}`)
    pickSelection(boardArray[bestMove])
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
                gameBoard[i].innerText = 'O'
                // console.log(`calling minimax at depth ${depth + 1}`)
                let score = minimax(gameBoard, depth + 1, false)
                gameBoard[i].innerText = ''
                bestScore = Math.max(score, bestScore)
                // console.log(`X's bestScore is ${bestScore}`)
            }
        }
        return bestScore
    }
    else {
        let bestScore = Infinity
        for (let j = 0; j < 9; j++) {
            if (gameBoard[j].innerText == '') {
                gameBoard[j].innerText = 'X'
                // console.log(`calling minimax at depth ${depth + 1}`)
                let score = minimax(gameBoard, depth + 1, true)
                gameBoard[j].innerText = ''
                bestScore = Math.min(score, bestScore)
                // console.log(`O's bestScore is ${bestScore}`)
            }
        }
        return bestScore
    }
}