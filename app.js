const counter = (() => {
    let _moveCount = 0;

    function addCount() {
        _moveCount++;
    }

    // alternate X and O
    function xOrO() {
        if (_moveCount % 2 == 0) {
            return "X";
        } else {
            return "O";
        }
    }

    // returns which player won
    function winner() {
        if (_moveCount % 2 == 0) {
            return "Player 1 Won!";
        } else {
            return "Player 2 Won!";
        }
    }

    return {
        addCount,
        xOrO,
        winner
    }
})();

const displayController = (() => {
    function update() {
        this.innerHTML = counter.xOrO();
    }

    function resetDisplay() {
        console.log("working")
        for (let square of gameBoard.eventArray) {
            square.innerHTML = "";
        }
    }

    return {
       update,
       resetDisplay
    }
})();


const gameBoard = (() => {
    const board = {topLeft: "0", topMid: "1", topRight: "2", midLeft: "3", midMid: "4", midRight: "5", botLeft: "6", botMid: "7", botRight: "8"};

    const square0 = document.querySelector('.square0');
    const square1 = document.querySelector('.square1');
    const square2 = document.querySelector('.square2');
    const square3 = document.querySelector('.square3');
    const square4 = document.querySelector('.square4');
    const square5 = document.querySelector('.square5');
    const square6 = document.querySelector('.square6');
    const square7 = document.querySelector('.square7');
    const square8 = document.querySelector('.square8');
    const status = document.querySelector(".status");
    const resetBtn = document.querySelector(".reset");
    const eventArray = [square0, square1, square2, square3, square4, square5, square6, square7, square8];

    // matches class name of UI to board and returns the key
    function _returnKey(className) {
        for (let [key, value] of Object.entries(board)) {
            if (value == className) {
                return key;
            }
        }
    }

    // checks for 3 in a row
    function _checkWin() {
        let topLeft = board.topLeft;
        let topMid = board.topMid;
        let topRight = board.topRight;
        let midLeft = board.midLeft;
        let midMid = board.midMid;
        let midRight = board.midRight;
        let botLeft = board.botLeft;
        let botMid = board.botMid;
        let botRight = board.botRight;
        // horizontal wins
        if (topLeft == board.topMid && topLeft == topRight) {
            status.innerHTML = counter.winner();
        } else if (midLeft == midMid && midLeft == midRight) {
            status.innerHTML = counter.winner();
        } else if (botLeft == botMid && botLeft == botRight) {
            status.innerHTML = counter.winner();
        // vertical wins
        } else if (topMid == midMid && topMid == botMid) {
            status.innerHTML = counter.winner();
        } else if (topRight == midRight && topRight == botRight) {
            status.innerHTML = counter.winner();
        }  else if (topLeft == midLeft && topLeft == botLeft) {
            status.innerHTML = counter.winner();
        // diagonal wins
        } else if (topLeft == midMid && topLeft == botRight) {
            status.innerHTML = counter.winner();
        } else if (topRight == midMid && topRight == botLeft) {
            status.innerHTML = counter.winner();
        }
    }

    resetBtn.addEventListener("click", reset);

    // sets key to correspond to index
    function resetBoard() {
        let index = 0;
        for (let [key, value] of Object.entries(board)) {
            board[key] = index;
            index++;
        }
    }

    // reset everything
    function reset() {
        resetBoard();
        displayController.resetDisplay();
    }

    // updates board after a move
    function _updateData(className) {
        board[_returnKey(className)] = counter.xOrO();
    }


    // add event listeners
    for (let event of eventArray) {
        event.addEventListener('click', displayController.update, {once: true});
        event.addEventListener('click', ()=> {
            event.classList.remove('hover');
            _updateData(event.className[6]);
            _checkWin();
            counter.addCount();
        }, {once:true});
    };

    return {
        eventArray,
        board
    };
})();
