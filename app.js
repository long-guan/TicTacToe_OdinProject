const displayController = (() => {
    function update() {
        this.innerHTML = "X";
    }

    return {
       update
    }
})();

const gameBoard = (() => {
    const boardArray = {topLeft: "0", topMid: "1", topRight: "2", midLeft: "3", midMid: "4", midRight: "5", leftBot: "6", leftMid: "7", leftRight: "8"};

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


    function _updateArray() {
        for (let key in boardArray) {
            console.log(key);
        }
    }

    for (let event of eventArray) {
        event.addEventListener('click', displayController.update, {once: true});
        event.addEventListener('click', ()=> {
            event.classList.remove('hover');
            console.log(event.className[6]);
            _updateArray();
        }, {once:true});
    };

    return {
        boardArray
    };
})();
