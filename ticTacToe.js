let state = 1;
let count = 0;
let arr = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];
let history = [{
    currentPlayer: 1,
    currentArr: arr.map(i => i)
}];
let winCase = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

//get element from html 
const currentPlayer = document.getElementById('turn');
const winner = document.getElementById('winner');
const boxes = document.querySelectorAll('#box');
const historyContainer = document.getElementById('history');

// Render function
const renderCrossElement = () => {
    const drawBox = document.createElement('div');
    const cross = document.createElement('div');
    const crossSlash = document.createElement('div');

    // adding attribute 
    drawBox.className = 'draw-box';
    cross.className = 'cross';
    crossSlash.className = 'cross-slash';

    //adding child to drawBox
    drawBox.appendChild(cross);
    drawBox.appendChild(crossSlash);

    return drawBox;
}

const renderCircleElement = () => {
    const drawBox = document.createElement('div');
    const circle = document.createElement('div');

    // adding attribute 
    drawBox.className = 'draw-box';
    circle.className = 'circle';

    //adding child to drawBox
    drawBox.appendChild(circle);

    return drawBox;
}

const renderHistoryElement = (step) => {
    const historyBoxElement = document.createElement('div');
    const historyElement = document.createElement('h4');
    const textNode = document.createTextNode("Step: #" + step);

    //adding attribute
    historyElement.className = 'history';
    historyBoxElement.className = 'history-box';

    //adding child to container
    historyElement.appendChild(textNode);
    historyBoxElement.appendChild(historyElement);

    historyBoxElement.addEventListener('click', (event) => {
        arr = history[step].currentArr?.map(i => i);
        count = step;
        boxes.forEach((box, index) => {
            box.innerHTML = "";
            if (arr[index] === 1) {
                box.appendChild(renderCrossElement());
            }
            if (arr[index] === 2) {
                box.appendChild(renderCircleElement());
            }
        })
        state = history[step]?.currentPlayer;
        currentPlayer.innerHTML = state === 1 ? 'X' : 'O';
    });
    return historyBoxElement;
}

// Process function
const checkIsWin = () => {
    let flag = false;
    for (let i = 0; i < winCase.length; i++) {
        flag = (arr[winCase[i][0]] === arr[winCase[i][1]]) && (arr[winCase[i][0]] === arr[winCase[i][2]]) && (arr[winCase[i][0]] !== 0);
        if (flag) {
            return flag;
        }
    }
    return flag;
}

const saveHistory = (step, currentState) => {
    historyContainer.appendChild(renderHistoryElement(step));
    history.push({
        currentState: currentState,
        currentArr: arr.map((item) => item)
    });
}

boxes.forEach((box, index) => {
    box.addEventListener('click', (event) => {
        if (arr[index] === 0) {
            if (state === 1) {
                box.appendChild(renderCrossElement());
                arr[index] = 1;
                state = 2;
            } else {
                box.appendChild(renderCircleElement());
                arr[index] = 2;
                state = 1
            }
            saveHistory(count++, state);
            currentPlayer.innerHTML = state === 1 ? 'X' : 'O';
        }
        if (checkIsWin()) {
            winner.innerHTML = state === 1 ? 'O Win' : 'X Win';
            winner.style.display = 'block';
            arr = arr.map((item) => 1);
            return;
        }
    })
})