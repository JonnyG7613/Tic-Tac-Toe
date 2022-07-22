document.getElementById("reset").onclick = function () { defaultGameBoard() }
let player = "X"
let boardArray = [...document.getElementsByClassName("board")]

for (i = 0; i < boardArray.length; i++) {
    console.log(boardArray.length)
    boardArray[i].onclick = function () { pickSelection(this) }
}

function pickSelection(element) {
    if (element.innerText == "") {
        element.innerText = player
        if (checkConditions() == 0) {
            player = setPlayer(player)
            document.getElementById("playerTurn").innerText = `Player ${player}'s turn.`
        } else if (checkConditions() == 1) {
            document.getElementById("playerTurn").innerText = `Player ${player} wins!`
            player = setPlayer(player)
        } else {
            document.getElementById("playerTurn").innerText = `You tied.`
            player = setPlayer(player)
        }
    } else {
        alert("Pick another spot.")
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
    if (checkBoard[0] == player) {
        console.log(`${player} is on 0`)
        if (checkBoard[1] == player) {
            if (checkBoard[2] == player) {
                return 1
            }
        } else if (checkBoard[3] == player) {
            if (checkBoard[6] == player) {
                return 1
            }
        } else if (checkBoard[4] == player) {
            if (checkBoard[8] == player) {
                return 1
            }
        }
    }
    if ((checkBoard[1] == player) && (checkBoard[4] == player) && (checkBoard[7] == player)) {
        return 1
    }
    if ((checkBoard[2] == player) && (checkBoard[5] == player) && (checkBoard[8] == player)) {
        return 1
    }
    if ((checkBoard[4] == player) && (checkBoard[5] == player) && (checkBoard[6] == player)) {
        return 1
    }
    if ((checkBoard[6] == player) && (checkBoard[7] == player) && (checkBoard[8] == player)) {
        return 1
    }
    if ((checkBoard[2] == player) && (checkBoard[4] == player) && (checkBoard[6] == player)) {
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