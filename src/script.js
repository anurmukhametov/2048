import Cell from "./modules/cell.js";
import {
	rightSwipe,
	leftSwipe,
	upSwipe,
	downSwipe,
	spawnCell,
	paintCell,
	isFilled,
} from "./modules/logic.js";

const N = 4;
const cellArray = new Array(N);

for (let i = 0; i < N; i++) {
	cellArray[i] = new Array(N);
}
for (let i = 0; i < N; i++) {
	for (let j = 0; j < N; j++) {
		cellArray[i][j] = new Cell(`${i + 1}${j + 1}`);
	}
}
restart();

//#region DESKTOP SWIPE
document.onkeydown = function (event) {
	switch (event.key) {
		case "ArrowRight":
			rightSwipe(cellArray);
			break;
		case "ArrowLeft":
			leftSwipe(cellArray);
			break;
		case "ArrowDown":
			downSwipe(cellArray);
			break;
		case "ArrowUp":
			upSwipe(cellArray);
			break;
		default:
			return;
	}
	if (isGameOver(cellArray)) alert("GAME OVER");
	if (isVictory(cellArray)) alert("VICTORY");
};
//#endregion

//#region MOBILE SWIPE
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let x1 = null;
let y1 = null;

function handleTouchStart(event) {
	x1 = event.touches[0].clientX;
	y1 = event.touches[0].clientY;
}
function handleTouchMove(event) {
	if (!x1 || !y1) return false;

	let x2 = event.touches[0].clientX;
	let y2 = event.touches[0].clientY;

	let xDiff = x2 - x1;
	let yDiff = y2 - y1;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) rightSwipe(cellArray);
		else leftSwipe(cellArray);
	} else {
		if (yDiff > 0) downSwipe(cellArray);
		else upSwipe(cellArray);
	}

	x1 = null;
	y1 = null;

	if (isGameOver(cellArray)) alert("GAME OVER");
	if (isVictory(cellArray)) alert("VICTORY");
}
//#endregion

//#region GAME LOGIC
function isVictory(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			if (array[i][j].sum === 2048) {
				return true;
			}
		}
	}
	return false;
}

function isGameOver(array) {
	return (
		isFilled(array) && !isHorizontalShift(array) && !isVerticalShift(array)
	);
}

function restart() {
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			cellArray[i][j].reset();
		}
	}
	spawnCell(cellArray);
	spawnCell(cellArray);
	paintCell(cellArray);
	document.getElementById("score").innerText = 0;
}

function isHorizontalShift(array) {
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N - 1; j++) {
			if (array[i][j].sum === array[i][j + 1].sum) return true;
		}
	}
	return false;
}

function isVerticalShift(array) {
	for (let i = 0; i < N - 1; i++) {
		for (let j = 0; j < N; j++) {
			if (array[i][j].sum === array[i + 1][j].sum) return true;
		}
	}
	return false;
}
//#endregion
