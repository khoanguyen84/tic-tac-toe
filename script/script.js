let width = 15;
let height = 15;
let A = [];
let B = [];
let data;
let frame;
let player;
let endGame;
let isValidPosition;
let size;
function start() {
    document.getElementById("message").innerHTML = "";
    frame = document.getElementById("carogame");
    message = document.getElementById("message");
    player = 1;
    endGame = 0;
    isValidPosition = 1;
    size = 5;
    data = "<table width = '700' heght = '200' cellpading = 3 cellspacing = 1 border= 1>";
    for (let i = 0; i <= height; i++) {
        B = new Array();
        for (let j = 0; j <= width; j++) {
            if (i == 0)
                B[j] = j
            else if (j == 0)
                B[j] = i
            else
                B[j] = 0;
        }
        A[i] = B;
    }
    draw();
}

function changeValue(positionX, positionY) {
    if (!endGame) {
        do {
            if (checkValidatePosition(positionX, positionY)) {
                alert('invalid position, please choice other position!');
                isValidPosition = 0;
                break;
            }
            isValidPosition = 1;
        }
        while (checkValidatePosition(positionX, positionY))

        if (isValidPosition) {
            data = "<table width = '700' heght = '200' cellpading = 3 cellspacing = 1 border= 1>";
            A[positionX][positionY] = player == 1 ? 1 : 20;
            draw();
            if (checkWin(positionX, positionY, player, size)) {
                message.innerHTML += '<h3>' + (player == 1 ? 'Player 1 ' : 'Player 2') + ' is winner </h3>';
                endGame = 1;
            };
            player = player == 1 ? 2 : 1;
        }
    }
}

function draw() {
    for (let i = 0; i <= height; i++) {
        data += "<tr>";
        for (let j = 0; j <= width; j++) {
            if (j == 0 || i == 0) {
                data += "<td style='text-align:center; padding: 5px 5px;width:30px;'>" + (i == 0 && j == 0 ? '&nbsp;&nbsp;' : A[i][j]) + "</td>";
            }
            else {
                data += "<td style='text-align:center; padding: 5px 5px; width=30px; cursor:pointer;' onclick='changeValue(" + i + "," + j + ");'>" + (A[i][j] == 1 ? 'x' : A[i][j] == 20 ? 'o' : '&nbsp;&nbsp;') + "</td>";
            }

        }
        data += "</tr>";
    }
    frame.innerHTML = data + '</table>';
}

function checkValidatePosition(x, y) {
    return A[x][y] != 0 || (x <= 0 || x > width || y <= 0 || y > width);
}

function getHorizontal(positionX, positionY) {
    let array = [];
    for (let j = 1; j <= width; j++) {
        array.push(A[positionX][j])
    }
    return array;
}

function getVertical(positionX, positionY) {
    let array = [];
    for (let i = 1; i <= height; i++) {
        array.push(A[i][positionY])
    }
    return array;
}

function getMainDiagonal(positionX, positionY) {
    let array = [];
    let start_x = positionX, start_y = positionY, end_x = positionX, end_y = positionY;
    while (start_x > 1 && start_y > 1) {
        start_x -= 1;
        start_y -= 1;
        if (start_x == 1 || start_y == 1) {
            break;
        }
    }
    while (end_x < height && end_y < width) {
        end_x += 1;
        end_y += 1;
        if (end_y == width || end_x == height) {
            break;
        }
    }
    while (start_x <= end_x) {
        array.push(A[start_x][start_y]);
        start_x++;
        start_y++;
    }
    return array;
}

function getAuxiliaryDiagonal(positionX, positionY) {
    let array = [];
    let start_x = positionX, start_y = positionY, end_x = positionX, end_y = positionY;
    while (start_x < height && start_y > 1) {
        start_x++;
        start_y--;
        if (start_x == height || start_y == 1) {
            break;
        }
    }
    while (end_x > 1 && end_y < width) {
        end_x--;
        end_y++;
        if (end_x == 1 || end_y == width) {
            break;
        }
    }
    for (let i = start_y; i <= end_y; i++) {
        array.push(A[start_x][start_y]);
        start_x--;
        start_y++;
    }
    return array;
}
function isWin(array, player) {
    let value = player == 1 ? 1 : 20;
    let total;
    for (let i = 0; i < array.length - size; i++) {
        total = 0;
        for (let j = i; j < size + i; j++) {
            total += array[j];
        }
        if (total == size * value || total == size * value)
            return true;
    }
    return false;
}
function checkWin(positionX, positionY, player, size) {
    return isWin(getHorizontal(positionX, positionY), player) ||
        isWin(getVertical(positionX, positionY), player) ||
        isWin(getMainDiagonal(positionX, positionY), player) ||
        isWin(getAuxiliaryDiagonal(positionX, positionY), player)
}