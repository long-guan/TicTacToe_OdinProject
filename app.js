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

    return {
        addCount,
        xOrO
    }
})();

const displayController = (() => {
    function update() {
        this.innerHTML = counter.xOrO();
    }

    return {
       update
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

    const eventArray = [square0, square1, square2, square3, square4, square5, square6, square7, square8];

    // matches class name of UI to board and returns the key
    function _returnKey(className) {
        for (let [key, value] of Object.entries(board)) {
            if (value == className) {
                return key;
            }
        }
    }

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
            console.log('win');
        } else if (midLeft == midMid && midLeft == midRight) {
            console.log('win');
        } else if (botleft == botMid && botLeft == botRight) {
            console.log('win');
        // vertical wins
        } else if (topMid == midMid && topMid == botMid) {
            console.log('win');
        } else if (topRight == midRight && topRight == botRight) {
            console.log('win');
        }  else if (topLeft == midLeft && topLeft == botLeft) {
                console.log('win');
        // diagonal wins
        } else if (topLeft == midMid && topLeft == botRight) {
            console.log('win');
        } else if (topRight == midMid && topRight == botLeft) {
            console.log('win');
        }
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
            counter.addCount();
            _checkWin();
        }, {once:true});
    };

    return {
        eventArray,
        board
    };
})();
