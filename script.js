document.getElementById("reset").onclick = function () { defaultGameBoard() }
let player = "X"
let boardArray = [...document.getElementsByClassName("board")]
playerTurn = document.getElementById("playerTurn")

// Allows board locations to be clicked for placement
function startUpBoard() {
    for (i = 0; i < boardArray.length; i++) {
        boardArray[i].onclick = function () { pickSelection(this) }
    }
}

// Disallows board locations to be clicked for placement
function turnOffBoard() {
    for (i = 0; i < boardArray.length; i++) {
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
        if (checkConditions() == 0) {
            player = setPlayer(player)
            playerTurn.innerText = `Player ${player}'s turn.`
            if (player == 'O') { aiSelection() }
        } else if (checkConditions() == 1) {
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
    console.log(checkBoard)
    if (((checkBoard[0] == player) && (checkBoard[1] == player) && (checkBoard[2] == player)) ||
        ((checkBoard[0] == player) && (checkBoard[3] == player) && (checkBoard[6] == player)) ||
        ((checkBoard[0] == player) && (checkBoard[4] == player) && (checkBoard[8] == player)) ||
        ((checkBoard[1] == player) && (checkBoard[4] == player) && (checkBoard[7] == player)) ||
        ((checkBoard[2] == player) && (checkBoard[5] == player) && (checkBoard[8] == player)) ||
        ((checkBoard[3] == player) && (checkBoard[4] == player) && (checkBoard[5] == player)) ||
        ((checkBoard[6] == player) && (checkBoard[7] == player) && (checkBoard[8] == player)) ||
        ((checkBoard[2] == player) && (checkBoard[4] == player) && (checkBoard[6] == player))) {
        return 1
    }
    for (i = 0; i < checkBoard.length; i++) {
        if (checkBoard[i] === "") {
            tied = false
            break
        } else {
            tied = true
        }
    }
    if (tied == true) { return 2 }
    return 0
}

// Rudimentary AI selection
// will add more intelligent functionality
function aiSelection() {
    playerTurn.innerText = `Player ${player} is thinking.`
    randomPlacement = Math.floor(Math.random() * 9)
    console.log(randomPlacement)
    setTimeout(() => {
        pickSelection(boardArray[randomPlacement])
    }, 1000)
}