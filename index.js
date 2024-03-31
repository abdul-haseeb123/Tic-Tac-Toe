let p1Mark = ''
let p2Mark = ''
let isitP1turn = true

const winningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let p1Map = [0, 0, 0, 0, 0, 0, 0, 0]
let p2Map = [0, 0, 0, 0, 0, 0, 0, 0]

function checkComb(comb, pMap)
{
    let flag = true
    for(let i=0; i<comb.length; i++)
    {
        if(pMap[comb[i]] != 1)
        {
            flag = false
            break
        }
    }
    return flag

}

function findWinningComb(pMap, combs)
{
    // let flag = false
    for(let i=0; i<combs.length; i++)
    {
        if(checkComb(combs[i], pMap) == true)
        {
            return combs[i]
        }
    }
}

function checkGameWon(pMap, combs)
{
    let flag = false
    for(let i=0; i<combs.length; i++)
    {
        if(checkComb(combs[i], pMap) == true)
        {
            flag = true
            break
        }
    }
    return flag
}

function enterMove(boxid, pMap) {
    let id = parseInt(boxid)
    pMap[id] = 1
    if (checkGameWon(pMap, winningCombs) == true) {
        endGame()
        displayResult()
    }
}

function endGame()
{
    const h1 = document.querySelector('h1')
    h1.style.display = "block"
    // first check who has won the game
    if(checkGameWon(p1Map, winningCombs) == true)
    {
        // p1 has won the game
        
        h1.innerHTML += "Player 1 has won the game"
        let comb = findWinningComb(p1Map, winningCombs)
        for(let i=0; i<comb.length; i++)
        {
            comb[i] = comb[i].toString()
            const td = document.getElementById(comb[i])
            td.style.backgroundColor = '#235' 
        }
    }
    else if(checkGameWon(p2Map, winningCombs) == true)
    {
        // p2 has won the game
        h1.innerHTML += "Player 2 has won the game"
        let comb = findWinningComb(p2Map, winningCombs)
        for(let i=0; i<comb.length; i++)
        {
            comb[i] = comb[i].toString()
            const td = document.getElementById(comb[i])
            td.style.backgroundColor = '#235' 
        }
    }
    else{
        h1.innerHTML += "Game has been drawn"
    }
}

function displayResult()
{
    setTimeout(startGame, 5000)
}

function startGame() {
    const choiceBox = document.getElementsByClassName("choices")[0];
    choiceBox.style.display = 'flex';

}

const choiceButtons = document.getElementById("choices").children

for (let i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].addEventListener("click", () => {
        const current = document.getElementsByClassName("active")
        current[0].className = current[0].className.replace("active", "")
        choiceButtons[i].className += "active"

    })
}

function refreshBoard() {
    const allTds = document.querySelectorAll('td')
    allTds.forEach(element => {
        element.innerHTML = '&nbsp;'
    })
}

function choicesSelected() {
    const activeBtn = document.getElementsByClassName("active")[0]
    if (activeBtn.innerHTML == "X") {
        p1Mark = activeBtn.innerHTML
        p2Mark = "O"
    }
    else {
        p1Mark = activeBtn.innerHTML
        p2Mark = "X"
    }
    const choicesDiv = document.getElementsByClassName("choices")[0]
    choicesDiv.style.display = 'none'
    // document.querySelector('button').style.visibility = 'hidden'
    refreshBoard()
    loadGame()
}

function loadGame() {
    const allBoxes = document.querySelectorAll('td')
    p1Map = [0, 0, 0, 0, 0, 0, 0, 0]
    p2Map = [0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].addEventListener('click', () => {
            const box = allBoxes[i]
            const h1 = document.querySelectorAll('h1')[1]
            if (isitP1turn == true) {
                enterMove(box.id, p1Map)
                h1.innerHTML = "Player 2 Turn"
                box.innerHTML = p1Mark
                isitP1turn = false
            }
            else {
                enterMove(box.id, p2Map)
                h1.innerHTML = "Player 1 Turn"
                box.innerHTML = p2Mark
                isitP1turn = true
            }
        })
    }
}
