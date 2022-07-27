document.getElementById("reset").onclick = function () { defaultGameBoard() }
let player = "X"
let boardArray = [...document.getElementsByClassName("board")]

function startUpBoard() {
    for (i = 0; i < boardArray.length; i++) {
        boardArray[i].onclick = function () { pickSelection(this) }
    }
}

function turnOffBoard() {
    for (i = 0; i < boardArray.length; i++) {
        boardArray[i].onclick = ''
    }
}

startUpBoard()

function pickSelection(element) {
    if (element.innerText == "") {
        element.innerText = player
        if (checkConditions() == 0) {
            player = setPlayer(player)
            document.getElementById("playerTurn").innerText = `Player ${player}'s turn.`
            if (player == 'O') { aiSelection() }
        } else if (checkConditions() == 1) {
            document.getElementById("playerTurn").innerText = `Player ${player} wins!`
            turnOffBoard()
            player = setPlayer(player)
        } else {
            document.getElementById("playerTurn").innerText = `You tied.`
            player = setPlayer(player)
        }
    } else {
        if (player == 'X') {
            alert("Pick another spot.")
        } else {
            aiSelection()
        }
    }
}

function loadBoard() {
    let boardArray = [...document.getElementsByClassName("board")]
    return boardArray
}

function defaultGameBoard() {
    loadBoard().forEach(element => {
        element.innerText = ""
    })
    startUpBoard()
    player = "X"
    document.getElementById("playerTurn").innerText = `Player ${player}'s turn.`
}

function setPlayer(player) {
    if (player == "X") return "O"
    return "X"
}

function checkConditions() {
    let checkBoard = []
    let tied = false
    loadBoard().forEach(element => {
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

function aiSelection() {
    document.getElementById("playerTurn").innerText = `Player ${player} is thinking.`
    randomPlacement = Math.floor(Math.random() * 9)
    console.log(randomPlacement)
    setTimeout(() => {
        pickSelection(boardArray[randomPlacement])
    }, 1000)
}