class Cell {
	constructor(id) {
		this.$el = document.getElementById(id);
		this.$sum = this.$el.innerText;
		this.$el.innerText = this.$sum;
	}
	set setSum(value) {
		this.$sum = value;
		this.$el.innerText = this.$sum;
	}
	get getSum() {
		return this.$sum;
	}
	get isEmpty() {
		return this.getSum === 0;
	}
	reset() {
		this.setSum = 0;
	}
	update() {
		this.setSum = this.getSum * 2;
	}
	paint() {
		switch (this.getSum) {
			case 2:
				this.$el.style.color = "#776e65";
				this.$el.style.backgroundColor = "#eee4da";
				this.$el.style.boxShadow = "none";
				break;
			case 4:
				this.$el.style.color = "#776e65";
				this.$el.style.backgroundColor = "#eee1c9";
				this.$el.style.boxShadow = "none";
				break;
			case 8:
				this.$el.style.color = "#f9f6f2";
				this.$el.style.backgroundColor = "#f3b27a";
				this.$el.style.boxShadow = "none";
				break;
			case 16:
				this.$el.style.color = "#f9f6f2";
				this.$el.style.backgroundColor = "#f69664";
				this.$el.style.boxShadow = "none";
				break;
			case 32:
				this.$el.style.color = "#f9f6f2";
				this.$el.style.backgroundColor = "#f77c5f";
				this.$el.style.boxShadow = "none";
				break;
			case 64:
				this.$el.style.color = "#f9f6f2";
				this.$el.style.backgroundColor = "#f75f3b";
				this.$el.style.boxShadow = "none";
				break;
			case 128:
				this.$el.style.color = "#f9f6f2";
				this.$el.style.backgroundColor = "#edd073";
				this.$el.style.boxShadow =
					"0 0 30px 10px rgb(243 215 116 / 24%), inset 0 0 0 1px rgb(255 255 255 / 14%)";
				break;
			case 256:
				this.$el.style.color = "#f9f6f2";
				this.$el.style.backgroundColor = "#edcc62";
				this.$el.style.boxShadow =
					"0 0 30px 10px rgb(243 215 116 / 32%), inset 0 0 0 1px rgb(255 255 255 / 19%)";
				break;
			case 512:
				this.$el.style.color = "#f9f6f2";
				this.$el.style.backgroundColor = "#edc950";
				this.$el.style.boxShadow =
					"0 0 30px 10px rgb(243 215 116 / 40%), inset 0 0 0 1px rgb(255 255 255 / 24%)";
				break;
			case 1024:
				this.$el.style.color = "#f9f6f2";
				this.$el.style.backgroundColor = "#edc53f";
				this.$el.style.boxShadow =
					"0 0 30px 10px rgb(243 215 116 / 48%), inset 0 0 0 1px rgb(255 255 255 / 29%)";
				break;
			case 2048:
				this.$el.style.color = "#f9f6f2";
				this.$el.style.backgroundColor = "#edc22e";
				this.$el.style.boxShadow =
					"0 0 30px 10px rgb(243 215 116 / 56%), inset 0 0 0 1px rgb(255 255 255 / 33%)";
				break;
			default:
				this.$el.textContent = "";
				this.$el.style.color = "#776e65";
				this.$el.style.backgroundColor = "#eee4da59";
				this.$el.style.boxShadow = "none";
				break;
		}
		let h = document.getElementById("11").clientHeight;
		this.$el.style.lineHeight = `${h}px`;
	}
}

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

//#region mobile swipe

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
}

//#endregion

function isVictory(array) {
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (array[i][j].getSum === 2048) {
				return true;
			}
		}
	}
	return false;
}

const M = 4;
const N = 4;

const cellArray = new Array(N);
for (let i = 0; i < M; i++) {
	cellArray[i] = new Array(N);
}
for (let i = 0; i < M; i++) {
	for (let j = 0; j < N; j++) {
		cellArray[i][j] = new Cell(`${i + 1}${j + 1}`);
		cellArray[i][j].reset();
	}
}
spawnCell(cellArray);
spawnCell(cellArray);
paintCell(cellArray);

function isGameOver(array) {
	return (
		isFilled(array) && !isHorizontalShift(array) && !isVerticalShift(array)
	);
}

function isHorizontalShift(array) {
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N - 1; j++) {
			if (array[i][j].getSum === array[i][j + 1].getSum) return true;
		}
	}
	return false;
}

function isVerticalShift(array) {
	for (let i = 0; i < M - 1; i++) {
		for (let j = 0; j < N; j++) {
			if (array[i][j].getSum === array[i + 1][j].getSum) return true;
		}
	}
	return false;
}

function isLeftShift(array) {
	for (let i = 0; i < M; i++) {
		for (let j = N - 1; j > 0; j--) {
			if (array[i][j].isEmpty) continue;
			if (
				array[i][j].getSum === array[i][j - 1].getSum ||
				array[i][j - 1].isEmpty
			)
				return true;
		}
	}

	return false;
}
function isRightShift(array) {
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N - 1; j++) {
			if (array[i][j].isEmpty) continue;
			if (
				array[i][j].getSum === array[i][j + 1].getSum ||
				array[i][j + 1].isEmpty
			)
				return true;
		}
	}
	return false;
}

function isUpShift(array) {
	for (let i = M - 1; i > 0; i--) {
		for (let j = 0; j < N; j++) {
			if (array[i][j].isEmpty) continue;
			if (
				array[i][j].getSum === array[i - 1][j].getSum ||
				array[i - 1][j].isEmpty
			)
				return true;
		}
	}

	return false;
}

function isDownShift(array) {
	for (let i = 0; i < M - 1; i++) {
		for (let j = 0; j < N; j++) {
			if (array[i][j].isEmpty) continue;
			if (
				array[i][j].getSum === array[i + 1][j].getSum ||
				array[i + 1][j].isEmpty
			)
				return true;
		}
	}
	return false;
}

function rightSwipe(cellArray) {
	if (isRightShift(cellArray)) {
		for (let i = 0; i < M; i++) {
			for (let j = N - 1; j > 0; j--) {
				rightShift(cellArray[i]);
				if (cellArray[i][j].getSum === cellArray[i][j - 1].getSum) {
					cellArray[i][j].update();
					cellArray[i][j - 1].reset();
				}
			}
		}
		spawnCell(cellArray);
	}
	paintCell(cellArray);
}

function rightShift(array) {
	let k = null;
	for (let j = N - 1; j >= 0; j--) {
		if (array[j].isEmpty && k === null) {
			k = j;
		}
		if (!array[j].isEmpty && k !== null) {
			array[k].setSum = array[j].getSum;
			array[j].reset();
			k--;
		}
	}
}

function leftSwipe(cellArray) {
	if (isLeftShift(cellArray)) {
		for (let i = 0; i < M; i++) {
			for (let j = 0; j < N - 1; j++) {
				leftShift(cellArray[i]);
				if (cellArray[i][j].getSum === cellArray[i][j + 1].getSum) {
					cellArray[i][j].update();
					cellArray[i][j + 1].reset();
				}
			}
		}
		spawnCell(cellArray);
	}
	paintCell(cellArray);
}

function leftShift(array) {
	let k = null;
	for (let j = 0; j < N; j++) {
		if (array[j].isEmpty && k === null) {
			k = j;
		}
		if (!array[j].isEmpty && k !== null) {
			array[k].setSum = array[j].getSum;
			array[j].reset();
			k++;
		}
	}
}

function upSwipe(cellArray) {
	if (isUpShift(cellArray)) {
		for (let j = 0; j < N; j++) {
			for (let i = 0; i < M - 1; i++) {
				const verticalCellArray = new Array();
				cellArray.forEach((array) => {
					array.forEach((element, index) => {
						if (index === j) verticalCellArray.push(element);
					});
				});
				upShift(verticalCellArray);
				verticalCellArray.forEach((element, index) => {
					cellArray[index][j].setSum = element.getSum;
				});

				if (cellArray[i][j].getSum === cellArray[i + 1][j].getSum) {
					cellArray[i][j].update();
					cellArray[i + 1][j].reset();
				}
			}
		}
		spawnCell(cellArray);
	}
	paintCell(cellArray);
}

function upShift(array) {
	let k = null;
	for (let j = 0; j < N; j++) {
		if (array[j].isEmpty && k === null) {
			k = j;
		}
		if (!array[j].isEmpty && k !== null) {
			array[k].setSum = array[j].getSum;
			array[j].reset();
			k++;
		}
	}
}

function downSwipe(cellArray) {
	if (isDownShift(cellArray)) {
		for (let j = 0; j < N; j++) {
			for (let i = M - 1; i > 0; i--) {
				const verticalCellArray = new Array();
				cellArray.forEach((array) => {
					array.forEach((element, index) => {
						if (index === j) verticalCellArray.push(element);
					});
				});
				downShift(verticalCellArray);
				verticalCellArray.forEach((element, index) => {
					cellArray[index][j].setSum = element.getSum;
				});

				if (cellArray[i][j].getSum === cellArray[i - 1][j].getSum) {
					cellArray[i][j].update();
					cellArray[i - 1][j].reset();
				}
			}
		}
		spawnCell(cellArray);
	}
	paintCell(cellArray);
}

function downShift(array) {
	let k = null;
	for (let j = N - 1; j >= 0; j--) {
		if (array[j].isEmpty && k === null) {
			k = j;
		}
		if (!array[j].isEmpty && k !== null) {
			array[k].setSum = array[j].getSum;
			array[j].reset();
			k--;
		}
	}
}

function paintCell(array) {
	array.forEach((array) => {
		array.forEach((element) => {
			element.paint();
		});
	});
}

function spawnCell(array) {
	if (isFilled(cellArray)) return;

	let i = 0;
	let j = 0;
	do {
		i = Math.floor(Math.random() * N);
		j = Math.floor(Math.random() * M);
	} while (!array[i][j].isEmpty);

	if (Math.random() >= 0.1) array[i][j].setSum = 2;
	else array[i][j].setSum = 4;
}

function isFilled(array) {
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (array[i][j].isEmpty) {
				return false;
			}
		}
	}
	return true;
}
