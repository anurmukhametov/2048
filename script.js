class Cell {
	constructor(id) {
		this.$el = document.getElementById(id);
		this.$sum = 0;
		this.$el.innerText = this.$sum;
		this.$styleName = "style_0";
	}
	set sum(value) {
		this.$sum = value % 2 === 0 ? value : 0;
	}
	get sum() {
		return this.$sum;
	}
	get isEmpty() {
		return this.sum === 0;
	}
	reset() {
		this.sum = 0;
	}
	update() {
		if (!this.isEmpty) {
			this.sum = this.sum * 2;
			this.animationStart("animation_update");
		}
	}
	spawn() {
		if (Math.random() >= 0.1) this.sum = 2;
		else this.sum = 4;
		this.animationStart("animation_spawn");
	}
	paint() {
		this.$el.classList.remove(this.$styleName);
		this.$styleName = `style_${this.sum}`;
		this.$el.classList.add(this.$styleName);
		this.$el.innerText = this.sum !== 0 ? this.sum : "";
		let h = document.getElementById("11").clientHeight;
		this.$el.style.lineHeight = `${h}px`;
	}
	animationStart(animationName) {
		this.$el.classList.add(animationName);
		this.$el.addEventListener("animationend", this.animationHandler, false);
	}
	animationHandler(event) {
		let id = event.target.id;
		let element = document.getElementById(id);
		element.classList.remove(event.animationName);
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
	if (isVictory(cellArray)) alert("VICTORY");
}

//#endregion

function isVictory(array) {
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (array[i][j].sum === 2048) {
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
			if (array[i][j].sum === array[i][j + 1].sum) return true;
		}
	}
	return false;
}

function isVerticalShift(array) {
	for (let i = 0; i < M - 1; i++) {
		for (let j = 0; j < N; j++) {
			if (array[i][j].sum === array[i + 1][j].sum) return true;
		}
	}
	return false;
}

function isLeftShift(array) {
	for (let i = 0; i < M; i++) {
		for (let j = N - 1; j > 0; j--) {
			if (array[i][j].isEmpty) continue;
			if (
				array[i][j].sum === array[i][j - 1].sum ||
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
				array[i][j].sum === array[i][j + 1].sum ||
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
				array[i][j].sum === array[i - 1][j].sum ||
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
				array[i][j].sum === array[i + 1][j].sum ||
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
				if (cellArray[i][j].sum === cellArray[i][j - 1].sum) {
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
			array[k].sum = array[j].sum;
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
				if (cellArray[i][j].sum === cellArray[i][j + 1].sum) {
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
			array[k].sum = array[j].sum;
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
					cellArray[index][j].sum = element.sum;
				});

				if (cellArray[i][j].sum === cellArray[i + 1][j].sum) {
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
			array[k].sum = array[j].sum;
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
					cellArray[index][j].sum = element.sum;
				});

				if (cellArray[i][j].sum === cellArray[i - 1][j].sum) {
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
		if (array[j].isEmpty && k === null) k = j;
		if (!array[j].isEmpty && k !== null) {
			array[k].sum = array[j].sum;
			array[j].reset();
			k--;
		}
	}
}

function paintCell(array) {
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			array[i][j].paint();
		}
	}
}

function spawnCell(array) {
	if (!isFilled(cellArray)) {
		let i = 0;
		let j = 0;
		do {
			i = Math.floor(Math.random() * N);
			j = Math.floor(Math.random() * M);
		} while (!array[i][j].isEmpty);
		array[i][j].spawn();
	}
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
