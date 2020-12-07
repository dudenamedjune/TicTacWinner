let board1 = [
    ['x', 'x', 'o'],
    ['x', 'x', 'x'],
    ['o',  'o', ''],
];

let board2 = [
    ['x', 'x', 'o'],
    ['x', 'x', 'o'],
    ['x',  'o', ''],
];

let board3 = [
    ['x', 'x', 'o'],
    ['x', 'x', 'o'],
    ['o', 'o', 'x'],
];

let testTie = [
    ['x', 'o', 'x'],
    ['x', 'x', 'o'],
    ['o', 'x', 'o'], 
]

function checkWinner (row) {
    var first = row[0];
    var winner = true
    for (var index = 1; index < row.length; index++) {
     if (row[index] !== first) {
         winner = false
         break  
     }
   }
   return winner
}

function setColumnRows (columns, row, rowIndex) {
        row.forEach((column, columnIndex) => {
            if(rowIndex === 0 ) {
                columns[columnIndex] = [column]
            } else {
                columns[columnIndex].push(column) 
            }
        })   
}

function setDiagonalRows (diagonals, row, rowIndex) {
    var lastIndex = row.length - 1;
        row.forEach((column, columnIndex) => {
               if(columnIndex === rowIndex) diagonals[0].push(column) 
               if(columnIndex === lastIndex - rowIndex) diagonals[1].push(column)
        })   
}

function convertByRow (columns, diagonals) {
    return function update(row, rowIndex) {
        setColumnRows(columns, row, rowIndex)
        setDiagonalRows(diagonals, row, rowIndex)
    }
}

function isWinner (board, rowCallBack) {
    var winner = false;
    for (var rowIndex = 0; rowIndex < board.length; rowIndex++) {
        var row = board[rowIndex];
        if(rowCallBack) rowCallBack(row, rowIndex)
        if(checkWinner(row)) {
            winner = true
            break
        } 
    }
    return winner
}


function main (board) {
    var columns = [];
    var diagonals = [[], []];
    return  isWinner(board, convertByRow(columns, diagonals)) || isWinner(columns) || isWinner(diagonals);
}

console.log(main(board1)) //true 
console.log(main(board2)) //true
console.log(main(board3)) //true 
console.log(main(testTie)) //false