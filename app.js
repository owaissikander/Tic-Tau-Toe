
let playertext = document.getElementById('playertext')
let startbtn = document.getElementById('startbtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let indicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
console.log('=========>', boxes)

const O_TEXT = 'O'
const X_TEXT = 'X'
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null)

const startgame = () => {
    boxes.forEach(box => box.addEventListener('click', boxclicked))
}

function boxclicked(e) {
    // console.log(e.target)
    const id = e.target.id
    // console.log(id)

    if (!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        //currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        if (playerhaswon() !== false) {
            playertext.innerHTML = `${currentPlayer} has won`
            let wining_blocks = playerhaswon()
            wining_blocks.map(box => boxes[box].style.backgroundColor = indicator)
            console.log(wining_blocks);

        }


    }

}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
function playerhaswon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false

}

startbtn.addEventListener('click', restart)

//console.log(restart)

function restart() {
    spaces.fill(null)


    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    playertext = 'Tic Tau Toe'

    currentPlayer = X_TEXT
}
startgame()
