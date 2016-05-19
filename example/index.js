var socket = io('/tictactoe');
console.log(socket);

function disableSelect(e) { return false }
document.onselectstart = disableSelect;
document.onmousedown = disableSelect

for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
        function addMoveListener(elem, a, b) {
            elem.addEventListener('click', function(e) {
                e.preventDefault();
                socket.emit('move', a, b);
            }, true);
        }

        addMoveListener(document.querySelector('.y' + y + '>.x' + x), x, y);
    }
}

var gameElem = document.querySelector('.game');
var turnElem = document.querySelector('.turn');

socket.on('disconnect', function() {
    console.log('disconnected');
    gameElem.innerHTML = "Disconnected...";
    turnElem.innerHTML = "&nbsp;";
});

socket.on('game start', function() {
    console.log('game start');
    gameElem.innerHTML = "Game started.";
});

socket.on('board', function(board) {
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            var value = board[y][x];
            var elem = document.querySelector('.y' + y + '>.x' + x + '>.icon');
            switch (value) {
                case 0:
                    elem.innerHTML = 'X';
                    break;
                case 1:
                    elem.innerHTML = 'O';
                    break;
                default:
                    elem.innerHTML = '&nbsp;';
            }
        }
    }
});

var myTurn = undefined;

socket.on('turn start', function(turn) {
    console.log('turn start', turn);
    myTurn = turn;
    turnElem.innerHTML = "It's your turn."
});

socket.on('turn end', function(turn) {
    console.log('turn end', turn)
    turnElem.innerHTML = "&nbsp;"
});

socket.on('game end', function(winner) {
    console.log('game end', winner)
    turnElem.innerHTML = "&nbsp;"
    switch (winner) {
        case myTurn:
            gameElem.innerHTML = "You won!"
            break;
        case -1:
            gameElem.innerHTML = "It's a tie."
            break;
        case null:
            gameElem.innerHTML = "Disconnected..."
            break;
        default:
            gameElem.innerHTML = "You lost :("
    }
});


