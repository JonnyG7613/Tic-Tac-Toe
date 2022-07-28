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
        let result = checkConditions()
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
    console.log(checkBoard)
    if ( //checks rows for winning condition
        ((checkBoard[0] == player) && (checkBoard[1] == player) && (checkBoard[2] == player)) ||
        ((checkBoard[3] == player) && (checkBoard[4] == player) && (checkBoard[5] == player)) ||
        ((checkBoard[6] == player) && (checkBoard[7] == player) && (checkBoard[8] == player)) ||
        //checks columns for winning condition
        ((checkBoard[0] == player) && (checkBoard[3] == player) && (checkBoard[6] == player)) ||
        ((checkBoard[1] == player) && (checkBoard[4] == player) && (checkBoard[7] == player)) ||
        ((checkBoard[2] == player) && (checkBoard[5] == player) && (checkBoard[8] == player)) ||
        //checks diagonals for winning condition
        ((checkBoard[0] == player) && (checkBoard[4] == player) && (checkBoard[8] == player)) ||
        ((checkBoard[2] == player) && (checkBoard[4] == player) && (checkBoard[6] == player))) {
        if (player == 'X') {
            return 1
        } else {
            return -1
        }
    }
    for (i = 0; i < 9; i++) {
        if (checkBoard[i] === "") {
            return 2
        } else {
            tied = true
        }
    }
    if (tied == true) { return 0 }
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
        console.log(`${i}`)
        if (boardArray[i].innerText == '') {
            boardArray[i].innerText = player
            let score = minimax(boardArray, player)
            console.log(`setting board selection back to '', score is ${score}`)
            boardArray[i].innerText = ''
            console.log(`score: ${score} > bestScore: ${bestScore}`)
            if (score > bestScore) {
                bestScore = score
                bestMove = i
            }
        }
    }
    console.log(`hitting pickSelection next with bestMove being ${bestMove}`)
    pickSelection(boardArray[bestMove])
}


function minimax(gameBoard, player) {
    let result = checkConditions()
    if (result !== 2) {
        console.log(`returning ${result}`)
        return result
    }

    if (player == 'X') {
        let bestScore = -Infinity
        for (let i = 0; i < 9; i++) {
            if (gameBoard[i].innerText == '') {
                gameBoard[i].innerText = player
                let score = minimax(gameBoard, 'O')
                console.log(`i is ${i}`)
                gameBoard[i].innerText = ''
                if (score > bestScore) {
                    bestScore = score
                }
            }
        }
        return bestScore
    }
    else {
        let bestScore = Infinity
        for (let j = 0; j < 9; j++) {
            if (gameBoard[j].innerText == '') {
                gameBoard[j].innerText = player
                let score = minimax(gameBoard, 'X')
                console.log(`j is ${j}`)
                gameBoard[j].innerText = ''
                if (score < bestScore) {
                    bestScore = score
                }
            }
        }
        return bestScore
    }
}
