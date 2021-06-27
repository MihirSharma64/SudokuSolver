// console.log('Hello');
let input = new Array(9);
let solutionarr = new Array(9);
for (let i = 0; i < 9; i++) {
	input[i] = new Array(9);
	solutionarr[i] = new Array(9);
}

for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 9; j++) {
		input[i][j] = 0;
		solutionarr[i][j] = 0;
	}
}
let flag = false;
let boxes = document.querySelectorAll('.sudoku-container input');
let boxes2 = document.querySelectorAll('.visualizer-container input');

let solvebtn = document.querySelector('.solve');
let resetbtn = document.querySelector('.reset');
for (let i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener('change', handleValueChange);
}

function handleValueChange(e) {
	flag = true;
	let targetID = e.target.id;
	let cellNo = Number(targetID);
	let row = Math.floor(cellNo / 9);
	let col = Math.floor(cellNo % 9);
	console.log(row + ' ' + col);
	let val = Number(e.target.value);
	input[row][col] = val;
	solutionarr[row][col] = val;
}

solvebtn.addEventListener('click', solve);

function solve() {
	// func(input, 0, 0);
	func(solutionarr, 0, 0);

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let cellNo = i * 9 + j;
			// let box = document.querySelector(`#${cellNo}`);
			boxes[cellNo].value = solutionarr[i][j];
		}
	}
}

function func(solutionarr, row, col) {
	if (row == 9) {
		return true;
	}

	let nextrow = row;
	let nextcol = col;

	if (col == solutionarr[0].length - 1) {
		nextrow++;
		nextcol = 0;
	} else {
		nextcol++;
	}

	if (solutionarr[row][col] != 0) {
		// some number is already placed
		tempans = func(solutionarr, nextrow, nextcol);
		return tempans;
	} else {
		// box is empty, so try to place something
		for (let i = 1; i <= 9; i++) {
			if (canBePlaced(solutionarr, row, col, i)) {
				solutionarr[row][col] = i;

				let cellNo = row * 9 + col;
				tempans = func(solutionarr, nextrow, nextcol);
				if (tempans) {
					return true;
				}
				solutionarr[row][col] = 0;
			}
		}
	}

	return false;
}

function canBePlaced(solutionarr, row, col, n) {
	for (let j = 0; j < 9; j++) {
		if (solutionarr[row][j] == n) {
			return false;
		}
	}

	for (let i = 0; i < 9; i++) {
		if (solutionarr[i][col] == n) {
			return false;
		}
	}

	let strow = row - (row % 3);
	let stcol = col - (col % 3);

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (solutionarr[i + strow][j + stcol] == n) {
				return false;
			}
		}
	}

	return true;
}

resetbtn.addEventListener('click', function () {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			solutionarr[i][j] = 0;
		}
	}

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let cellNo = i * 9 + j;
			// let box = document.querySelector(`#${cellNo}`);
			console.log(cellNo);
			boxes[cellNo].value = '';
		}
	}
});

let visualizerbtn = document.querySelector('.visualize');

visualizerbtn.addEventListener('click', visualize);

function visualize() {
	func2(input, 0, 0);
}

function func2(board, row, col) {
	if (row == 9) {
		window.setTimeout(() => {
			return true;
		}, 1000);
	}

	let nextrow = row;
	let nextcol = col;

	if (col == board[0].length - 1) {
		nextrow++;
		nextcol = 0;
	} else {
		nextcol++;
	}

	if (board[row][col] != 0) {
		// some number is already placed
		window.setTimeout(() => {
			tempans = func2(board, nextrow, nextcol);
			return tempans;
		}, 1000);
	} else {
		// box is empty, so try to place something

		for (let i = 1; i <= 9; i++) {
			window.setTimeout(() => {
				if (canBePlaced2(board, row, col, i)) {
					board[row][col] = i;
					let cellNo = row * 9 + col;
					boxes2[cellNo].value = i;
					tempans = func2(board, nextrow, nextcol);
					if (tempans) {
						return true;
					}
					board[row][col] = 0;
					boxes2[cellNo].value = '';
				}
			}, 1000);
		}
	}

	return false;
}

function canBePlaced2(board, row, col, n) {
	for (let j = 0; j < 9; j++) {
		if (board[row][j] == n) {
			return false;
		}
	}

	for (let i = 0; i < 9; i++) {
		if (board[i][col] == n) {
			return false;
		}
	}

	let strow = row - (row % 3);
	let stcol = col - (col % 3);

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i + strow][j + stcol] == n) {
				return false;
			}
		}
	}

	return true;
}
